const { default: axios } = require("axios")
const url = 'http://localhost:8000/movies'

const getMovies = async () => {
    const allMovies = await axios.get(url) 
    return allMovies
}


const getMovieById = async (id) => {
    const movie = await axios.get(`${url}/${id}`)
    return movie
}

const addMovie = async (obj) => {
    const movie = await axios.post(`${url}`, obj)
    return movie
}

const updateMovieById = async (id, obj) => {
    const movie = await axios.put(`${url}/${id}`, obj)
    return movie
}

const deleteMovie = async (id) => {
    const movie = await axios.delete(`${url}/${id}`)
    return movie
}

module.exports = {getMovies, getMovieById, addMovie, updateMovieById, deleteMovie};