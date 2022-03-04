const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=>{
    console.log("connected to DB")
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

//helpful functions

//this function will execute everytime you before saving
userSchema.pre("save", function(next) {
    if(!this.isModified('password')) {
        return next()
    } 
    this.password = bcrypt.hash(this.password, 10)
    next()
})

//compare passwords
userSchema.methods.comparePassword = function(plainText, callback) {
    return callback(null, bcrypt.compare(plainText, this.password))
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel