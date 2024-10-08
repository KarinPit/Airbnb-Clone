import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { logout } from '../../store/actions/user.actions';
import { GlobeIcon, ListIcon, UserIcon } from '../SVG/HeaderSvg'
import { useDispatch, useSelector } from 'react-redux'


export function UserNav() {
    const isUserMenuOpen = useSelector((storeState) => storeState.appModule.isUserMenuOpen)
    const loggedUser = useSelector((storeState) => storeState.userModule.user)
    const dispatch = useDispatch()
    const userMenu = useRef(null)
    const userModal = useRef(null)


    async function onLogout() {
        try {
            await logout();
            showSuccessMsg(`Bye now`);
        } catch (err) {
            showErrorMsg('Cannot logout');
        }
    }

    function onUserMenuClick() {
        dispatch({ type: 'SET_IS_OPEN_USER_MENU', isUserMenuOpen: !isUserMenuOpen })
    }

    // function onUserModalClick(event) {
    //     event.stopPropagation()
    // }

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
                    ref={userModal}>

                    {loggedUser ?
                        <div>
                            <p onClick={onLogout}>Sign out</p>
                        </div>
                        :
                        <div>
                            <p onClick={() => dispatch({ type: 'SET_IS_OPEN_AUTH_MODAL', isOpenAuthModal: true })}>Log in</p>
                            <p onClick={() => dispatch({ type: 'SET_IS_OPEN_AUTH_MODAL', isOpenAuthModal: true })}>Signup</p>
                        </div>
                    }

                    {loggedUser ? <div>
                        <Link to={`/profile/${loggedUser?.id}/buyer`}>See my orders</Link>
                        <Link to={`/profile/${loggedUser?.id}/renter`}>Manage my homes</Link>
                    </div>
                        :
                        <div>
                            <p>Airbnb your home</p>
                        </div>
                    }
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