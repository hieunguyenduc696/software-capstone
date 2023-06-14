CREATE DATABASE state_management;
USE state_management;

CREATE TABLE question (
                          question_id INT NOT NULL AUTO_INCREMENT,
                          template_id INT DEFAULT NULL,

                          question_index INT DEFAULT NULL,
                          content TEXT DEFAULT NULL,
                          options LONGTEXT DEFAULT NULL,
                          score INT DEFAULT 0,

                          PRIMARY KEY(question_id)
);

CREATE TABLE answer (
                        answer_id INT NOT NULL AUTO_INCREMENT,
                        question_id INT DEFAULT NULL,

                        content LONGTEXT DEFAULT NULL,
                        options LONGTEXT DEFAULT NULL,
                        PRIMARY KEY(answer_id)
);


CREATE TABLE paragraph (
                           paragraph_id INT NOT NULL AUTO_INCREMENT,
                           section_id INT DEFAULT NULL,
                           wallpaper VARCHAR(255) DEFAULT NULL,
                           title TEXT DEFAULT NULL,
                           content LONGTEXT DEFAULT NULL,

                           PRIMARY KEY(paragraph_id)
);

CREATE USER 'admin'@'%' IDENTIFIED BY 'warrior-admin-11062023';
GRANT ALL PRIVILEGES ON state_management.* TO 'admin'@'%' WITH GRANT OPTION;