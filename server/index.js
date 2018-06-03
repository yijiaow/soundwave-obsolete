/* eslint-disable no-unused-vars */
const env = require('dotenv/config')
const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
const app = express()

const API_KEY = process.env.TICKETMASTER_KEY

app.listen(process.env.PORT, () =>
  console.log(`Express app listening on port ${process.env.PORT}!`)
)
AWS.config.update({
  region: 'us-west-1',
  endpoint: 'http://localhost:8000'
})
const docClient = new AWS.DynamoDB.DocumentClient()

app.use(express.static(path.join(__dirname, '/../assets')))
app.use(express.static(path.join(__dirname, '/')))

app.use(bodyParser.json())
app.post('/signup', (req, res) => {
  const { email, password } = req.body
  const saltRounds = 10
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` })
    }
    const params = {
      TableName: 'Users',
      Item: { email, hash }
    }
    docClient.put(params, err => {
      if (err) {
        console.error(
          'Unable to add user. Error JSON:',
          JSON.stringify(err, null, 2)
        )
      }
      else {
        res.sendStatus(201)
      }
    })
  })
})
app.get('/events/search', (req, res) => {
  const queryString = req.url.split('?')[1]
  request(
    `${
      process.env.TICKETMASTER_URL
    }/events.json?classificationName=music&${queryString}&apikey=${API_KEY}`,
    (err, response, body) => {
      if (err) {
        console.log(err)
      }
      res.json(JSON.parse(body)._embedded)
    }
  )
})

app.get('/genres/all', (req, res) => {
  request(
    `https://app.ticketmaster.com/discovery/v2/classifications/segments/KZFzniwnSyZfZ7v7nJ%20?apikey=${API_KEY}`,
    (err, response, body) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.parse(body)._embedded.genres)
    }
  )
})
