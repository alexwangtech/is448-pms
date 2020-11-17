-- Insert some dummy data into the SQL database

INSERT INTO PMSUsers (firstName, lastName, departmentName, userType, email, `password`)
    VALUES ('Raymond', 'Wang', 'Information Systems', 'Owner', 'wanalex1@umbc.edu', 'wanalex1');
INSERT INTO PMSUsers (firstName, lastName, departmentName, userType, email, `password`)
    VALUES ('Seong', 'Yun', 'Accounting', 'Manager', 'seongyun1@umbc.edu', 'seongyun1!');
INSERT INTO PMSUsers (firstName, lastName, departmentName, userType, email, `password`)
    VALUES ('Bob', 'Ross', 'Painting', 'Employee', 'bobross@umbc.edu', 'bobross');

INSERT INTO PMSTasks (userId, taskName, taskDueDate, `description`)
    VALUES (1, 'Task 1', '2020-11-01', 'This is Task 1!');
INSERT INTO PMSTasks (userId, taskName, taskDueDate, `description`)
    VALUES (1, 'Task 2', '2020-11-01', 'This is Task 2!');
INSERT INTO PMSTasks (userId, taskName, taskDueDate, `description`)
    VALUES (1, 'Task 3', '2020-11-01', 'This is Task 3!');
    