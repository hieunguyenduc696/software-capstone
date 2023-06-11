CREATE DATABASE state_management;
USE state_management;

CREATE TABLE test_attempt (
                              test_attempt_id INT NOT NULL AUTO_INCREMENT,
                              user_id INT DEFAULT NULL,
                              original_test_id INT DEFAULT NULL,

                              state INT DEFAULT NULL,
                              started_at TIMESTAMP,
                              ended_at TIMESTAMP,

                              PRIMARY KEY(test_attempt_id)
);

CREATE TABLE attempt (
                         attempt_id INT NOT NULL AUTO_INCREMENT,
                         test_attempt_id INT DEFAULT NULL,

                         title TEXT DEFAULT NULL,
                         test_type INT DEFAULT NULL,
                         test_level INT DEFAULT NULL,
                         PRIMARY KEY(attempt_id)
);

CREATE TABLE section (
                         section_id INT NOT NULL AUTO_INCREMENT,
                         attempt_id INT DEFAULT NULL,

                         section_index INT DEFAULT NULL,
                         section_type INT DEFAULT 0,
                         PRIMARY KEY(section_id)
);

CREATE TABLE template_type (
                               template_type_id INT NOT NULL AUTO_INCREMENT,

                               name VARCHAR(255) DEFAULT NULL,
                               template_key  VARCHAR(255) DEFAULT NULL,
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

INSERT INTO template_type (template_type_id, name, template_key, description) VALUES
    (1, "Yes/No/Not Given Type", "yes-no-type", "The question type, which could only answer by selecting Yes/No/Not Givem"),
    (2, "Multiple Choice", "multiple-choice", "The question type, which could only answer by selecting A/B/C/D"),
    (3, "Short Answer", "short-answer", "The question type, which could only answer by writing some short words"),
    (4, "Sentence Completion", "sentence-completion", "The question type, which could only answer by filling the blank with sentence"),
    (5, "Matching Heading", "matching-heading", "The question type, which could only answer by matching the index with the given header");


CREATE USER 'admin'@'%' IDENTIFIED BY 'warrior-admin-11062023';
GRANT ALL PRIVILEGES ON state_management.* TO 'admin'@'%' WITH GRANT OPTION;