import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';


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
        localStorage.setItem("x-auth-token", "");
    }

    return (
        <div className="row">
            {
                userData.user
                    ? <>
                        <button className="btn text-light">{userData.user.username}</button>
                        <button className="btn text-light" onClick={logout}>Log out</button>
                        <div className="mr-2">
                            <Avatar src="/broken-image.jpg" />
                        </div>
                    </>

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
