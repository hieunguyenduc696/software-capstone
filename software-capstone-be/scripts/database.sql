CREATE DATABASE warrior;
USE warrior;

CREATE TABLE test (
    test_id INT NOT NULL AUTO_INCREMENT,

    title TEXT DEFAULT NULL,
    test_type INT DEFAULT NULL,
    test_level INT DEFAULT NULL,
    PRIMARY KEY(test_id)
);

CREATE TABLE section (
    section_id INT NOT NULL AUTO_INCREMENT,
    test_id INT DEFAULT NULL,
    
    section_index INT DEFAULT NULL,
    section_type INT DEFAULT NULL,    
    PRIMARY KEY(section_id)
);

CREATE TABLE task_type (
    task_type_id INT NOT NULL AUTO_INCREMENT,
    
    name VARCHAR(255) DEFAULT NULL,
    description LONGTEXT DEFAULT NULL,

    PRIMARY KEY(task_type_id)
);

CREATE TABLE task (
    task_id INT NOT NULL AUTO_INCREMENT,
    task_type_id INT DEFAULT NULL,
    section_id INT DEFAULT NULL,

    task_index INT DEFAULT NULL,
    title TEXT DEFAULT NULL,
    content LONGTEXT DEFAULT NULL,
    expand_column LONGTEXT DEFAULT NULL,

    PRIMARY KEY(task_id)
);

CREATE TABLE question (
    question_id INT NOT NULL AUTO_INCREMENT,
    task_id INT DEFAULT NULL,

    question_index INT DEFAULT NULL,
    content TEXT DEFAULT NULL,
    score INT DEFAULT 0,

    PRIMARY KEY(question_id)
);

CREATE TABLE answer (
    answer_id INT NOT NULL AUTO_INCREMENT,
    question_id INT DEFAULT NULL,

    content TEXT DEFAULT NULL,
    PRIMARY KEY(answer_id)
);


CREATE TABLE reading_passage (
    reading_passage_id INT NOT NULL AUTO_INCREMENT,
    section_id INT DEFAULT NULL,
    wallpaper VARCHAR(255) DEFAULT NULL,
    title TEXT DEFAULT NULL,
    content LONGTEXT DEFAULT NULL,
    
    PRIMARY KEY(reading_passage_id)
);
