const express = require('express');
const router = express.Router();
const herdController = require('../controllers/herdController.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


router.get("/", herdController.getAllHerds);
router.post("/", upload.single('buemerke_bilde'), herdController.registerHerd);

router.get("/:id", herdController.getHerd);
router.put("/:id", upload.single("buemerke_bilde"), herdController.editHerd);
router.delete("/:id", herdController.deleteHerd);

module.exports = router;