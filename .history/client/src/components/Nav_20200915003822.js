import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'




const Nav = () => {

    return (

        <nav className="navbar navbar-expand navbar-light bg-dark">

            <Link className="navbar-brand text-white" to="/"><img src={require("../utils/images/Logo.png")} className="card-img" alt={""} style={{ height: 10 %}} /></Link>

            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <AuthOptions />
                </ul>
            </div>

        </nav>
    )
}

export default Nav
