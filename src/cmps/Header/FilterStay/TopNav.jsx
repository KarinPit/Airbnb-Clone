import { useState } from 'react'

import { GlobeIcon, ListIcon, UserIcon } from '../../SVG/HeaderSvg'


export function UserNav() {
    return (
        <div className='user-nav'>
            <a href="#">Switch to hosting</a>
            <a href='#'>
                <GlobeIcon />
            </a>

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
    const [clickedOption, setClickedOption] = useState('stays')

    function handleClick(option) {
        setClickedOption(option)
    }

    return (
        <>
            <a
                href="#"
                className={`stays ${clickedOption === 'stays' ? 'active' : ''}`}
                onClick={() => handleClick('stays')}
            >
                Stays
            </a>
            <a
                href="#"
                className={`about ${clickedOption === 'about' ? 'active' : ''}`}
                onClick={() => handleClick('about')}
            >
                About me
            </a>
        </>
    )
}