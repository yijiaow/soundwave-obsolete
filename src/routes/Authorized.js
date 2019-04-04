import React from 'react'
import {Route} from 'react-router'
import Home from '../views/Home'

const Authorized = () => <Route path="/home" Component={Home} />

export default Authorized
