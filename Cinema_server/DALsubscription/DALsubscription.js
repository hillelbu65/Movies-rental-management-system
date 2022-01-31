const { default: axios } = require("axios")
const url = 'http://localhost:8000/subscriptions'

const getSubscriptions = async () => {
    const allSubscriptions = await axios.get(url) 
    return allSubscriptions
}


const getSubscription = async (id) => {
    const subscription = await axios.get(`${url}/${id}`)
    return subscription 
}


const addSubscription = async (obj) => {
    const subscription = await axios.post(`${url}`, obj)
    return subscription 
}

const updateSubscription = async (id, obj) => {
    const subscription = await axios.put(`${url}/${id}`, obj)
    return subscription
}

const deleteSubscription = async (id) => {
    const subscription = await axios.delete(`${url}/${id}`)
    return subscription 
}


module.exports = {getSubscriptions, getSubscription, addSubscription, deleteSubscription, updateSubscription};