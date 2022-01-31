const {addUser, getAllUsers, updaetUser, getUserById, deleteUsers} = require('../DALusers/DALDBUsers')
const { addUserJson, getUserByIdJson, getAllUsersJson, updateUserJson, deleteUserJson } = require('../DALusers/DALJsonUsers')
const { addUserPermissions, getPermissionById, getAllUsersPermissions, updatePermissions, deletePermissions } = require('../DALusers/DALpermissions')

//gets user data and puts it in the relevant json files and databse
const AddUserData = async (userData) => {
    const username = userData.username
    const usersInTheDataBase = await getAllUsers()
    const userAuthentication  = usersInTheDataBase.filter((user) => user.username == username)

    if(userAuthentication.length == 0){

        const userTodataBase = {
            username: username,
            password: ''
        }
        const response = await addUser(userTodataBase);
        const userId = response._id;
        
        const userDataJson = {
            id: userId,
            fName: userData.fName,
            lName: userData.lName, 
            CreateDate: userData.CreateDate,
            sessionTimeOut: userData.sessionTimeOut
        }
        
        await addUserJson(userDataJson);

        const userPermissions = [...userData.permissions]
        const newUserPermissions = {
            id: userId, 
            permissions: userPermissions
        }

        await addUserPermissions(newUserPermissions)

        return {userAuthentication: true}
    }else{
        return {userAuthentication: false}
    }
}

//creates an array of objects comprizing users. 
//each object contains all user's data from all relevant json files and databse
const getAllUsersData = async () => {
    const users = await getAllUsers()
    const arrayDb = []
    users.map(user => arrayDb.push(user))
    const userPermissions = await getAllUsersPermissions()
    const arrayPermissions = []
    userPermissions.map(permission => arrayPermissions.push(permission))
    const usersData = await getAllUsersJson()
    const arrayUsersData = []
    usersData.map(userD => arrayUsersData.push(userD)) 

    const data = []
    arrayUsersData.forEach((user, index) => {
        data.push(
            {
            fullName: `${user.fName} ${user.lName}`,
            username: arrayDb.find(userDb => userDb._id == user.id).username,
            sessionTimeOut: user.sessionTimeOut,
            createDate: user.CreateDate,
            permission: arrayPermissions.find(per => per.id == user.id).permissions,
            id: arrayDb.find(userDb => userDb._id == user.id)._id
        })
    })
    return data
}

//All user's data form all relavant json filea and databse
const userData = async (id) => {
    const userDB = await getUserById(id)
    const userJson =  await getUserByIdJson(id)
    const userPermissions = await getPermissionById(id)
    
    const toClient = {
        id: id,
        fName: userJson.fName,
        lName: userJson.lName, 
        username: userDB.username,
        sessionTimeOut: userJson.sessionTimeOut,
        createDate: userJson.CreateDate,
        permission: userPermissions.permissions
    }

    return toClient
}

//Update user's data in all relevant json and  databse.
const updateuser = async (id, data) => {

    const userDataBase = {
        username: data.username,
    }

    const userJson = {
        id: id,
        fName: data.fName,
        lName: data.lName, 
        CreateDate: data.createDate,
        sessionTimeOut: data.sessionTimeOut
    } 

    const permissionsJosn = {
        id: id,
        permissions: data.permissions
    }

    const users = await updaetUser(id, userDataBase)
    await updateUserJson(id, userJson)
    await updatePermissions(id, permissionsJosn.permissions)
    return users?{update: true}:{update: false}
}


//Delete all user's data in all relevant json files and databse.
const deleteUser = async (id) => {
    const userDB = await deleteUsers(id)
    await deletePermissions(id)
    await deleteUserJson(id)

    return userDB._id?{deleted: true}:{deleted: false}
}

module.exports = {AddUserData, getAllUsersData, updateuser, userData, deleteUser}