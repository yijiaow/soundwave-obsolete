import * as axios from 'axios'

export const createUser = data => axios.post('/register', data)
