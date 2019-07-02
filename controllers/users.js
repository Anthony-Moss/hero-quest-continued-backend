const User = require('../models/users');
const escapeHTML = require('../utils');

showCreateUser = async (req, res)  => {
    res.json({
        message: "You have sucessfully created an account.",
        firstName: `${req.body.firstName}`,
        lastName:"",
        userName: "",
        email: "",
        password:""
    })
}


async function checkLogin(req, res) {
    const theUserName = req.body.userName;
    const thePassword = req.body.password;
    const theUser = await User.getByUserName(theUserName);
    const passwordIsCorrect = await theUser.checkPassword(thePassword);
    console.log(`This is the username: ${theUser.username}`);
    if (passwordIsCorrect) {
      req.session.user = theUser.id;
      req.session.save(() => {
        res.json({
            firstName: `${req.body.firstName}`,
            lastName:"",
            userName: `${req.body.userName}`,
            email: "",
            password:""
        })
      });
    } else {
        res.json({
            message: "That email has already been used, please enter a different email.",
            firstName: `${req.body.firstName}`,
            lastName:"",
            userName: "",
            email: "",
            password:""
        })
    }
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
        const theEmail = req.body.email
        const theUserName = req.body.userName
        // const loginTestResult = await User.getByUserName(theUserName)
        const testPassword = await User.checkLoginAndPassword(userLoginData)

        if (testPassword) {
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
    checkIfEmailInUse,
    checkLogin
}