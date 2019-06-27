const db = require('./conn');
const bcrypt = require('bcrpytjs');
const escapeHTML = require('../utils');

class User {
    constructor(id, first_name, last_name, user_name, email, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.userName = user_name;
        this.email = email;
        this.password = password;
    }

    static add(userData) {
        const firstName = escapeHTML(userData.first_name);
        const lastName = escapeHTML(userData.last_name);
        const userName = escapeHTML(userData.user_name);
        const email = escapeHTML(userData.email);
        const aPassword = escapeHTML(userData.password)
        // const hashedPass = User.hashPass(aPassword)
        return db.one(`
            insert into users
                (first_name, last_name, user_name, email, password)
            values
                ($1, $2, $3, $4)
            returning id, first_name, last_name, user_name
        `, [firstName, lastName, userName, email, aPassword])
        .then((formData) => {
            return formData.id
        })
    }

    static delete(id) {
        return db.resul('delete from users where id=$1', [id]);
    }

    // this returns a promise
    static getByUserName(userName) {
        return db.one(`select * from users where user_name=$1`, [userName])
        .then(userData => {
            const aUser = new  User(
                userData.id,
                userData.first_name,
                userData.last_name,
                userData.user_name,
                userData.email,
                userData.password
            );
            return aUser
        });
    }

    static checkUserName(userName) {
        const aUserName = escapeHTML(userName);
        return db.one(`select user_name from users where userName=$1`,  [aUserName])
        .catch(() => {
            return null;
        });
    }

    static hashPass(thePassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(thePassword, salt)
        return hash;
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }

    saveUser() {
        return db.result(
            `update users set first_name=$1, last_name=$2, user_name=$3, email=$4, password=$5 where id=$6`, 
            [this.firstName, this.lastName, this.userName, this.email, this.password, this.id]
        )
    }
}