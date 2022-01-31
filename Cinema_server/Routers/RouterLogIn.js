const express = require('express');
const { dataShapingToLogIn } = require('../Utils/Login');
const router = express.Router();

router
.route('/')
.post(async (req,res) => {
    try{
        const username = req.body.username
        const password = req.body.password  
        const data = await dataShapingToLogIn(username,password)
        return res.json(data)
    }catch(err){
        return res.json(err)
    }
})




module.exports = router;

