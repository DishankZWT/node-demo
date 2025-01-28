CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT,
    role ENUM('Admin', 'User') NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, age, role, isActive)
VALUES
('Alice Johnson', 'alice.johnson@example.com', 30, 'Admin', TRUE),
('Bob Smith', 'bob.smith@example.com', 25, 'User', TRUE),
('Charlie Brown', 'charlie.brown@example.com', 35, 'User', FALSE),
('Diana Prince', 'diana.prince@example.com', 28, 'Admin', TRUE),
('Eve Davis', 'eve.davis@example.com', 22, 'User', TRUE);
