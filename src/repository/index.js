const grpcOperations = require('./grpc');
const mssqlOperations = require('./mssql');

const repository = {
    local: {
        createNewEmployee: ({ first_name, last_name, email, job_title, sick_leave_days, vacation_days, salary }) => mssqlOperations.createNewEmployee({
            first_name,
            last_name,
            email,
            job_title,
            sick_leave_days,
            vacation_days,
            salary
        }),
        getAllEmployees: ({ sort, order } = { sort: 'filial', order: 'ASC' }) => mssqlOperations.getAllEmployees({ sort, order }),
        getEmployeeById: ({ id }) => mssqlOperations.getEmployeeById({ id }),
        updateEmployee: ({ id, employeeData }) => mssqlOperations.updateEmployee({ id, employeeData }),
        deleteEmployee: ({ id }) => mssqlOperations.deleteEmployee({ id }),
    },
    global: {
        getAllEmployees: ({ sort, order } = { sort: 'filial', order: 'ASC' }) => grpcOperations.getAllEmployeesFromAllFilials({ sort, order })
    }
};

module.exports = repository;
