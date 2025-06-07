const mongoose = require('mongoose');
// const bycrpt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {},
    lastname: {},
    email: {},
    password: {},
    role: {},
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.model('Spend-Sense-User', userSchema);

module.exports = User;
