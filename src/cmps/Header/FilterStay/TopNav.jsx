import { GlobeIcon, ListIcon, UserIcon } from '../../SVG/HeaderSvg';


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
    return (
        <>
            <a href="#" className='active'>Stays</a>
            <a href="#">About me</a>
        </>
    )
}
