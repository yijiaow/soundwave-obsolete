import React from 'react'
import {Route} from 'react-router'
import OnBoarding from '../views/OnBoarding'

const Unauthorized = () => <Route path="/explore" Component={OnBoarding} />

export default Unauthorized
