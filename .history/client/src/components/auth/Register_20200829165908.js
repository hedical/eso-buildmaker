import React, { useState, useContext } from 'react'
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()

    const submit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, passwordCheck, username }
        const registerResponse = await axios.post("http://localhost:5000/users/register", newUser)
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
