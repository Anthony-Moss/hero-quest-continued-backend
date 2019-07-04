const db = require('./conn');
const bcryptjs = require('bcryptjs');
const escapeHTML = require('../utils');
const qs = require('qs')

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
        const firstName = userData.first_name;
        const lastName = userData.last_name;
        const userName = userData.user_name;
        const email = qs.stringify(userData.email);
        const aPassword = userData.password;
        const hashedPass = this.hashPass(aPassword);
        return db.one(`
            insert into users
                (first_name, last_name, user_name, email, password)
            values
                ($1, $2, $3, $4)
            returning id, first_name, last_name, user_name
        `, [firstName, lastName, userName, email, hashedPass])
        .then((formData) => {
            return formData.id
        })
    }

    static delete(id) {
        return db.result('delete from users where id=$1', [id]);
    }

    // this returns a promise
    // if current option doessnt work copy this  function outline to make the check login
    // just needs to run checkPassword as well
    static getByUserName(userName) {
        const actualUserName = userName.toString()
        return db.one(`select * from users where user_name=$1`, [actualUserName])
        .catch(() => {
            return null;
        })
        .then(userData => {
            const aUser = new User(
                userData.id,
                userData.first_name,
                userData.last_name,
                userData.user_name,
                userData.email,
                userData.password
            );
            return aUser
        })
        .catch(() => {
            return null;
        });
    }

    static getByEmail(email) {
        return db.one(`select * from users where email=$1`, [email])
        .then(userData => {
            const aUser = new User(
                userData.id,
                userData.first_name,
                userData.last_name,
                userData.user_name,
                userData.email,
                userData.password
            );
            return aUser
        })
        .catch(() => {
            return null;
        });
    }

    static checkUserName(userName) {
        const aUserName = userName;
        return db.one(`select user_name from users where userName=$1`,  [aUserName])
        .catch(() => {
            return null;
        });
    }

    static checkLoginAndPassword(userData) {

    }

    // static checkLogin(userData) {
    //     const firstName = userData.first_name;
    //     const lastName = userData.last_name;
    //     const userName = userData.user_name;
    //     const email = qs.stringify(userData.email);
    //     const aPassword = userData.password;
    //     const hashedPass = this.hashPass(aPassword);
    //     return db.one(`
    //         insert into users
    //             (first_name, last_name, user_name, email, password)
    //         values
    //             ($1, $2, $3, $4)
    //         returning id, first_name, last_name, user_name, password
    //     `, [firstName, lastName, userName, email, hashedPass])
    //     .then((formData) => {
                // if (checkPassword) {
                    //         return formData
                // } else {
                    // return formData.userName
                // }
    //     })
    // }

    static checkEmail(userData) {
        console.log(`${userData} is being sent to backend`)
        const aEmail = userData[0];
        return db.one(`select email from users where email=$1`, [aEmail]) // signals email is associated with a user instance and returns email
        .catch(() => {
            return userData; //signals that email is not in database, so we can create new user
        });
    }

    static hashPass(thePassword) {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(thePassword, salt)
        return hash;
    }

    setPassword(newPassword) {
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(newPassword, salt);
        this.password = hash;
    }

    checkPassword(aPassword) {
        //const isCorrect = bcrypt.compareSync(aPassword, this.password);
        console.log(aPassword)
        console.log(this.password)
        if (aPassword === this.password) {
            return true
        } else {
            return false
        }
        // return bcryptjs.compareSync(aPassword, this.password);
    }

    saveUser() {
        return db.result(
            `update users set first_name=$1, last_name=$2, user_name=$3, email=$4, password=$5 where id=$6`, 
            [this.firstName, this.lastName, this.userName, this.email, this.password, this.id]
        )
    }
}

module.exports=User;