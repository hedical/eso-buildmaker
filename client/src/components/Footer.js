import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import AuthOptions from './auth/AuthOptions'
import Button from '@material-ui/core/Button';





const Footer = () => {

    return (

        <footer className="navbar navbar-expand navbar-light">
            <Button className="navbar-brand text-white" href="https://eso-buildmaker.herokuapp.com/">This build was created using ESO Build Maker</Button>


            <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li><Button className="navbar-brand text-white" target="_blank" href="https://lxn.gitbook.io/eso-buildmaker/general-information/get-started">Discover our API</Button></li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer