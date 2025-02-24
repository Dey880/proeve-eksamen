const Raindeer = require("../models/RaindeerSchema.js");
const Herd = require("../models/HerdSchema.js");
const User = require("../models/UserSchema");

const raindeerController = {
    getAllRaindeers: (async (req, res) => {
        try {
            const raindeer = await Raindeer.find();
            if (raindeer.length > 0) {
                res.status(200).send({ msg: "Raindeers found", raindeer: raindeer });
            } else {
                res.status(404).send({ msg: "No raindeers found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    registerRaindeer: (async (req, res) => {
        const {owner, serialnumber, name, serieinndeling, dateofbirth } = req.body;
        try {
            let ownerid = await User.findOne({email: owner});
            let herdid = await Herd.findOne({serieinndeling});
            if (!ownerid) {
                return res.status(404).send({ msg: "Owner not found" });
            }
            if (!herdid) {
                return res.status(404).send({ msg: "Herd not found" });
            }
            ownerid = ownerid._id;
            herdid = herdid._id;
            const raindeer = new Raindeer({
                owner: ownerid,
                serialnumber,
                name,
                flokk: herdid,
                dateofbirth: Date.now()
            });
            let result = await raindeer.save();
            if (result._id) {
                res.status(201).send({ msg: "Raindeer created", raindeer: result });
            } else {
                res.status(500).send({ msg: "Error creating raindeer" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        };
    }),
    getRaindeer: (async (req, res) => {
        const { id } = req.params;
        try {
            const raindeer = await Raindeer.findById(id);
            if (raindeer) {
                res.status(200).send({ msg: "Raindeer found", raindeer: raindeer });
            } else {
                res.status(404).send({ msg: "Raindeer not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    editRaindeer: (async (req, res) => {
        const { id } = req.params;
        const updateContent = req.body;
        const { owner } = updateContent;
        try {
            let ownerid = await User.findOne({email: owner});
            if (!ownerid) {
                return res.status(404).send({ msg: "Owner not found" });
            }
            ownerid = ownerid._id;
            updateContent.owner = ownerid;
            const raindeer = await Raindeer.findByIdAndUpdate(id, updateContent);
            if (raindeer) {
                res.status(200).send({ msg: "Raindeer updated", raindeer: updateContent });
            } else {
                res.status(404).send({ msg: "Raindeer not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    deleteRaindeer: (async (req, res) => {
        const { id } = req.params;
        try {
            const raindeer = await Raindeer.findByIdAndDelete(id);
            if (raindeer) {
                res.status(200).send({ msg: "Raindeer deleted", raindeer: raindeer });
            } else {
                res.status(404).send({ msg: "Raindeer not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    })
};

module.exports = raindeerController;