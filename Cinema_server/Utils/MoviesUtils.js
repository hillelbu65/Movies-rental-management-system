const { getMovies, updateMovieById, addMovie, deleteMovie, getMovieById } = require("../DALsubscription/DALmovies")
const { AllSubscriptions } = require("./SubscriptionsUtils")


//get all movies and subscriptions and add to each movie the subscriptions that watched it.
const getAllMoviesData = async () => {
    const movies = await (await getMovies()).data
    const subs = await AllSubscriptions()
    const send = []
    movies.forEach(mov => {
        send.push(
            {
                _id: mov._id,
                name: mov.name,
                genres: mov.genres,
                image: mov.image,       
                premiered: mov.premiered,
                subscribers: [...subs.filter( sub => sub.movies.find(movie => movie.movieId == mov._id))]
            }
        )
    })
    return send
}

const getMovieData = async (id,) => {
    const movie = await (await getMovieById(id)).data
    return movie
}

const updeteMovie = async (id, obj) => {
    const movie = await (await updateMovieById(id, obj)).data
    return movie?{updete: true}: {updete: false}
}

const AddMovie = async (obj) => {
    const movie = await (await addMovie(obj)).data
    return movie?{added: true}:{added: false}
}

const removeMovie = async (id) => {
    const movie = await (await deleteMovie(id)).data
    return movie?{deleted: true}:{deleted: false}
}

module.exports = {getAllMoviesData, getMovieData, updeteMovie, AddMovie, removeMovie}