import React from 'react'
import {Route} from 'react-router-dom'
import OnBoarding from '../views/OnBoarding'

const Unauthorized = () => <Route path="/explore" component={OnBoarding} />

export default Unauthorized
