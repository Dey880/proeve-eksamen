const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const fylker = {
    "Nord-Troms": ["Troms og Finnmark"],
    "Sør-Troms": ["Troms og Finnmark"],
    "Setesdal": ["Agder"],
    "Hardangervidda": ["Viken", "Vestland"],
    "Sørlandet": ["Agder"],
    "Røros": ["Trøndelag"],
    "Tydal": ["Trøndelag"],
    "Kautokeino": ["Troms og Finnmark"],
    "Finnmarksvidda": ["Troms og Finnmark"],
    "Helgeland": ["Nordland"],
    "Saltfjellet": ["Nordland"],
    "Lofoten": ["Nordland"],
};

const HerdSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    serieinndeling: { type: Number, required: true, unique: true },
    buemerke_navn: { type: String, required: true },
    buemerke_bilde: { type: String, required: true },
    area: { type: String, required: true },
    provinces: { type: Array, required: true },
});

HerdSchema.pre("save", function (next) {
    const area = this.area;
    if (fylker[area]) {
        this.provinces = fylker[area];
    } else {
        this.provinces = [];
    }
    
    next();
});

const Herd = model("Herd", HerdSchema);
module.exports = Herd;