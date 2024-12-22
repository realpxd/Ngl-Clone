const Confession = require("../models/Confession");

exports.sendConfession = async (req, res) => {
  const { confession, username, navig } = req.body;
  try {
    const newConfession = new Confession({ confession, navig, username });
    await newConfession.save();
    res.json("Confession added!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getConfessions = async (req, res) => {
  const { username } = req.body;
  const query = username ? { username } : {};
  try {
    const confessions = await Confession.find(query);
    res.json(confessions.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteConfession = async (req, res) => {
  const { id } = req.body;
  try {
    await Confession.findByIdAndDelete(id);
    res.json("Confession deleted.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
