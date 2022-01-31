const express =  require('express')
const router = express.Router()
const { AllMembers, MemberById, AddMember, UpdateMember, DeleteMember } = require("../Utils/MembersUtils")

router.route('/').get(async (req, res) => {
    try{
        const response = await AllMembers()
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').get(async (req, res) => {
    const id = req.params.id
    try{
        const response = await MemberById(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/').post(async (req, res) => {
    const movie = req.body
    try{
        const response = await AddMember(movie)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').put(async (req, res) => {
    const id = req.params.id
    const movie = req.body
    try{
        const response = await UpdateMember(id, movie)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').delete(async (req, res) => {
    const id = req.params.id
    try{
        const response = await DeleteMember(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

module.exports = router