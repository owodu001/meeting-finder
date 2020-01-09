DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
USE user_db;
CREATE TABLE user_info (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    days_sober INT (11),
    sponsor_first VARCHAR (50),
    sponsor_last VARCHAR (50),
    sponsor_cell  VARCHAR (20),
    meeting_id INT (10),
    type VARCHAR (101),
    meeting_location VARCHAR (100),
    directions VARCHAR (100),
    meeting_1 VARCHAR (20), 
    meeting_2 VARCHAR (20),
    meeting_3 VARCHAR (20),
    meeting_4 VARCHAR (20),
    meeting_5 VARCHAR (20),
    meeting_6 VARCHAR (20),
    meeting_7 VARCHAR (20),
    PRIMARY KEY (id)
);



