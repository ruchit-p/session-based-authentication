const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(cookieParser())

//session middleware function, creates the session and configres the cookie
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
        key:'user_sid',
        secret:"secretkey23432234",
        resave:false,
        saveUninitialized: false,
        cookie:{
            expires:600000
        }
    })
)

app.use((req, res, next) =>{
    if(req.session.user && req.cookie.user_sid) {
        res.redirect('/dashboard')
    }
    next()
})

//created sessionChecker middleware function to use on user requests.
//Check the session everytime the user does something by adding this to the
//rest api
const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard')
    } else {
        next()
    }
}

app.get('/', sessionChecker, (req, res) =>{
    res.redirect('/login')
})

//create a login route
app.route('/login')
.get(sessionChecker, (req, res) =>{
    res.sendFile(__dirname + '/public/login.html')
})

//create a sign up route
app.route('/signup')
.get(sessionChecker, (req, res) =>{
    res.sendFile(__dirname + '/public/signup.html')
})



app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})