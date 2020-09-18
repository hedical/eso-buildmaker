import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        const loginUser = { email, password }

        const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser)
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        })
        localStorage.setItem("auth-token", loginResponse.data.token)
        history.push('/')
    }

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input id="login-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} />

                <input type="submit" value="Login" />

            </form>
        </div>
    )
}

export default Login
