import axios from "axios"
const url = `http://localhost:4000/movies`

const getAllMovies = async () => {
    const response = await axios.get(url)
    return response
}

const getMovieById = async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response
}

const addMovie = async (obj) => {
    const response = await axios.post(url, obj);
    return response
}

const updateMovie = async (id, obj) => {
    const response = await axios.put(`${url}/${id}`, obj)
    return response
}

const deleteMovie = async (id) => {
    const response = await axios.delete(`${url}/${id}`)
    return response
}

export {addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie}