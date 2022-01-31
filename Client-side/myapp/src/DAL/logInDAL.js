import axios from 'axios'

const sendPasswordAndUsername = async (username, password) => {
    const response = await axios.post(`http://localhost:4000/login`, {username: username, password: password})
    return response
}

export {sendPasswordAndUsername}