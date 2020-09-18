import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'




const Nav = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-dark">

            <Link className="navbar-brand text-white" to="/">Eso BuildMaker</Link>

            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <AuthOptions />
            </div>

        </nav>
    )
}

export default Nav
