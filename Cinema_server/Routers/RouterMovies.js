const express = require('express');
const { getAllMoviesData, AddMovie, updeteMovie, removeMovie, getMovieData } = require('../Utils/MoviesUtils');
const router = express.Router();

router.route('/').get(async (req, res) => {
    try{
        const response = await getAllMoviesData()
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').get(async (req, res) => {
    const id = req.params.id
    try{
        const response = await getMovieData(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/').post(async (req, res) => {
    const movie = req.body
    try{
        const response = await AddMovie(movie)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').put(async (req, res) => {
    const id = req.params.id
    const movie = req.body
    try{
        const response = await updeteMovie(id, movie)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

router.route('/:id').delete(async (req, res) => {
    const id = req.params.id
    try{
        const response = await removeMovie(id)
        return res.json(response)
    }catch(err){
        return res.json(err)
    }
})

module.exports = router