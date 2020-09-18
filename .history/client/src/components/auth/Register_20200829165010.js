import React from 'react'

const Register = () => {
    return (
        <div>
            <h2>Register</h2>
            <form>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" />

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" />
                <input type="password" placeholder="Verify password" />

            </form>
        </div>
    )
}

export default Register
