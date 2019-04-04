import React from 'react'
import {Formik, Field} from 'formik'

const TextField = props => (
  <div>
    <input
      className={styles.textField}
      autoComplete="off"
      autoCorrect="off"
      {...props}
    />
    <div>{props.error && error}</div>
  </div>
)

export default TextField
