CREATE DATABASE warrior;
USE warrior;

CREATE TABLE reading_passage (
    exam_id INT DEFAULT NULL,
    id INT NOT NULL AUTO_INCREMENT,
    wallpaper VARCHAR(255) DEFAULT NULL,
    title TEXT DEFAULT NULL,
    content LONGTEXT DEFAULT NULL,
    
    PRIMARY KEY(id)
);
