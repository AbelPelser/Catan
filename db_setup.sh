#!/bin/bash

printf "You need to enter your MySQL root password to create the database.\n";
mysql -u root -p < ./db_setup.sql;
./restore_db.sh;
