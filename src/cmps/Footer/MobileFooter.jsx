import { useState } from 'react'

import { SearchIcon, UserIcon } from '../SVG/HeaderSvg'


export function MobileFooter() {
    const [isSelected, setIsSelected] = useState(null)

    function handleClick(el) {
        setIsSelected(el)
    }

    return (
        <footer className='mobile-footer'>
            <div className={`explore ${isSelected === "explore" ? 'selected' : ''}`} onClick={() => handleClick("explore")}>
                <SearchIcon />
                <p>Explore</p>
            </div>

            <div className={`whishlist ${isSelected === "whishlist" ? 'selected' : ''}`} onClick={() => handleClick("whishlist")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" id="heart"><path d="M7.54118788,3.94746435 C6.26949528,2.67577175 4.21213798,2.66959186 2.94594467,3.93578517 C1.67975136,5.20197847 1.68593125,7.25933578 2.95762385,8.53102838 L7.66511771,13.2385222 C7.86037986,13.4337844 8.17696235,13.4337844 8.3722245,13.2385222 L13.0552592,8.55824992 C14.3185076,7.28794108 14.3145137,5.23634816 13.0425975,3.9644319 C11.7686258,2.69046028 9.71030505,2.68427942 8.44184829,3.95273618 L7.99458434,4.40086081 L7.54118788,3.94746435 Z M12.3461846,7.85311643 L8.01867111,12.1778621 L3.66473063,7.8239216 C2.78261454,6.94180551 2.77833654,5.51760686 3.65305145,4.64289195 C4.52776637,3.76817703 5.95196501,3.77245504 6.8340811,4.65457113 L7.64343658,5.46392661 C7.84203355,5.66252358 8.16520275,5.65863044 8.35895787,5.4553069 L9.14895507,4.65984296 C10.0259337,3.7828643 11.4510959,3.78714387 12.3354907,4.67153868 C13.2178269,5.55387487 13.2205911,6.97382279 12.3461846,7.85311643 Z"></path></svg>
                <p>Wishlists</p>
            </div>

            <div className={`login ${isSelected === "login" ? 'selected' : ''}`} onClick={() => handleClick("login")}>
                <UserIcon />
                <p>Log in</p>
            </div>
        </footer>
    )
}