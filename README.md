# Exercises Project
Project for tracking exercises

# Database Setup
Install mysql. Provide root password during install.
```bash
sudo apt-get install mysql-client mysql-server
```
Login to database for first time.
```bash
mysql --user=root -p
```
Create a user and provide permissions.
```sql
create user 'student'@'localhost' identified by 'default';
grant all privileges on * . * to 'student'@'localhost';
```
Logout of mysql and log back in with new user.
```bash
mysql --user=student --password=default
```
Create the student database and the workouts table.
```sql
create database student;
use student;
create table workouts(id int primary key auto_increment, name varchar(255) not null, reps int, weight int, date date, lbs boolean);
```

