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
AWS.config.update({
  region: 'us-west-1',
  endpoint: 'http://localhost:8000'
})
const docClient = new AWS.DynamoDB.DocumentClient()

app.listen(process.env.PORT)
app
  .use(express.static(path.join(__dirname, '/../assets')))
  .use(express.static(path.join(__dirname, '/')))

  .use(bodyParser.json())
  .post('/signup', (req, res) => {
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
  .post('/signin', (req, res) => {
    const { email, password } = req.body
    const user = docClient.get(
      {
        TableName: 'Users',
        Key: { email },
        ProjectionExpression: '#h',
        ExpressionAttributeNames: { '#h': 'hash' }
      },
      async (err, data) => {
        if (err) {
          console.error(
            'Unable to find item. Error JSON:',
            JSON.stringify(err, null, 2)
          )
          res.status(500).json({ error: `Internal Server Error: ${err}` })
        }
        else {
          const passwordHash = data.Item.hash
          try {
            const isMatch = await bcrypt.compare(password, passwordHash)
            if (isMatch) {
              const token = jwt.sign({ email }, process.env.TOKEN_SECRET)
              res.status(201).json({ email, token })
            }
            res.status(401).json({ error: 'Unauthorized' })
          }
          catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
          }
        }
      }
    )
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
function authorize(req, res, next) {
  const token = req.get('token')
  if (!token) {
    return res.status(403).json({
      error: 'Forbidden'
    })
  }
  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  }
  catch (err) {
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(403).json({
        error: 'Forbidden'
      })
    }
    console.error(err)
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}
