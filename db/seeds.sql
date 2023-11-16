USE employee_db;

-- Insert department:
INSERT INTO department (department_name)
VALUES
    ('Baristas'),
    ('Kitchen Staff'),
    ('Sales and Service');

-- Insert role:
INSERT INTO role (title, salary, department_id)
VALUES
    ('Barista', 40000, 1),    
    ('Cafe Assistant-Manager', 50000, 2),
    ('Service Staff', 30000, 3),
    ('Cafe Manager', 60000, 4);

-- Insert employee:
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Alice', 'Johnson', 1, 4),
    ('Bob', 'Miller', 1, 4),
    ('Charlie', 'Smith', 1, 4),
    ('David', 'Jones', 2, 4),
    ('Emma', 'Davis', 2, 4),
    ('Frank', 'Taylor', 3, 4),
    ('Grace', 'Wilson', 3, 4),
    ('Henry', 'Clark', 4, null),
    ('Ivy', 'Brown', 4, null);