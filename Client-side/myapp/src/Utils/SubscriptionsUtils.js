import { getAllsubscriptions } from "../DAL/SubscriptionsDal"

//Get all subscription data and find the subscription that match the member id parameter.
const GetSubscriptionById = async (memberId) => {
    const allSubscriptions = await (await getAllsubscriptions()).data
    const subscription = allSubscriptions.find(sub => sub.memberId == memberId)
    return subscription
}

export {GetSubscriptionById}