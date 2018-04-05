/* eslint-disable no-unused-vars */

const env = require('dotenv').config()
const request = require('request')
const express = require('express')
const path = require('path')
const app = express()

const apikey = process.env.TICKETMASTER_KEY

app.use(express.static(path.join(__dirname, '/../assets')))
app.use(express.static(path.join(__dirname, '/')))

app.get('/events/search', (req, res) => {
  const queryString = req.url.split('?')[1]
  request(
    `${
      process.env.TICKETMASTER_URL
    }/events.json?classificationName=music&${queryString}&apikey=${apikey}`,
    (err, response, body) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.parse(body)._embedded)
    }
  )
})

app.get('/genres/all', (req, res) => {
  request(
    `https://app.ticketmaster.com/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ%20?apikey=${apikey}`,
    (err, response, body) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.parse(body)._embedded.genres)
    }
  )
})
app.listen(process.env.PORT, () =>
  console.log(`Express app listening on port ${process.env.PORT}!`)
)
