const Herd = require("../models/HerdSchema.js");
const User = require("../models/UserSchema");

const herdController = {
    getAllHerds: (async (req, res) => {
        try {
            const herds = await Herd.find();
            if (herds.length > 0) {
                res.status(200).send({ msg: "Herds found", herds: herds });
            } else {
                res.status(404).send({ msg: "No herds found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),

    registerHerd: (async (req, res) => {
        const {owner, name, serieinndeling, buemerke_navn, buemerke_bilde, area} = req.body;
        try {
            let ownerid = await User.findOne({email: owner});
            if (!ownerid) {
                return res.status(404).send({ msg: "Owner not found" });
            }
            ownerid = ownerid._id;
            const herd = new Herd({
                owner: ownerid,
                name,
                serieinndeling,
                buemerke_navn,
                buemerke_bilde,
                area
            });
            let result = await herd.save();
            if (result._id) {
                res.status(201).send({ msg: "Herd created", herd: result });
            } else {
                res.status(500).send({ msg: "Error creating herd" });
            }
            } catch (error) {
                console.error(error);
                res.status(500).send({ msg: "Internal server error" });
            };
        }),

    getHerd: (async (req, res) => {
        const { id } = req.params;
        try {
            const herd = await Herd.findById(id);
            if (herd) {
                res.status(200).send({ msg: "Herd found", herd: herd });
            } else {
                res.status(404).send({ msg: "Herd not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),

    editHerd: (async (req, res) => {
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
            const herd = await Herd.findByIdAndUpdate(id, updateContent);
            if (herd) {
                res.status(200).send({ msg: "Herd updated", herd: updateContent });
            } else {
                res.status(404).send({ msg: "Herd not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),

    deleteHerd: (async (req, res) => {
        const { id } = req.params;
        try {
            const herd = await Herd.findByIdAndDelete(id);
            if (herd) {
                res.status(200).send({ msg: "Herd deleted", herd: herd });
            } else {
                res.status(404).send({ msg: "Herd not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    })

};

module.exports = herdController;