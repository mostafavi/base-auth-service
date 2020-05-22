const db = require('../utilities/Database');

module.exports = {
    getUserEntry: (app, email) => {
        let sql = 'SELCT * FROM `' + app.config.database + '`.`users_entities` WHERE `user_email`= ?';
        return db.query(sql, [email], db.getFirstRow);
    },
    getUserAuth: (app, userId) => {
        let sql = 'SELECT * FROM `' + app.config.database + '`.`users_auth` WHERE `user_id`= ?';
        return db.query(sql, [userId], db.getFirstRow);
    }
}