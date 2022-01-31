import axios from "axios"
const url = `http://localhost:4000/members`

const getAllMembers = async () => {
    const response = await axios.get(url)
    return response
}

const getMemberById = async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response
}

const addMember = async (obj) => {
    const response = await axios.post(url, obj);
    return response
}

const updateMember = async (id, obj) => {   
    const response = await axios.put(`${url}/${id}`, obj)
    return response
}

const deleteMember = async (id) => {
    const response = await axios.delete(`${url}/${id}`)
    return response
}

export {getAllMembers, getMemberById, addMember, updateMember, deleteMember}