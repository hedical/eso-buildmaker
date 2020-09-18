import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'




const Footer = () => {

    return (

        <footer className="navbar navbar-expand navbar-light">

            <Link className="navbar-brand text-white" to="/">Eso BuildMaker</Link>

            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li>This build was created using ESO Build Maker</li>
                    <li>Discover our API</li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer