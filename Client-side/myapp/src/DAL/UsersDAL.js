import axios from "axios"
const url = `http://localhost:4000/users`

const getAllUsers = async () => {
    const response = await axios.get(url)
    return response
}

const getUserById = async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response
}

const addUser = async (obj) => {
    const response = await axios.post(url, obj);
    return response
}

const updateUser = async (id, obj) => {
    const response = await axios.put(`${url}/${id}`, obj)
    return response
}

const deleteUser = async (id) => {
    const response = await axios.delete(`${url}/${id}`)
    return response
}

export {addUser, getAllUsers, getUserById, updateUser, deleteUser}