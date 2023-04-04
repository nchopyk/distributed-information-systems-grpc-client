const mssqlClient = require('./client');
const queries = require('./queries');

const operations = {
    createNewEmployee: async ({ first_name, last_name, email, job_title, sick_leave_days, vacation_days, salary }) => mssqlClient.query(queries.ofCreateNewEmployee({ first_name, last_name, email, job_title, sick_leave_days, vacation_days,salary })),
    getAllEmployees: async ({ sort, order }) => mssqlClient.query(queries.ofGetAllEmployeesFromAllFilials(sort, order)),
    getEmployeeById: async ({ id }) => {
        const [employee] = await mssqlClient.query(queries.ofGetEmployeeById(id));
        return employee || null;
    },
    updateEmployee: async ({ id, employeeData }) => mssqlClient.query(queries.ofUpdateEmployee({ ...employeeData, id })),
    deleteEmployee: async ({ id }) => {
        await mssqlClient.query(queries.ofDeleteEmployeeDayOffs(id))
        await mssqlClient.query(queries.ofDeleteEmployee(id))
    }
};

module.exports = operations;
