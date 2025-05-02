import React from 'react'

import { Link } from 'react-router-dom'

const Header = (): React.JSX.Element => {
    return (
        <nav className="flex items-center px-4 py-3 bg-gray-900 text-white">
            <Link to="/Whisper" className="text-xl font-semibold no-underline text-white">
                Mojiokose
            </Link>
        </nav>
    )
}

export default Header
