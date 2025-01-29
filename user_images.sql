CREATE TABLE user_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    imageName VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    mimeType VARCHAR(100) NOT NULL,
    extension VARCHAR(10) NOT NULL,
    size INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO user_images (userId, imageName, path, mimeType, extension, size)
VALUES
(1, 'profile_pic_1', '/images/alice/profile_pic_1.jpg', 'image/jpeg', '.jpg', 204800),
(2, 'profile_pic_2', '/images/bob/profile_pic_2.png', 'image/png', '.png', 102400),
(3, 'profile_pic_3', '/images/charlie/profile_pic_3.jpg', 'image/jpeg', '.jpg', 307200),
(4, 'profile_pic_4', '/images/diana/profile_pic_4.gif', 'image/gif', '.gif', 512000),
(5, 'profile_pic_5', '/images/eve/profile_pic_5.jpeg', 'image/jpeg', '.jpeg', 256000);