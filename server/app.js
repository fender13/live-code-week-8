const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT) || 3000

const dbconnect = process.env.DB_NAME
mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

const indexRoutes = require('./routes/index')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRoutes)

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'ERROR 404 - PAGE NOT FOUND'
  })
})

app.listen(port, () => {
  console.log('SERVER IS ON AND LISTEN TO PORT', port)
})