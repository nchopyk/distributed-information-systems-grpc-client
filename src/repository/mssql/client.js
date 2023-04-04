const sql = require('mssql');

const MS_SQL_OPTIONS = {
    server: 'localhost',
    port: 10001,
    database: 'enterprise', // Replace with your database name
    user: 'elogin',
    password: 'p@sSw0rd',
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

class MsSqlClient {
    constructor() {
        this.pool = null;
    }

    async query(ddl) {
        if (!this.pool) {
            console.log('[MS SQL client] establishing new connection');
            this.pool = await sql.connect(MS_SQL_OPTIONS);
            console.log('[MS SQL client] new connection established');
        }

        const { recordset: rows } = await this.pool.request().query(ddl);

        return rows;
    }
}


module.exports = new MsSqlClient();
