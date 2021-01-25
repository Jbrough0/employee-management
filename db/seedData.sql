use employees;

INSERT INTO department

(name)
VALUES
('Development'), ('Marketing'), ('Administration'), ('Operations');

INSERT INTO role
(title, salary, department_id)
VALUES
 ('Head of Development', 150000, 1), ('Developer', 100000, 1),
    ('Director of Marketing', 150000, 2), ('Marketing Executive', 100000, 2),
    ('Head of Administration', 110000, 3), ('Administrator', 80000, 3),
    ('Director of Operations', 140000, 4), ('Operations Manager', 90000, 4);

    INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
    VALUES
    ('Evan', 'Kent', 1, NULL), ('Josh', 'Broughton', 2, 1), ('Hunter', 'Cancer', 3, NULL),
    ('Derrick', 'Moss', 4, 3), ('Jamie', 'Dolittle', 5, NULL), ('David', 'Scott', 6, 5),
    ('Allen', 'Sherman', 7, NULL), ('Vallerie', 'Paige', 8, 7);
    