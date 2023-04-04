const grpcClient = require('./client');

const operations = {
    getAllEmployeesFromAllFilials: async ({ sort, order }) => new Promise((resolve, reject) => {
        grpcClient.GetAllEmployees({ sort, order }, (error, user) => {
            return error ? reject(error) : resolve(user.employees);
        });
    })
};

module.exports = operations;
