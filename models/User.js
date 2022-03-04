const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
require('dotenv').config()

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required: true
    }
})