import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'




const Nav = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-dark">

            <Link className="navbar-brand text-white" to="/">Eso BuildMaker</Link>

            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <AuthOptions />

                </ul>
            </div>

        </nav>
    )
}

export default Nav
