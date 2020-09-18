import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'




const Footer = () => {

    return (

        <footer className="navbar navbar-expand navbar-light">

            <p className="text-light">This build was created using ESO Build Maker</p>


            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li><Link className="navbar-brand text-white" to="https://docs.gitbook.com/">Discover our API</Link></li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer