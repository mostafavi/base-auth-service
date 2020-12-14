const db = require('../services/Database');

module.exports = {
    getUserEntry: (app, email) => {
        let sql = 'SELECT * FROM `' + app.config.database + '`.`users_entities` WHERE `user_email`= ?';
        return db.query(sql, [email], db.getFirstRow);
    },
    getUserAuth: (app, userId) => {
        let sql = 'SELECT * FROM `' + app.config.database + '`.`users_auth` WHERE `user_id`= ?';
        return db.query(sql, [userId], db.getFirstRow);
    },
    checkEmailExist: (app, email) => {
        let sql = 'SELECT * FROM `' + app.config.database + '`.`users_entities` WHERE `user_email`= ?';
        return db.query(sql, [email], db.getFirstRow);
    },
    checkUsernameExist: (app, username) => {
        let sql = 'SELECT * FROM `' + app.config.database + '`.`users_entities` WHERE `user_name`= ?';
        return db.query(sql, [username], db.getFirstRow);
    },
    addUserEntity: (app, entity) => {
        let sql = 'INSERT INTO `' + app.config.database + '`.`users_entities` (`user_id`,`user_name`,`user_email`) VALUES(NULL, ? , ? )';
        return db.query(sql, [entity.username, entity.email], db.getLastId);
    },
    addAuthEntity: (app, auth) => {
        let sql = 'INSERT INTO `' + app.config.database + '`.`users_auth` (`user_id`,`user_salt`,`user_password`,`user_temp_code`,`user_status`,`sign_key`) VALUES( ? , ? , ? , FLOOR(RAND()*10000), 0 , ? )';
        return db.query(sql, [auth.userId, auth.salt, auth.password, auth.key], db.getLastId);
    }


}