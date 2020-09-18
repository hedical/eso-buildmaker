import React, { useState } from 'react'

const Register = () => {
    const

    return (
        <div>
            <h2>Register</h2>
            <form>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" />
                <input type="password" placeholder="Verify password" />

                <label htmlFor="register-username">Username</label>
                <input id="register-username" type="text" />

                <input type="submit" value="Register" />

            </form>
        </div>
    )
}

export default Register
