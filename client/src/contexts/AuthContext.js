import React, {useContext, useState, useEffect, useReducer} from "react"
import {auth} from "../firebase"
import AppReducer from "./AppReducer";

const initialState = {
    userData: {},
    follower : {}
}
export const AuthContext = React.createContext(initialState)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        updateUserData({})
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function userId(id) {

    }

    function getUserId() {
    }

    function updateUserData(data) {
        dispatch({
            type: 'UPDATE_USER_DATA',
            payload: data
        });
    }
    function updateFollowerData(data) {
        dispatch({
            type: 'UPDATE_FOLLOWER_DATA',
            payload: data
        });
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        userId,
        getUserId,
        updateUserData,
        userData: state.userData,
        updateFollowerData,
        follower: state.follower
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
