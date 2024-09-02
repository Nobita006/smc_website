CREATE DATABASE smcdb;
USE smcdb;

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    login_attempts INT DEFAULT 0,
    lock_time TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE popular_apps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `popular_apps` (`name`) VALUES 
('Facebook'), 
('Instagram'), 
('Twitter'), 
('Snapchat'), 
('TikTok');