const express = require('express')
const router = express.Router();
const moviesBL = require('../Utils/MoviesUtils')


//THE ROUTERS//

//Get all router. 
router
.route('/')
.get( async (req,res) => {
    try {
        const allMovies = await moviesBL.AllMovises()
        return res.json(allMovies)
    }catch(err){
        return err
    }
})

//Get by id router.
router
.route('/:id')
.get(async (req,res) => {
    try{
        const id = req.params.id
        const movie = await moviesBL.MovieById(id)
        return res.json(movie)
    }catch(err){
        return res.json(err)
    }
})

//Add router. 
router
.route('/')
.post(async (req,res) => {
    try{
        const obj = req.body
        const newMovie = await moviesBL.AddMovie(obj)
        return res.json(newMovie)
    }catch(err){
        return res.json(err)
    }
})

//Put router by geting an id he oprate the 'req' and call the update function from the Utils file.
router
.route('/:id')
.put(async (req,res) => {
    try{
        const id = req.params.id
        const obj = req.body
        const update = await moviesBL.UpdateMovie(id,obj)
        return res.json(update)
    }catch(err){
        return res.json(err)
    }
})

//Delete router, by geting an id he call the deletDocument function from Utils file.
router
.route('/:id')
.delete(async (req,res) => {
    try{
        const id = req.params.id
        const deleteObj = await moviesBL.DeleteMovie(id)
        return res.json(deleteObj)
    }catch(err){
        return res.json(err)
    }
})


//Export the router.
module.exports = router;
