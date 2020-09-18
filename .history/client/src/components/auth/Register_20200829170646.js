import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import useHistory from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, passwordCheck, username }
        await axios.post("http://localhost:5000/users/register", newUser)
        const loginResponse = axios.post("http://localhost:5000/users/login", {
            email,
            password,
        });
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        })
        localStorage.setItem("auth.token", loginResponse.data.token)
        history.push('/')
    }

    return (
        <div>
            <h2>Register</h2>
            <form>
                <label htmlFor="register-email">Email</label>
                <input id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)} />

                <label htmlFor="register-username">Username</label>
                <input id="register-username" type="text" onChange={(e) => setUsername(e.target.value)} />

                <input type="submit" value="Register" />

            </form>
        </div>
    )
}

export default Register
