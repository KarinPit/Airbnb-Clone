import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { LoginSignup } from './LoginSingup'
import { GlobeIcon, ListIcon, UserIcon } from '../SVG/HeaderSvg'
import { useSelector } from 'react-redux'


export function UserNav() {
    const [loggedUser, setLoggedUser] = useState(null);
    const userMenu = useRef(null)
    const userModal = useRef(null)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    useEffect(() => {
        setLoggedUser(sessionStorage.loggedinUser ? JSON.parse(sessionStorage.loggedinUser) : null);
    }, []);


    function onUserMenuClick() {
        setIsUserMenuOpen(prev => !prev)
    }

    function onUserModalClick(event) {
        event.stopPropagation()
    }

    return (
        <div className='user-nav'>
            <Link to="/">Switch to hosting</Link>
            <Link to='/'>
                <GlobeIcon />
            </Link>

            <div className={`user-menu grey-border ${isUserMenuOpen ? '' : ''}`} ref={userMenu} onClick={onUserMenuClick}>
                <div className='menu-icon'>
                    <ListIcon />
                </div>

                <div className='profile-icon'>
                    <UserIcon />
                </div>

                <div className={`user-menu-modal ${isUserMenuOpen ? '' : 'hide'}`}
                    ref={userModal} onClick={onUserModalClick}>
                    <div>
                        <p>Signup</p>
                        <p>Log in</p>
                    </div>

                    <div>
                        <Link to={`/profile/${loggedUser?.id}/buyer`}>See my orders</Link>
                        <Link to={`/profile/${loggedUser?.id}/renter`}>Manage my homes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function GeneralNav() {

    return (
        <>
            <NavLink to="/">Stays</NavLink>

            <NavLink to="/about">About me</NavLink>
        </>
    )
}