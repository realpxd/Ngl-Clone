const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000

const uri = process.env.ATLAS_URI;

mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));

const ConfessionSchema = new mongoose.Schema({
    confession: {
        type: String,
    },
    navig: {
        type: Array,
    },
    // Add other fields as needed
});

const Confession = mongoose.model('Confession', ConfessionSchema);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/', (req, res) => {
    mongoose.model('Confession').find()
        .then(confessions => res.send(confessions))
        .catch(err => res.send(err));
})

app.post('/send', (req, res) => {

    const confession = req.body.confession;
    const navig = req.body.navig;
    console.log(confession , ' ' , navig);

    const newConfession = new Confession({
        confession,
        navig
    });

    newConfession.save()
        .then(() => res.json('Confession added!'))
        .catch(err => res.status(400).json('Error: ' + err));




})

