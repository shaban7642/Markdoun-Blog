const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const articlesRouter = require('./routes/articles')
const app = express()

app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/blog' , { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true } ,console.log('connected to db!'))

app.use('/' , articlesRouter)

app.listen(5000)