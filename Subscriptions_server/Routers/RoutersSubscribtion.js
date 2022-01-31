const express = require('express');
const router = express.Router();
const subscriptionBL = require('../Utils/subscriptionsUtils')



//THE ROUTERS//

//Get all router. 
router
.route('/')
.get( async (req,res) => {
    try {
        const allSubscriptions = await subscriptionBL.AllSubscriptions()
        return res.json(allSubscriptions)
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
        const subscription = await subscriptionBL.SubscriptionById(id)
        return res.json(subscription)
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
        const newSubscription = await subscriptionBL.AddSubscription(obj)
        return res.json(newSubscription)
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
        const update = await subscriptionBL.UpdateSubscription(id, obj)
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
        const deleteObj = await subscriptionBL.DeleteSubscription(id)
        return res.json(deleteObj)
    }catch(err){
        return res.json(err)
    }
})


//Export the router.
module.exports = router;

