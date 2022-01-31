const express = require('express')
const { createAccount } = require('../Utils/CreateAccount');
const router = express.Router()

router.route('/').post(async (req, res) => {
    try{
        const username = req.body.username
        const password =  req.body.password

        const response = await createAccount(username, password)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

module.exports = router