CREATE DATABASE student;
use student;

CREATE TABLE stuinfo(
	uid int(255) PRIMARY KEY auto_increment,
	uname VARCHAR(255),
	upwd VARCHAR(255)
)
ALTER TABLE stuinfo auto_increment=1;
