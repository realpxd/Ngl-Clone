const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { message, username, navig } = req.body;
  try {
    const newMessage = new Message({ message, username, navig });
    await newMessage.save();
    res.json("Message added!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const { username } = req.body;
  const query = username ? { username } : {};
  try {
    const messages = await Message.find(query);
    res.json(messages.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.body;
  try {
    await Message.findByIdAndDelete(id);
    res.json("Message deleted.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
