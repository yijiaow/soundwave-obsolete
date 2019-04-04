import React, {Component} from 'react'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import {createUser} from '../api/user'
import {Formik} from 'formik'

class SignupForm extends Component {
  handleSubmit = (values, actions) => {
    createUser(values)
  }
  render() {
    return (
      <Formik>
        {({values, touched, errors, handleChange, handleSubmit, isValid}) => (
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <TextField name="email" label="Email" onChange={handleChange} />
            <TextField
              name="username"
              label="Username"
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
            />
            <PrimaryButton type="submit" color="secondary" disabled={!isValid}>
              Create Account
            </PrimaryButton>
          </form>
        )}
      </Formik>
    )
  }
}

export default SignupForm
