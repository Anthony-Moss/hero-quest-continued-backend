const express = require('express');
const loginRouter = express.Router();
const {
    showCreateUser,
    checkForLoginSucess,
    checkIfEmailInUse,
    checkLogin
} = require('../controllers/users');


// when  getting login page, run showCreateUser
loginRouter.get("/", showCreateUser);
// when posting on login page run the test login function
loginRouter.post("/", checkLogin);

module.exports = loginRouter;
