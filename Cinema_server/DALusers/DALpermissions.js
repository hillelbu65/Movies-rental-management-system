const jsonFile = require('jsonfile');
const file = __dirname + '/permissions.json'


//write to permissions json file.
const setPermissions = (array) => {
    return new Promise ((resolve, reject) => {

        jsonFile.writeFile(file, array, (err) => {
            if(err)
            {
                reject(err)
            }else
            {
                resolve('User was set')
            }
        })
    })
} 

//reade from permissions json file.
const readPermissions = () => {
    return new Promise ((resolve, reject) => {

        jsonFile.readFile(file, (err, data) => {
            if(err)
            {
                reject(err)
            }else
            {
                resolve(data)
            }
        })
    })
}

const getAllUsersPermissions = async () => 
{
    const allUsers = await readPermissions()
    return allUsers
}

const getPermissionById = async (id) => 
{
    const allUsersPermissions = await readPermissions()
    const userPermissions = allUsersPermissions.find((user) => user.id == id)
    return userPermissions
}

const addUserPermissions = async (userPermissions) => 
{
    const allUsersPermissions = await readPermissions();
    const newUsersArray = [...allUsersPermissions,userPermissions]
    setPermissions(newUsersArray)
}

const updatePermissions = async (id, ArrayOfpermissions) => 
{
    const allUsersPermissions = await readPermissions();
    const index = allUsersPermissions.findIndex((user) => user.id == id)
    allUsersPermissions[index].permissions = [...ArrayOfpermissions]
    const newUserPermission = [...allUsersPermissions]
    await setPermissions(newUserPermission)
}

const deletePermissions = async (id) => {
    const allUsersPermissions = await readPermissions();
    const index = allUsersPermissions.findIndex((user) => user.id == id)
    allUsersPermissions.splice([index], 1);
    await setPermissions(allUsersPermissions)
}


module.exports = {setPermissions, readPermissions, getAllUsersPermissions, getPermissionById, addUserPermissions, updatePermissions, deletePermissions} 