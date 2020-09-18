import React from 'react'
import { Link } from 'react-router-dom'
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
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <Link to="/" className="nav-link active">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
            <AuthOptions />
        </nav>
    )
}

export default Nav
