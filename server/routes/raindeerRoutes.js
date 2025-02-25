const express = require('express');
const router = express.Router();
const raindeerController = require('../controllers/raindeerController.js');


router.get("/", raindeerController.getAllRaindeer);
router.post("/", raindeerController.registerRaindeer);

router.get("/:id", raindeerController.getRaindeer);
router.put("/:id", raindeerController.editRaindeer);
router.delete("/:id", raindeerController.deleteRaindeer);

module.exports = router;