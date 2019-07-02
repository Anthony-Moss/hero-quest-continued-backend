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
    console.log(req.body)
    let theUserData = req.body;
    let theEmail = req.body.email
    const emailTaken = await User.checkEmail(theEmail); // need to add checkEmail
    // probably need to switch these, emailTaken = userData no add user
    if (emailTaken === theUserData) {
        await User.add(req.body);
        res.json(emailTaken)
    } else {
        res.json({
            message: "That email has already been used, please enter a different email.",
            firstName: `${req.body.firstName}`,
            lastName:"",
            userName: "",
            email: "",
            password:"",
            confirmPassword:""
        })
    }

    checkForLoginSucess = async (req, res) => {
        let userLoginData = req.body;
        const theEmail = escapeHTML(req.body.email);
        const theUserName = escapeHTML(req.body.userName)
        // const loginTestResult = await User.getByUserName(theUserName)
        const testPassword = await User.checkPassword(userLoginData)

        if (loginTestResult === userLoginData) {
            // this means that the users login info matches the db
            // loginTest result has all users data in it to pass to frontend for use
            // sends a json response with user data
            res.json(loginTestResult)
        } else {
            res.json({
                message: "Login unsucessful, check email and password and try again",
                email: "",
                password:"",
                confirmPassword:""
            })
        }
    } 
    
}

module.exports = {
    showCreateUser,
    addUser,
    checkIfEmailInUse
}