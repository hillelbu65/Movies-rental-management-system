const express =  require('express')
const router = express.Router()
const { AllSubscriptions, SubscriptionById, AddSubscription, UpdateSubscription, DeleteSubscription } = 
require('../Utils/SubscriptionsUtils')

router.route('/').get(async (req, res) => {
    try{
        const response = await AllSubscriptions()
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})


router.route('/').get(async (req, res) => {
    try{
        const response = await AllSubscriptions()
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').get(async (req, res) => {
    const id = req.params.id
    try{
        const response = await SubscriptionById(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/').post(async (req, res) => {
    const movie = req.body
    try{
        const response = await AddSubscription(movie)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').put(async (req, res) => {
    const id = req.params.id
    const obj = req.body
    try{
        const response = await UpdateSubscription(id, obj)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').delete(async (req, res) => {
    const id = req.params.id
    try{
        const response = await DeleteSubscription(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

module.exports = router