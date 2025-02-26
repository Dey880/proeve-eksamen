const Raindeer = require("../models/RaindeerSchema.js");
const User = require("../models/UserSchema");

const raindeerController = {
    getAllRaindeer: (async (req, res) => {
        try {
            const raindeer = await Raindeer.find();
            if (raindeer.length > 0) 
                {res.status(200).send({ msg: "Raindeer found", raindeer: raindeer });
            } else {
                res.status(404).send({ msg: "No raindeer found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    registerRaindeer: (async (req, res) => {
        const {owner, serialNumber, name, dateOfBirth, flokk } = req.body;
        try {
            const raindeer = new Raindeer({
                owner: owner,
                serialnumber: serialNumber,
                name,
                flokk: flokk,
                dateofbirth: dateOfBirth
            });
            let result = await raindeer.save();
            if (result._id) {
                res.status(201).send({ msg: "Reinsdyr registrert", result: result });
            } else {
                res.status(500).send({ msg: "Feil ved registrering av Reinsdyr" });
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
                res.status(200).send({ msg: "Raindeer updated", updateContent: updateContent });
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