const mysql = require('mysql');
const logger = require('../../interconnects/logger');

const dbconfig = {
    host: global.config.vars.database.host,
    user: global.config.vars.database.user,
    password: global.config.vars.database.password,
    charset: global.config.vars.database.charset,
    timezone: global.config.vars.database.timezone,
    multipleStatements: global.config.vars.database.multipleStatements
};

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);

        this.connection.connect(err => {
            if (err) throw err;
            logger.log(`MySQL database connected to ${config.host}`);
        });
    }
    query(sql, args, ...filterMethods) {
        return new Promise((resolve, reject) => {
            logger.log(sql);
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    //console.log(filterMethods);
                    filterMethods.forEach(method => {
                        if (typeof (method) === 'function') {
                            rows = method(rows);
                        }
                    });
                    resolve(rows);
                }
            });
        });
    }
    getFirstRow(row) {
        return row[0] ? row[0] : null;
    }
    getLastId(result) {
        console.log("test" + result);
        return result.insertId;
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
module.exports = new Database(dbconfig);