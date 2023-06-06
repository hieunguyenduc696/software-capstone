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

CREATE TABLE template_type (
    template_type_id INT NOT NULL AUTO_INCREMENT,
    
    name VARCHAR(255) DEFAULT NULL,
    template_key VARCHAR(255) DEFAULT NULL,
    description LONGTEXT DEFAULT NULL,

    PRIMARY KEY( template_type_id)
);

CREATE TABLE template (
    template_id INT NOT NULL AUTO_INCREMENT,
    template_type_id INT DEFAULT NULL,
    section_id INT DEFAULT NULL,

    template_index INT DEFAULT NULL,
    title TEXT DEFAULT NULL,
    content LONGTEXT DEFAULT NULL,
    expand_column LONGTEXT DEFAULT NULL,

    PRIMARY KEY(template_id)
);

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


INSERT INTO template_type (template_type_id, name, template_key, description) VALUES
    (1, "Yes/No/Not Given Type", "yes-no-type", "The question type, which could only answer by selecting Yes/No/Not Givem"),
    (2, "Multiple Choice", "multiple-choice", "The question type, which could only answer by selecting A/B/C/D"),
    (3, "Short Answer", "short-answer", "The question type, which could only answer by writing some short words"),
    (4, "Sentence Completion", "sentence-completion", "The question type, which could only answer by filling the blank with sentence"),
    (5, "Matching Heading", "matching-heading", "The question type, which could only answer by matching the index with the given header");