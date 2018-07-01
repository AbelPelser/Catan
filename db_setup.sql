drop database if exists catan;
create database catan;
create user if not exists 'catan'@'localhost' identified by 'catan';
grant all privileges on catan . * to 'catan'@'localhost';
flush privileges;