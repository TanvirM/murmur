import React from "react"
import Signup from "../auth/Signup"
import {AuthProvider} from "../../contexts/AuthContext"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../auth/Login"
import PrivateRoute from "./AuthRoute"
import ForgotPassword from "../auth/ForgotPassword"
import UserProfile from "../pages/UserProfile"

function App() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path="/" component={Dashboard}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/forgot-password" component={ForgotPassword}/>
                <Route path="/user/profile/:user_id/" component={UserProfile}/>
            </Switch>
        </div>
    )
}

export default App
