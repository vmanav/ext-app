const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    console.log("welcome to `users`");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error " + err))
});

router.post('/add', (req, res) => {
    console.log("Agye POST pe .?");
    const username = req.body.username;
    console.log("username from `body` = ", username);

    const newUser = new User({ username: username });
    newUser.save()
        .then(() => res.json('User Added'))
        .catch(err => res.status(400).json("Error " + err))
})

module.exports = router;
