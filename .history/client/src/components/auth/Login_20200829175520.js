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
        await axios.post(
            "http://localhost:5000/users/register",
            newUser);

        const loginResponse = await axios.post("http://localhost:5000/users/login", loginUser)
        console.log(loginResponse.data);
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user
        })
        localStorage.setItem("auth-token", loginResponse.data.token)
        history.push('/')
    }

    return (
        <div>
            Login
        </div>
    )
}

export default Login
