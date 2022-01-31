require('../Configs/subscriptionsDb');
const memberModel = require('../models/memberModel')
const { default: axios} = require('axios')
const url  = 'https://jsonplaceholder.typicode.com/users'

const getMembersDal = async () => {
    const response = await axios.get(url)
    return response
}

const getAllMembers = () => {
    return new Promise((resolve,reject) => {
        memberModel.find({}, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const getMemberById = (id) => {
    return new Promise((resolve,reject) => {
        memberModel.findById(id, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addMember = (obj) => {
    return new Promise((resolve,reject) => {
        const newObject = new memberModel(obj)
        newObject.save((err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const updaetMember = (id,change) => {
    return new Promise((resolve,reject) => {
        memberModel.findByIdAndUpdate(id, change, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const deleteMember = (id) => {
    return new Promise((resolve,reject) => {
        memberModel.findByIdAndDelete(id, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}


module.exports = {getAllMembers,getMemberById,addMember,updaetMember,deleteMember, getMembersDal}