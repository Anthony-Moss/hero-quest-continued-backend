const express = require('express');
const router = express.Router();
const {
    showCreateUser,
    addUser,
    checkIfEmailInUse
} = require('../controllers/users');


// when  getting create user page, run showCreateUser
router.get("/createUser", showCreateUser);
// when posting on create user page, run checkIfEmail use, then addUser
router.post("/createUser", checkIfEmailInUse);

module.exports  = router;
