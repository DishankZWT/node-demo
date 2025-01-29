const { default: users } = require('./../../../constants');

function getUserById(req, res, next){
    let userValid = false;
    users.forEach(element => {
        if(req.params.id == element.id){
            userValid = true;   
        } 
    });
    if(userValid) next();
    else return res.status(404).send('no such id exist');
}

function emailValidator(req, res, next) {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }
    const isDuplicate = users.some(user => user.email === email);
    if (isDuplicate) {
        return res.status(409).json({ error: "Email already exists." });
    }
    next();
}

function roleValidator(req, res, next) {
    const role = req.query.role;

    if (!role) {
        return res.status(400).json({ error: "Role is required." });
    }

    const validRoles = ["admin", "user"];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: `Invalid role. Allowed roles are: ${validRoles.join(", ")}.` });
    }
    next();
}

const imageValidator = (req, res, next) => {
    if (!req.file) return res.status(400).json({ error: "Image file is required." });
    const { mimetype, size } = req.file;
    const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/img"];
    if (!allowedMimeTypes.includes(mimetype)) {
        return res.status(400).json({ error: "Invalid file type. Allowed formats: png, jpg, jpeg, img." });
    }
    if (size > 2 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 2MB limit." });
    }
    next();
};

module.exports = {getUserById, emailValidator, roleValidator, imageValidator};