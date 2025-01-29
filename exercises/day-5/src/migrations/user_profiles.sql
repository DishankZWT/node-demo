CREATE TABLE user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    bio TEXT,
    linkedInUrl VARCHAR(255),
    facebookUrl VARCHAR(255),
    instaUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl)
VALUES
(1, 'Software engineer with a passion for problem-solving and technology.', 'https://www.linkedin.com/in/dishank', 'https://www.facebook.com/dishank.dixit', 'https://www.instagram.com/dishank_dixit'),
(2, 'Creative designer and front-end developer who loves minimalistic designs.', 'https://www.linkedin.com/in/bob', 'https://www.facebook.com/bob.johnson', 'https://www.instagram.com/bob_designs'),
(3, 'Digital marketing specialist with a knack for data-driven strategies.', 'https://www.linkedin.com/in/charlie', 'https://www.facebook.com/charlie.miller', 'https://www.instagram.com/charlie_marketing'),
(4, 'Full-stack developer building scalable web applications.', 'https://www.linkedin.com/in/diana', 'https://www.facebook.com/diana.williams', 'https://www.instagram.com/diana_fullstack'),
(5, 'Photographer and videographer capturing moments through a lens.', 'https://www.linkedin.com/in/eve', 'https://www.facebook.com/eve.smith', 'https://www.instagram.com/eve_photography');
