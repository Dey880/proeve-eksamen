const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RaindeerSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serialnumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    flokk: { type: mongoose.Schema.Types.ObjectId, ref: "Herd", required: true },
    dateofbirth: { type: Date, required: true },
    inTransition: { type: Boolean, default: false },
});

const Raindeer = model("Raindeer", RaindeerSchema);
module.exports = Raindeer;