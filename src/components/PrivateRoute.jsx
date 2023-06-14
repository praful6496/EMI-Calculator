import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
  const users = localStorage.getItem('loggedInUser')
  return users !== null ? props.element : <Navigate to="/signin" />
}

export default PrivateRoute