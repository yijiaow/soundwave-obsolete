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
  .post('/signup', async (req, res) => {
    const { email, password } = req.body
    const saltRounds = 10
    try {
      const hash = await bcrypt.hash(password, saltRounds)
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
          const token = jwt.sign({ email }, process.env.TOKEN_SECRET)
          res.status(201).json({ email, token })
        }
      })
    }
    catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` })
    }
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
            else {
              res.status(401).json({ error: 'Unauthorized' })
            }
          }
          catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
          }
        }
      }
    )
  })
  .get('/events/search', (req, res) => {
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
  .post('/events/:id/save', (req, res) => {
    const { user, event } = req.body
    console.log(user.email)
    const savedEvents = docClient.update(
      {
        TableName: 'Users',
        Key: { email: user.email },
        UpdateExpression:
          'SET events = list_append(if_not_exists(events, :new_list), :attrValue)',
        ExpressionAttributeValues: {
          ':new_list': [],
          ':attrValue': [event]
        },
        ReturnValues: 'UPDATED_NEW'
      },
      (data, err) => {
        if (err) {
          console.error(
            'Unable to find user record. Error JSON:',
            JSON.stringify(err, null, 2)
          )
        }
        else {
          console.log('Updated item:', JSON.stringify(data, null, 2))
        }
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
    console.log('authorized')
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
