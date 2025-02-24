const express = require('express');
const router = express.Router();
const herdController = require('../controllers/herdController.js');


router.get("/", herdController.getAllHerds);
router.post("/", herdController.registerHerd);

router.get("/:id", herdController.getHerd);
router.put("/:id", herdController.editHerd);
router.delete("/:id", herdController.deleteHerd);

module.exports = router;