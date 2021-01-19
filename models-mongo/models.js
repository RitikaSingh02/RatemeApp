var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "none" },
    company: {
        name: { type: String, default: "none" },
        image: { type: String, default: "none" },
    },
    passwordResetToken: { type: String, default: "nonde" },
    passwordResetExpire: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Auth', userSchema);