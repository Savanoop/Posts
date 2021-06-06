import { Redirect, Route } from "react-router"
import { fakeAuth } from "../../helper/auth"

export default function PrivateRoute ({ children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return fakeAuth.isAuthenticated === true
        ? children
        : <Redirect to='/' />
    }} />
  )
}