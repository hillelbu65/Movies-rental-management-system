const { getAllSubscription, getSuscriptionById, addSuscription, updaetSubscription, deleteSuscription } = require("../DAL/DALsubscriptions")

const AllSubscriptions = async () => {
    const subscriptions = await getAllSubscription()
    return subscriptions
}

const SubscriptionById = async (id) => {
    const subscription = await getSuscriptionById(id)
    return subscription
}

const AddSubscription = async (obj) => {
   const response = await addSuscription(obj)
   return response
}

const UpdateSubscription = async (id, obj) => {
    const response = await updaetSubscription(id, obj)
    return response
}

const DeleteSubscription = async (id) => {
    const response = await deleteSuscription(id)
    return response
}

module.exports = {AllSubscriptions, SubscriptionById, AddSubscription, UpdateSubscription, DeleteSubscription}