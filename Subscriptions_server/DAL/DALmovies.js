require('../Configs/subscriptionsDb');
const movieModel = require('../models/moviesModel')

const { default: axios } = require("axios")
const moviesUrl = 'https://api.tvmaze.com/shows'

const getMoviesDal = async () => {
    const response = await axios.get(moviesUrl)
    return response
}

const getAllMovies = () => {
    return new Promise((resolve,reject) => {
        movieModel.find({}, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getMovieById = (id) => {
    return new Promise((resolve,reject) => {
        movieModel.findById(id, (err, data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const addMovie = (obj) => {
    return new Promise((resolve,reject) => {
        const newObject = new movieModel(obj)
        newObject.save((err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const updaetMovie = (id,change) => {
    return new Promise((resolve,reject) => {
        movieModel.findByIdAndUpdate(id, change, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

const deleteMovie = (id) => {
    return new Promise((resolve,reject) => {
        movieModel.findByIdAndDelete(id, (err,data) => {
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })   
    })
}

module.exports = {getAllMovies, getMovieById, addMovie, updaetMovie, deleteMovie, getMoviesDal}