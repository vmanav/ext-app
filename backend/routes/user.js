const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error " + err))
});

router.post('/add', (req, res) => {
    // console.log("Agye POST pe .?");
    // console.log("username from `body` = ", username);
    const username = req.body.username;

    const newUser = new User({ username: username });
    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json("Error " + err))
})

module.exports = router;
