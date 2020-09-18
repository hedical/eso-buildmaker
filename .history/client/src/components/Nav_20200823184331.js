import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <Link className="navbar-brand text-white" to="/">Eso BuildMaker</Link>
        </nav>
    )
}

export default Nav
