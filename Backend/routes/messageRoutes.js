const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/sendMessage", sendMessage);
router.post("/messages", getMessages);
router.post("/deleteMessage", deleteMessage);

module.exports = router;
