const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    lastname: String,
    password: String
});

userSchema.pre('save', async function hashPassword(next) {
 if (!this.isModified('password')) next();

 this.password = await bcrypt.hash(this.password, 0);
});

userSchema.methods = {
    compareHash(hash) {
        return bcrypt.compare(hash, this.password);
    },
};

userSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, 'secret', { expiresIn: 86400 })
    }
}

module.exports = mongoose.model('User', userSchema);
    