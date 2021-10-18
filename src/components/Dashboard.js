import React, { useState, useEffect } from 'react'
import { Card, Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { ref } from '../firebase'
import { Link } from 'react-router-dom'


export default function Dashboard() {
    const [error, setError] = useState('')
    //get the current user
    const { currentUser } = useAuth()
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(true)
    var items = []
    
    //getData from firestore and insert it do data array
    function getData() {
        ref.onSnapshot((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
                //if the currenent user is equal to one the email users
                if (doc.data().email === currentUser.email) {
                    //create an new objcet
                    var obj = {
                        birth:  doc.data().birth,
                        date: doc.data().date,
                        email: doc.data().email,
                        name: doc.data().name,
                        address: doc.data().address
                    }
                    //add to array
                    items.push(obj)
                }
            })
            //insert the data to the array
            setdata(items)
            setloader(false)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <Card>
                <Card.Body style={{ backgroundColor: 'Yellow' }}>
                    <h2  className="text-center mb-4"  >Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div  className="w-100 mt-2">
                        {loader === false && (
                            data.map
                                ((value, key) =>
                                    <div>
                                        <h5 ><strong><label className="label" >Email: </label></strong>  {value.email}  </h5>
                                        <h5><strong> <label className="label">Full Name: </label></strong> {value.name}  </h5>
                                        <h5><strong> <label className="label">Address: </label></strong> {value.address}  </h5>
                                        <h5><strong><label className="label">Birth: </label></strong>  {value.birth} </h5>
                                        <h5><strong><label className="label">Date: </label></strong> {value.date}  </h5>
                                    </div>
                                )
                        )
                        }
                    </div>
                <Link to="/update-profile"  className="btn btn-primary w-100 mt-3">Edit Profile</Link>
                <Link to="/login"  className="btn btn-primary w-100 mt-3">Log-Out</Link>
                </Card.Body>  
            </Card>         
        </>
    )
}
