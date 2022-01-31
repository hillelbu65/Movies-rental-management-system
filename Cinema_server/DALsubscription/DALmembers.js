const { default: axios } = require("axios")
const url = 'http://localhost:8000/members'

const getMembers = async () => {
    const allMembers = await axios.get(url) 
    return allMembers
}

const getMemberbyId = async (id) => {
    const member = await axios.get(`${url}/${id}`)
    return member
}

const addMember = async (obj) => {
    const member = await axios.post(`${url}`, obj)
    return member
}

const updateMember = async (id, obj) => {
    const member = await axios.put(`${url}/${id}`, obj)
    return member
}

const deleteMember = async (id) => {
    const member = await axios.delete(`${url}/${id}`)
    return member
}

module.exports = {getMembers, getMemberbyId, addMember, updateMember, deleteMember}