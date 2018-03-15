### Schema

CREATE DATABASE seqburger_db;
USE seqburger_db;

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT NOT NULL,
	burger_name VARCHAR(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);