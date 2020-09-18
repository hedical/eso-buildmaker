import React, { useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ErrorNotice from '../misc/ErrorNotice'
import Jumbo from '../Jumbo'

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const { setUserData } = useContext(UserContext)
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password }

            const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser)
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            })
            localStorage.setItem("auth-token", loginResponse.data.token)
            history.push('/')
        } catch (err) {
            err.response.data.msg && setError(err.response.msg);
        }

    }

    return (
        <div>
            <Jumbo text="Login" />
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <div className="container">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email</label>
                        <input id="login-email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />

                    </div>


                    <input type="submit" value="Login" className="btn btn-primary" />

                </form>
            </div>





        </div>
    )
}

export default Login
