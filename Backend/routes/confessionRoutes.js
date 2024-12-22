const express = require("express");
const {
  sendConfession,
  getConfessions,
  deleteConfession,
} = require("../controllers/confessionController");
const router = express.Router();

router.post("/sendConfession", sendConfession);
router.post("/confessions", getConfessions);
router.post("/deleteConfession", deleteConfession);

module.exports = router;
