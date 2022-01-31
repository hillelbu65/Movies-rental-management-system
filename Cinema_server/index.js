const express = require('express')
const cors = require('cors')
require('./configs/mongoDB')

//Setup express appliction.
const app = express()
const routerLogIn = require('./Routers/RouterLogIn')
const routerUsers = require('./Routers/RouterUsers')
const routerMovies = require('./Routers/RouterMovies')
const routerMembers = require('./Routers/RourerMembers')
const routerSubscriptions = require('./Routers/RouterSubscriptions') 
const routerCreateAccount = require('./Routers/RouterCreateAccount')
const PORT = 4000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Set up a route.
app.use('/login', routerLogIn)
app.use('/users', routerUsers)
app.use('/movies', routerMovies)
app.use('/members', routerMembers)
app.use('/subscriptions', routerSubscriptions)
app.use('/createaccount', routerCreateAccount)


//Listen to the port of my api.
app.listen(PORT, () => {
    console.log(`on the http://localhost:${PORT}`)
})