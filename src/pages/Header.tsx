import React from 'react'

import { Link } from 'react-router-dom'

const Header = (): JSX.Element => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/Whisper" className="navbar-brand">
                Mojiokose
            </Link>
        </nav>
    )
}

export default Header
