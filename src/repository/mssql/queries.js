const queries = {
    ofCreateNewEmployee: (employee) => {
        return `INSERT INTO employees (first_name, last_name, email, job_title, sick_leave_days, vacation_days, created_at, updated_at, salary)
                VALUES ('${employee.first_name}', '${employee.last_name}', '${employee.email}', '${employee.job_title}', ${employee.sick_leave_days},
                        ${employee.vacation_days}, GETDATE(), GETDATE(), '${employee.salary}')`;
    },
    ofGetAllEmployeesFromAllFilials: (sort = 'filial', order = 'DESC') => {
        return `SELECT e.id,
                       e.first_name,
                       e.last_name,
                       e.job_title,
                       'Typical Filial'                                    as filial,
                       e.sick_leave_days                                   as sick_leave_days_available,
                       COUNT(CASE WHEN edo.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                       e.vacation_days                                     as vacation_days_available,
                       COUNT(CASE WHEN edo.type = 'Vacation' THEN 1 END)   as vacation_days_used,
                       e.salary,
                       e.email
                FROM employees e
                         LEFT JOIN employees_day_offs edo ON e.id = edo.employee_id
                GROUP BY e.id, e.first_name, e.last_name, e.job_title, e.sick_leave_days, e.vacation_days, e.salary, e.email
                ORDER BY ${sort} ${order}`;
    },
    ofGetEmployeeById: (id) => {
        return `SELECT e.id,
                       e.first_name,
                       e.last_name,
                       e.job_title,
                       'Typical Filial'                                    as filial,
                       e.sick_leave_days                                   as sick_leave_days_available,
                       COUNT(CASE WHEN edo.type = 'Sick Leave' THEN 1 END) as sick_leave_days_used,
                       e.vacation_days                                     as vacation_days_available,
                       COUNT(CASE WHEN edo.type = 'Vacation' THEN 1 END)   as vacation_days_used,
                       e.salary,
                       e.email
                FROM employees e
                         LEFT JOIN employees_day_offs edo ON e.id = edo.employee_id
                WHERE e.id = ${id}
                GROUP BY e.id, e.first_name, e.last_name, e.job_title, e.sick_leave_days, e.vacation_days, e.salary, e.email`;
    },
    ofUpdateEmployee: (employee) => {
        return `UPDATE employees
                SET first_name = '${employee.first_name}',
                    last_name = '${employee.last_name}',
                    email = '${employee.email}',
                    job_title = '${employee.job_title}',
                    sick_leave_days = ${employee.sick_leave_days},
                    vacation_days = ${employee.vacation_days},
                    salary = '${employee.salary}',
                    updated_at = GETDATE()
                WHERE id = ${employee.id}`;
    },
    ofDeleteEmployee: (id) => {
        return `DELETE
                FROM employees
                WHERE id = ${id}`;
    },
    ofDeleteEmployeeDayOffs: (id) => {
        return `DELETE
                FROM employees_day_offs
                WHERE employee_id = ${id}`;
    }
};

module.exports = queries;

