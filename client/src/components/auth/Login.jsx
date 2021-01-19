import React, {useContext, useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {Link, useHistory} from "react-router-dom"
import axios from "axios";
import {AuthContext, useAuth} from "../../contexts/AuthContext";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [login_data, setLogin] = useState();
    const {updateUserData} = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            await axios.post('http://localhost:3000/api/user/login/', {
                'email': emailRef.current.value,
            }).then(function (res) {
                updateUserData(res.data.row[0])
                localStorage.setItem('m_user',JSON.stringify(res.data.row[0]))
            });

            history.push("/")
        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
