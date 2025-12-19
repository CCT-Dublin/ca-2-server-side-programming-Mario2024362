-- Create the database
CREATE DATABASE IF NOT EXISTS personal_table;

-- Use the database
USE personal_table;

-- Create the table
CREATE TABLE IF NOT EXISTS mysql_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  second_name VARCHAR(20) NOT NULL,
  email VARCHAR(80) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  eircode VARCHAR(6) NOT NULL
);
SELECT * FROM mysql_table;
