DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;
USE user_db;
CREATE TABLE user_info (
    id INT NOT NULL AUTO_INCREMENT,
    user_name NOT NULL VARCHAR (100),
    days_sober INT (11),
    time 
    sponsor_name VARCHAR (100),
    sponsor_cell  VARCHAR (10),
    meeting_1 VARCHAR (20), 
    meeting_2 VARCHAR (20),
    meeting_3 VARCHAR (20),
    meeting_4 VARCHAR (20),
    meeting_5 VARCHAR (20),
    meeting_6 VARCHAR (20),
    meeting_7 VARCHAR (20),
    PRIMARY KEY (id)
);


