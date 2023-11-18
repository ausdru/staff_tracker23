-- Insert department:
INSERT INTO department (department_name)
VALUES
    ('Baristas'),
    ('Service Staff'),
    ('Managerial');

-- Insert role:
INSERT INTO role (title, salary, department_id)
VALUES
    ('Barista', 40000, 1),    
    ('Cafe Assistant-Manager', 50000, 3),
    ('Service Staff', 30000, 2),
    ('Cafe Manager', 60000, 3);

-- Insert employee:
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Henry', 'Clark', 3, null),
    ('Ivy', 'Brown', 3, null),
    ('Alice', 'Johnson', 1, 1),
    ('Bob', 'Miller', 1, 1),
    ('Charlie', 'Smith', 1, 1),
    ('David', 'Jones', 2, 1),
    ('Emma', 'Davis', 2, 2),
    ('Frank', 'Taylor', 3, 2),
    ('Grace', 'Wilson', 3, 2);
