const User = require('../models/users');
const escapeHTML = require('../utils');

showCreateUser = async (req, res)  => {
    res.render("CreateUser", {
        locals: {
            message: "Please fill in the below details to create your account.",
            firstName: "",
            lastName:"",
            uerName: "",
            email: "",
            password:"",
            confirmPassword:""
        }
    });
}

addUser = async (req, res) => {
    const newUser = await User.add(req.body);
    res.json(newUser)
}

checkIfEmailInUse  = async (req, res) => {
    let theUserData = req.body;
    let theEmail = escapeHTML(req.body.email)
    const emailTaken = await User.checkEmail(theEmail);

    if (emailTaken === theUserData) {
        await User.add(req.body);
        res.redirect('gameMenu')
    } else {
        res.json({
            message: "That email has already been used, please enter a different email.",
            firstName: `${req.body.firstName}`,
            lastName:"",
            uerName: "",
            email: "",
            password:"",
            confirmPassword:""
        })
    }
}

module.exports = {
    showCreateUser,
    addUser,
    checkIfEmailInUse
}