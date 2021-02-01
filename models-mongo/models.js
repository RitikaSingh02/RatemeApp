var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, default: "none" },
    company: {
        name: { type: String, default: "none" },
        image: { type: String, default: "none" },
    },
    passwordResetToken: { type: String, default: "none" },
    passwordResetExpire: { type: Date, default: Date.now }

});

userSchema.methods.encryptPass = (password) => {
    const bcrypt = require('bcrypt-nodejs');
    const saltRounds = 10;
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

module.exports = mongoose.model('User', userSchema);//exported the userschema under the name User