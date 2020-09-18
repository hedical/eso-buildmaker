import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'

const AuthOptions = () => {

    const history = useHistory(); // will follow everything in the navbar
    const register = () => history.push("/register")
    const login = () => history.push("/login")

    return (
        <div>
            <button className="btn text-light" onClick={register}>Register</button>
            <button className="btn text-light" onClick={login}>Log in</button>
        </div>
    )
}

export default AuthOptions
