const express = require("express");
const router = express.Router();
const userModel = require("../models/users-model")
const {auth} = require("../middlewares/auth");


router.get('/profile', auth , async (req,res)=> {
    try {
        const userId = req.user.id;
        const user = await userModel.getUserById(userId);

        if(!user) return res.status(404).send("user not found");
        
        else 
        return res.status(200).send(
            {
                email:user.email,
                name:user.name,
            }
        );
    } catch (err) {
        res.status(500).send('server error')
    }
})

module.exports = router;
