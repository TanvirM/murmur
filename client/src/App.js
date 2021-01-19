import React from "react"
import Signup from "./components/auth/Signup"
import {Container} from "react-bootstrap"
import {Switch, Route} from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import Login from "./components/auth/Login"
import AuthRoute from "./components/route/AuthRoute"
import ForgotPassword from "./components/auth/ForgotPassword"
import BaseRouter from "./components/route/BaseRouter";

function App() {
    return (
        <Container>
            <div>
                <BaseRouter/>
            </div>
        </Container>
    )
}

export default App
