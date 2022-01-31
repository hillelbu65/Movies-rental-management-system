const { getMembers, getMemberbyId, addMember, updateMember, deleteMember } = 
require("../DALsubscription/DALmembers")

const AllMembers = async () => {
    const members = await (await getMembers()).data
    return members
}

const MemberById = async (id) => {
    const member = await (await getMemberbyId(id)).data
    return member
}

const AddMember = async (obj) => {
   const response = await (await addMember(obj)).data
   return response?{added: true}:{added: false}
}

const UpdateMember = async (id, obj) => {
    const response = await (await updateMember(id, obj)).data
    return response
}

const DeleteMember = async (id) => {
    const response = await (await deleteMember(id)).data
    return response
}

module.exports = {AllMembers, MemberById, AddMember, UpdateMember, DeleteMember}