const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_FILE = path.join(__dirname, 'employees.proto');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_FILE, options);
const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;
const client = new UserService('localhost:3000', grpc.credentials.createInsecure());


module.exports = client;
