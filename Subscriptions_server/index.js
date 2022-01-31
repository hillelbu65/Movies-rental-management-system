const express = require('express')
const cors = require('cors')

//Setup express appliction.
const app = express()
const membersRouter = require('./Routers/RoutersMembers')
const moviesRouter = require('./Routers/RoutersMovies')
const subscriptionsRouter = require('./Routers/RoutersSubscribtion');
require('./Configs/subscriptionsDb')
const PORT = 8000;

 //Call the functiom setAllMembers.
const { setAllMembers } = require('./Utils/MembersUtils');
setAllMembers()

//Call the functiom setAllMovies.
const { setAllMovies } = require('./Utils/MoviesUtils')
setAllMovies()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Set up a route.
app.use('/members', membersRouter)
app.use('/movies', moviesRouter)
app.use('/subscriptions', subscriptionsRouter)

//Listen to the port of my api.
app.listen(PORT, () => {
    console.log(`on the http://localhost:${PORT}`)
})