const userModel = require('../Models/userModel')
require('../configs/mongoDB')

const getAllUsers = () => {
    return new Promise((resolve,reject) => {
        userModel.find({}, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve,reject) => {
        userModel.findById(id, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const addUser = (obj) => {
    return new Promise((resolve,reject) => {
        const newObject = new userModel(obj)
        newObject.save((err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const updaetUser = (id,change) => {
    return new Promise((resolve,reject) => {
        userModel.findByIdAndUpdate(id, change, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}


const deleteUsers = (id) => {
    return new Promise((resolve,reject) => {
        userModel.findByIdAndDelete(id, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

module.exports = {getAllUsers, getUserById, addUser, updaetUser, deleteUsers}