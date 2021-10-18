import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      setError("")
      setLoading(true)
      //regex for validate password
      const myReg = new RegExp("^[A-Za-z0-9_-]*$")
      var [err , mess]= [false , ""]  ;
      var happend = false
      //validate condition when length of passowrd is longer than 5
      if(passwordRef.current.value < 6){
        err = true; 
        mess= "Failed to sign in ,need at least 6 characters" 
      //validate password for containning letters and numbers  
      }else if(!myReg.test(passwordRef.current.value)){
        mess= "Failed to sign in ,password should include letters and numbers" 
      //password is valid
      } else {
        happend = true
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/dashboard")  
      }
    } catch {
      //if the error is not because our conditions
      if(happend){
        setError("cannot sign in , bad password")
      //if the error is because our conditions like at least 6 length
      }else{
        setError(mess)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body style={{ backgroundColor: 'Yellow' }}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
                Login 
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}