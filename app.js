const express = require('express')
const { mongo } = require('mongoose')
const mongoose = require('mongoose')

const exphbs = require('express-handlebars')

const Todo = require('./models/todo')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  // get all todo document
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
  })

app.listen(3000, () => {
  console.log('App is running on port 3000')
})