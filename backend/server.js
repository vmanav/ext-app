const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express()
const PORT = process.env.port || 5000;

// URL to connect to MongoDb Atlas
const dbURL = `mongodb+srv://${process.env.MONGODBATLAS_USER}:${process.env.MONGODBATLAS_PASS}@cluster0-xphh6.mongodb.net/ext-app?retryWrites=true&w=majority`;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Checking Connection
const conn = mongoose.connection;
conn.once('open', () => {
    console.log("Lagta hai MongoDB connect ho gya hai..");
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Setting up Routers
const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.get('/', (req, res) => {
    res.send("Hello There")
})


app.listen(PORT, () => {
    console.log("Application running on : http://localhost:5000/")
})