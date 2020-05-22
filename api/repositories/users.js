const db = require('../utilities/Database');

module.exports = {
    getUserEntry: (app, email) => {
        console.log(app);
        let sql = 'SELECT * FROM `' + app.config.database + '`.`entities` WHERE `user_email`= ?';
        return db.query(sql, [email], db.getFirstRow);
    }
}