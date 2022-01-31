const { getAllUsers, updaetUser } = require("../DALusers/DALDBUsers")

//check if the user already exist in database. if yes, 
//update the user's new password and return "true". 
//otherwise, return "false"

const createAccount  = async (username, password) => {

    const allUsersInTheDataBase = await getAllUsers()
    const user = allUsersInTheDataBase
    .find(user => user.username == username)
    if(user.password == ''){
        const createPassword = await updaetUser(user._id, {password: password})
        return {created: true}
    }else{
        return{created: false}
    }
}

module.exports = {createAccount}