const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const confessionRoutes = require("./routes/confessionRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Server is up and running!");
});
app.use("/", confessionRoutes);
app.use("/", messageRoutes);
app.use("/", userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
