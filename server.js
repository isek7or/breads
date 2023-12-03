// DEPENDENCIES
const express = require('express')
// DEPENDENCIES
const mongoose = require('mongoose')
// DEPENDENCIES
const methodOverride = require('method-override')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// MIDDLEWARE
app.use(express.static('public'))
// MIDDLEWARE
app.use(express.urlencoded({extended: true}))
// MIDDLEWARE
app.use(methodOverride('_method'))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})
// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)
// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

//Connect to your mongodb and listen on port given by env
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('connected to mongo: ', process.env.MONGO_URI))

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})
