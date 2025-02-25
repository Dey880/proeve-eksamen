const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: { type: String },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    language: { type: String },
    phone: { type: String },
});

const User = model("User", UserSchema);
module.exports = User;