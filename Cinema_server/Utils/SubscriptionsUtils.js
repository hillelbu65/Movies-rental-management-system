const { getSubscriptions, getSubscription, addSubscription, updateSubscription, deleteSubscription } = 
require("../DALsubscription/DALsubscription")

const AllSubscriptions = async () => {
    const subscriptions = await (await getSubscriptions()).data
    return subscriptions
}

const SubscriptionById = async (id) => {
    const subscription = await getSubscription(id)
    return subscription
}

const AddSubscription = async (obj) => {
   const response = await addSubscription(obj)
   return response
}

const UpdateSubscription = async (id,obj) => {
    const response = await (await updateSubscription(id, obj)).data
    return response?{update: true}:{update: false}
}

const DeleteSubscription = async (id) => {
    const response = await deleteSubscription(id)
    return response
}

module.exports = {AllSubscriptions, SubscriptionById, AddSubscription, UpdateSubscription, DeleteSubscription}