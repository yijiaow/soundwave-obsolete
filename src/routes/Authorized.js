import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../views/Home'

const Authorized = () => <Route path="/home" component={Home} />

export default Authorized
