const { getAllUsers} = require("../DALusers/DALDBUsers");
const { getUserByIdJson } = require("../DALusers/DALJsonUsers");
const { getPermissionById } = require("../DALusers/DALpermissions");


//check if the username and password are in the databse.
//if yes,check if the user is an admin or not and return an object with the right data
//if not, return false
const checkLogIn = async (username, password) => {
    const allUsers = await getAllUsers()
    const user =  allUsers.find(user => user.username == username && user.password == password);
    if(!user){
        return false
    }else{
        if(allUsers[0].username == user.username && allUsers[0].password == user.password){
            return {status:"admin", id: user._id}
        }else{
            return {status:"user", id: user._id}
        }
    }
}


//if the user is valid, return an object with user's id, letAcsess true/false. permissions and sessionTimeOut.
const dataShapingToLogIn = async (username, password) => {
    const answer = await checkLogIn(username, password) 

    if(!answer){
        const connectUser = {
            letAcsses: false
        }
        return connectUser
    }else{
        const id = answer.id;
        const user = await getPermissionById(id)
        const userData = await getUserByIdJson(id)
        const permissions = user.permissions;

        if(answer.status == "admin"){
    
            const connectUser = {
                id: id,
                permissions: [...permissions],
                admin: true,
                letAcsses: true,
                sessionTimeOut: userData.sessionTimeOut
            }
            return connectUser
        }else if (answer.status == "user"){

            const connectUser = {
                id: id,
                permissions: [...permissions],
                admin: false,
                letAcsses: true,
                sessionTimeOut: userData.sessionTimeOut
                
            }
            return connectUser
        }
    }
}

module.exports = {checkLogIn, dataShapingToLogIn}