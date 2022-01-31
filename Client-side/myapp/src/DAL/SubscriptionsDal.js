import axios from "axios"
const url = `http://localhost:4000/subscriptions`

const getAllsubscriptions = async () => {
    const response = await axios.get(url)
    return response
}


const getSubscriptionById = async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response
}

const addSubscription = async (obj) => {
    const response = await axios.post(url, obj);
    return response
}

const updateSubscription = async (id, obj) => {
    const response = await axios.put(`${url}/${id}`, obj)
    return response
}

const deleteSubscription = async (id) => {
    const response = await axios.delete(`${url}/${id}`)
    return response
}

export {getAllsubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription}