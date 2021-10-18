import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../firebase"


const AuthContext = React.createContext()
//return the body of authProvider
export function useAuth() {
    return useContext(AuthContext)
}
//get the whole functions
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    async function changeEmail(newEmail) {
        return currentUser.updateEmail(newEmail)
    }

    async function changePassword(newPassword) {
        return currentUser.updatePassword(newPassword)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })
    //export functions and values
    const value = {
        currentUser,
        signup,
        login,
        changeEmail,
        changePassword
    }
    //provider
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
