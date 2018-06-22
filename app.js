const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/ping', (req, res) => {
  res.status(200).json({message: 'PONG'})
})

app.use((req, res, next) => {
  next({status: 404, message: 'Route Not Found'})
})

app.use((err, req, res, next) => {
  const error = {}
  error.status = err.status || 500
  error.message = err.message || 'Internal Server Error'

  res.status(error.status).json({error})
})



app.listen(port, () => {
  console.log(`listening on port ${port}`)
})