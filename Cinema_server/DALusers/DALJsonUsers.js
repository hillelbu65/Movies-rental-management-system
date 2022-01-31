const jsonFile = require('jsonfile');
const file = __dirname + '/users.json'


//write to users json file.
const setUsers = (array) => {
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

//read from users json file.
const readUsers = () => {
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

const getAllUsersJson = async () => 
{
    const allUsers = await readUsers()
    return allUsers
}

const getUserByIdJson = async (id) => 
{
    const allUsers = await readUsers()
    const filterUsers = allUsers.find((user) => user.id == id)
    return filterUsers
}

const addUserJson = async (user) => 
{
    const allUsers = await readUsers();
    const newUsersArray = [...allUsers,user]
    setUsers(newUsersArray)
}

const updateUserJson = async (id, update) => 
{
    const allUsers = await readUsers();
    const index = allUsers.findIndex((user) => user.id == id)
    allUsers[index] = update
    const newAllUsers = [...allUsers]
    await setUsers(newAllUsers)
}


const deleteUserJson = async (id) => {
    const allUsers = await readUsers();
    const index = allUsers.findIndex((user) => user.id == id)
    allUsers.splice([index], 1);
    await setUsers(allUsers)
}


module.exports = {getAllUsersJson, getUserByIdJson, addUserJson, updateUserJson, deleteUserJson} 