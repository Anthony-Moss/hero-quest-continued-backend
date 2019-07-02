const express = require('express');
const loginRouter = express.Router();
const {
    showCreateUser,
    checkForLoginSucess
} = require('../controllers/users');


// when  getting login page, run showCreateUser
router.get("/login", showCreateUser);
// when posting on login page run the test login function
router.post("/login", checkForLoginSucess);

module.exports  = loginRouter;
