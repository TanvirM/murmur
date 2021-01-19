import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router} from "react-router-dom"
import {AuthProvider} from "./contexts/AuthContext";

ReactDOM.render(
    <AuthProvider>
        <React.StrictMode>
            <div>
                <Router>
                    <App/>
                </Router>
            </div>
        </React.StrictMode>
    </AuthProvider>,
    document.getElementById("root")
)
