const { getAllMovies, getMovieById, addMovie, updaetMovie, deleteMovie, getMoviesDal } = require("../DAL/DALmovies")

const AllMovises = async () => {
    const movies = await getAllMovies()
    return movies
}

const MovieById = async (id) => {
    const movie = await getMovieById(id)
    return movie
}

const AddMovie = async (obj) => {
   const response = await addMovie(obj)
   return response
}


const UpdateMovie = async (id, obj) => {
    const response = await updaetMovie(id, obj)
    return response
}

const DeleteMovie = async (id) => {
    const response = await deleteMovie(id)
    return response
}


const setAllMovies = async () => {
    const currentMeovies = await AllMovises()

    //If the database already has movies in it, the collection will not be filled.
   if(currentMeovies.length == 0)
   {
    const response = await (await getMoviesDal()).data
        response.forEach(movie => {
            const movieM = {
                name: movie.name,
                genres : [...movie.genres],
                image : movie.image.original,
                premiered : new Date(movie.premiered)
            }
            addMovie(movieM)
        })   
   }
}

module.exports = {setAllMovies, AllMovises, MovieById, AddMovie, UpdateMovie, DeleteMovie}