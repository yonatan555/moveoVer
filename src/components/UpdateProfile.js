import React, { useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { ref } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

toast.configure()
export default function UpdateProfile() {
    const [loading, setLoading] = useState()
    const [error, setError] = useState('')
    //get the current user , and function for changing the mail,password auth
    const { currentUser, changeEmail, changePassword } = useAuth()
    //get paramerts from users
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [birth, setBirth] = useState();
    const [date, setDate] = useState();
    const history = useHistory()
    const notify = () => {
        toast("Action has Success")
    }
    const notify2 = () => {
        toast("Couldnt change password")
    }
    //validate the password
    async function aviable(oldPassword, newPassword) {
        if (oldPassword === newPassword) return false
        const myReg = new RegExp("^[A-Za-z0-9_-]*$")
        if (newPassword < 6) {
            return false
        } else if (!myReg.test(newPassword)) {
            return false
        }
        return true
    }
    var flag = false;
    //update the right file in fireStore && auth currentUser
    function update() {
        ref.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach(async (doc) => {
                //if the currenent user is equal to one the email users
                if (doc.data().email === currentUser.email) {
                    var oldPass = doc.data().password;
                    flag = await aviable(oldPass, password)
                    //updating the fileds that got fill
                    //there is password and password is valid
                    if (password && flag) {
                        await changePassword(password)
                        await doc.ref.update({
                            password: password
                        })
                        //wrong password 
                    } else if (password && !flag) {
                        notify2()
                        setError('pass didnt change')
                        return
                    }
                    flag = true;
                    if (email) {
                        await changeEmail(email)
                        await doc.ref.update({
                            email: email
                        })
                    }
                    if (date) {
                        await doc.ref.update({
                            date: date
                        })
                    }
                    if (birth) {
                        await doc.ref.update({
                            birth: birth
                        })
                    }
                    if (name) {
                        await doc.ref.update({
                            name: name
                        })
                    }
                    if (address) {
                        await doc.ref.update({
                            address: address
                        })
                    }
                }
            })
        })
        if (flag) {
            notify()
            history.push('/dashboard')
        }
    }
    return (
        <>
            <Card>
                <Card.Body style={{ backgroundColor: 'Yellow' }}>
                    <h2 className="text-center mb-4">Edit Logged Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="w-100 mt-2">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter new email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter new Passowrd" value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter new Name" value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <Form.Label>address</Form.Label>
                            <Form.Control type="address" name="address" placeholder="Enter new address" value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            <Form.Label>date</Form.Label>
                            <Form.Control type="date" name="date" placeholder="Enter new date" value={date}
                                onChange={(e) => setDate(e.target.value)} />
                            <Form.Label>birth</Form.Label>
                            <Form.Control type="date" name="birth" placeholder="Enter new birth" value={birth}
                                onChange={(e) => setBirth(e.target.value)} />
                            <br></br><Button disabled={loading} onClick={update} className="w-100" type="submit">Submit</Button>
                        </Form.Group>
                    </div>
                    <div className="w-100 text-center mt-2">
                        <Link to="/dashboard">Cancel</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
