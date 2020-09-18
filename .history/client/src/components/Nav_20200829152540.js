import React from 'react'
import { Link } from 'react-router-dom'

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

                    <li className="nav-item active">
                        <Link to="/signup" className="nav-link active">
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/register" className="nav-link active">
                            Register
                        </Link>
                    </li>

                    <li className="nav-item active">
                        <Link to="/login" className="nav-link active">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>

        </nav>
    )
}

export default Nav
