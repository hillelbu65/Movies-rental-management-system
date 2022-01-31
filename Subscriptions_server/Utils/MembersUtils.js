const { getAllMembers, getMemberById, addMember, updaetMember, deleteMember, getMembersDal } = require("../DAL/DALmembers")

const AllMembers = async () => {
    const members = await getAllMembers()
    return members
}

const MemberById = async (id) => {
    const member = await getMemberById(id)
    return member
}

const AddMember = async (obj) => {
   const response = await addMember(obj)
   return response
}

const UpdateMember = async (id, obj) => {
    const response = await updaetMember(id, obj)
    return response
}

const DeleteMember = async (id) => {
    const response = await deleteMember(id)
    return response
}

const setAllMembers = async () => {

    const currentMembers = await getAllMembers()

    //If the database already has members in it, the collection will not be filled.
    if(currentMembers.length == 0)
    {
     const members = await (await getMembersDal()).data
        members.forEach(user => {
             const member = {
                 name: user.name,
                 email: user.email,
                 city: user.address.city
             }
             addMember(member)
         })    
    }
 }

module.exports = {setAllMembers, AllMembers, MemberById, AddMember, UpdateMember, DeleteMember}