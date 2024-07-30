import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

import { GlobeIcon, ListIcon, UserIcon } from '../SVG/HeaderSvg'


export function UserNav() {
    return (
        <div className='user-nav'>
            <Link to="/">Switch to hosting</Link>
            <Link to='/'>
                <GlobeIcon />
            </Link>

            <div className="user-menu grey-border">
                <div className='menu-icon'>
                    <ListIcon />
                </div>
                <div className='profile-icon'>
                    <UserIcon />
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