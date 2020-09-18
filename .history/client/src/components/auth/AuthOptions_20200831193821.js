import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'

const AuthOptions = () => {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory(); // will follow everything in the navbar
    const register = () => history.push("/register")
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }

    return (
        <div>
            {
                userData.user
                    ? <h3>userData.user.username</h3>
                    <button className="btn text-light" onClick={logout}>Log out</button>
                    :
                    <>
                        <button className="btn text-light" onClick={register}>Register</button>
                        <button className="btn text-light" onClick={login}>Log in</button>
                    </>

            }

        </div>
    )
}

export default AuthOptions
