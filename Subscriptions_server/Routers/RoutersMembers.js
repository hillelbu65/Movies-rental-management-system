const express = require('express')
const router = express.Router();
const membersBL = require('../Utils/MembersUtils')


//THE ROUTERS//

//Get all router. 
router
.route('/')
.get( async (req,res) => {
    try {
        const allmembers = await membersBL.AllMembers()
        return res.json(allmembers)
    }catch(err){
        return err
    }
})

//Get by id router.
router
.route('/:id')
.get(async (req,res) => {
    try{
        const id = req.params.id
        const member = await membersBL.MemberById(id)
        return res.json(member)
    }catch(err){
        return res.json(err)
    }
})

//Add router. 
router
.route('/')
.post(async (req,res) => {
    try{
        const obj = req.body
        const newMember = await membersBL.AddMember(obj)
        return res.json(newMember)
    }catch(err){
        return res.json(err)
    }
})

//Put router by geting an id he oprate the 'req' and call the update function from the Utils file.
router
.route('/:id')
.put(async (req,res) => {
    try{
        const id = req.params.id
        const obj = req.body
        const update = await membersBL.UpdateMember(id,obj)
        return res.json(update)
    }catch(err){
        return res.json(err)
    }
})

//Delete router, by geting an id he call the deletDocument function from Utils file.
router
.route('/:id')
.delete(async (req,res) => {
    try{
        const id = req.params.id
        const deleteObj = await membersBL.DeleteMember(id)
        return res.json(deleteObj)
    }catch(err){
        return res.json(err)
    }
})


//Export the router.
module.exports = router;
