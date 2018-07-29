const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, ValidateUser } = require('../models/user');

router.post('/register', async (req, res) => {
    const { error } = ValidateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already exist with given email");

    user = await User.findOne({username: req.body.username});
    if(user) return res.status(400).send("User already exist with given Username");
    
    user = new User({
        email: req.body. email,
        username: req.body.username,
        password: req.body.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save();
    res.send({useranme: user.username, email: user.email})
})

module.exports = router;