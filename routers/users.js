const express = require('express');
const router = express.Router();
const {
    showCreateUser,
    addUser,
    checkIfEmailInUse
} = require('../controllers/users');

// when  getting create user page, run showCreateUser
router.get("/", showCreateUser);
// when posting on create user page, run checkIfEmail use, then addUser
router.post("/", checkIfEmailInUse)

module.exports  = router;
