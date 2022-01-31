import axios from "axios"
const url = `http://localhost:4000/createaccount`

// Send the the user Password to the server.
const addUserPassword = async (obj) => {
    const response = await axios.post(url, obj)
    return response
}

export {addUserPassword}