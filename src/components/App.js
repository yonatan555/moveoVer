import React from 'react'
import { Container } from "react-bootstrap"
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import Login from "./Login"
import signup from "./Signup"
import UpdateProfile from "./UpdateProfile"

//routes
function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/signUp" component={signup} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
