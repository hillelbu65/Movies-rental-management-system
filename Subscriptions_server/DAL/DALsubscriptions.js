require('../Configs/subscriptionsDb');
const subscriptionModel = require('../models/SubscriptionModel')


const getAllSubscription = () => {
    return new Promise((resolve,reject) => {
        subscriptionModel.find({}, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getSuscriptionById = (id) => {
    return new Promise((resolve,reject) => {
        subscriptionModel.findById(id, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addSuscription = (obj) => {
    return new Promise((resolve,reject) => {
        const newObject = new subscriptionModel(obj)
        newObject.save((err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const updaetSubscription = (id,change) => {
    return new Promise((resolve,reject) => {
        subscriptionModel.findByIdAndUpdate(id, change, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const deleteSuscription = (id) => {
    return new Promise((resolve,reject) => {
        subscriptionModel.findByIdAndDelete(id, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}


module.exports = {getAllSubscription, getSuscriptionById, addSuscription, updaetSubscription, deleteSuscription} 