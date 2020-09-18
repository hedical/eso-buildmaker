import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ErrorNotice from '../misc/ErrorNotice'
import Jumbo from '../Jumbo'

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordCheck, setPasswordCheck] = useState()
    const [username, setUsername] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { email, password, passwordCheck, username }
            await axios.post(
                "/users/register",
                newUser);

            const loginResponse = await axios.post("/users/login", {
                email,
                password,
            });
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token)
            history.push('/')
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }

    }


    return (
        <div>
            <Jumbo text="Register" />
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div className="container">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="register-email">Email address</label>
                        <input id="register-email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">Password</label>
                        <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-1" />
                        <input type="password" placeholder="Verify password" onChange={(e) => setPasswordCheck(e.target.value)} className="form-control" />
                    </div>
                    <label htmlFor="register-username">Username</label>
                    <input id="register-username" type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" />

                    <input type="submit" value="Register" className="btn btn-primary mt-2" />

                </form>
            </div>

        </div>
    )
}

export default Register
