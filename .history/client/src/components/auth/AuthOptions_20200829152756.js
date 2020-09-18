import React from 'react'
import { useHistory } from 'react-router-dom'

const AuthOptions = () => {

    const history = useHistory(); // will follow everything in the navbar
    return (
        <div>
            <button>Register</button>
            <button>Log in</button>
        </div>
    )
}

export default AuthOptions
