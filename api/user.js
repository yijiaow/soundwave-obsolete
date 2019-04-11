import * as axios from 'axios'

export const createUser = data => axios.post('/register', data)

export const login = data => axios.post('/login', data)

export const 