import { useState } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [navbar, setNavbar] = useState(true)

    const toggleNavbar = () => {
        setNavbar(!navbar)
    }

    return (
        <nav className='navbar' onMouseEnter={toggleNavbar} onMouseLeave={toggleNavbar}>
            <FontAwesomeIcon
                id='nav-icon'
                icon={faBars}
            />
            <ul className='nav-ul' hidden={navbar}>
                <li className='nav-li'>
                    <Link to='/dashboard'>Home</Link>
                </li>
                <li className='nav-li'>
                    <Link to='/my-events'>My Events</Link>
                </li>
                <li className='nav-li'>
                    <Link to='/events/new'>Create Event</Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar