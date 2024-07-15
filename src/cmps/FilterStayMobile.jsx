import { useState, useRef, useContext } from 'react'

import FilterContext from '../context/FilterContext'
import { GeneralNav } from './TopNav'

export function FilterStayMobile() {
    const context = useContext(FilterContext)
    return (
        <div className={`mobile-filters-container ${context.isOpenMobile ? 'show' : ''}`}>
            <div className='top-nav'>
                <button onClick={() => { context.setIsOpenMobile(false) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="x"><rect width="256" height="256" fill="none"></rect><line x1="200" x2="56" y1="56" y2="200" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="200" x2="56" y1="200" y2="56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                </button>

                <div className='nav'>
                    <GeneralNav />
                </div>
            </div>

            <div>
                <p>Where</p>
                <p><span>I'm flexible</span></p>
            </div>

            <div>
                <p>When</p>
                <p><span>Add dates</span></p>
            </div>

            <div>
                <p>Who</p>
                <p><span>Add guests</span></p>
            </div>
        </div>
    )
}