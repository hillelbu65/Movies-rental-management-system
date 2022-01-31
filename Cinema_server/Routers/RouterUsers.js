const express = require('express')
const { AddUserData, getAllUsersData, updateuser, userData, deleteUser } = require('../Utils/UsersUtils');
const router = express.Router();

router.route('/').get(async (req, res) => {
    try{
        const response = await getAllUsersData()
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/').post(async (req, res) => {
    try{
        const userData = req.body
        const response = await AddUserData(userData)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').put(async (req, res) => {
    try{
        const id = req.params.id
        const data = req.body
        const response = await updateuser(id, data)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').get(async (req, res) => {
    try{
        const id = req.params.id
        const response = await userData(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').delete(async (req, res) => {
    try{
        const id = req.params.id
        const response = await deleteUser(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})


module.exports = router;
