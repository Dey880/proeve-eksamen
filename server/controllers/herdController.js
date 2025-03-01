const Herd = require("../models/HerdSchema.js");
const User = require("../models/UserSchema");
const fs = require("fs");
const path = require("path");

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
        const {owner, name, serieinndeling, buemerke_navn, area} = req.body;
        const buemerke_bilde = req.file ? req.file.filename : null;
        try {
            const herd = new Herd({
                owner: owner,
                name,
                serieinndeling,
                buemerke_navn,
                buemerke_bilde,
                area
            });
            let result = await herd.save();
            if (result._id) {
                res.status(201).send({ msg: "Flokk registrert", herd: result });
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

        try {
            let herd = await Herd.findById(id);
            if (!herd) {
                return res.status(404).send({ msg: "Herd not found" });
            }

            if (req.file) {
                if (herd.buemerke_bilde) {
                    const oldImagePath = path.join(__dirname, "../uploads", herd.buemerke_bilde);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateContent.buemerke_bilde = req.file.filename;
            }

            herd = await Herd.findByIdAndUpdate(id, updateContent, { new: true });

            res.status(200).send({ msg: "Herd updated", herd });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    }),
    


    deleteHerd: (async (req, res) => {
        const { id } = req.params;
        try {
            const herd = await Herd.findById(id);
            if (!herd) {
                return res.status(404).send({ msg: "Herd not found" });
            }

            if (herd.buemerke_bilde) {
                const imagePath = path.join(__dirname, "../uploads", herd.buemerke_bilde);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            await Herd.findByIdAndDelete(id);

            res.status(200).send({ msg: "Herd deleted", herd });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Internal server error" });
        }
    })


};

module.exports = herdController;