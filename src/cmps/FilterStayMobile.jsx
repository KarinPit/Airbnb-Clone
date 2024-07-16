import { useState, useEffect, useRef, useContext } from 'react'

import FilterContext from '../context/FilterContext'
import { GeneralNav } from './TopNav'
import { WhereModalMobile } from './WhereModal'


export function FilterStayMobile() {
    const context = useContext(FilterContext)
    const whereMobileRef = useRef(null)
    const checkInRef = useRef(null)
    const whoRef = useRef(null)

    function handleFilterClick(element) {
        context.setOpenFilterMobile(element.current.className)
    }

    function handleButtonClick() {
        context.setOpenFilterMobile(false)
        context.setIsOpenMobile(false)
    }


    return (
        <div className={`mobile-filters-container ${context.isOpenMobile ? 'show' : ''}`}>
            <div className='top-nav'>
                <button onClick={handleButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="x"><rect width="256" height="256" fill="none"></rect><line x1="200" x2="56" y1="56" y2="200" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="200" x2="56" y1="200" y2="56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                </button>

                <div className='nav'>
                    <GeneralNav />
                </div>
            </div>

            <div className='where-input-mobile' ref={whereMobileRef}
                onClick={() => handleFilterClick(whereMobileRef)}>

                {context.openFilterMobile && context.openFilterMobile.includes('where-input-mobile') ?
                    <div className='mobile-container'>
                        <WhereModalMobile />
                    </div>
                    :
                    <>
                        <p>Where</p>
                        <p><span>I'm flexible</span></p>
                    </>}
            </div>

            <div className='checkin-input-mobile' ref={checkInRef}>
                <p>When</p>
                <p><span>Add dates</span></p>
            </div>

            <div className='who-input-mobile' ref={whoRef}>
                <p>Who</p>
                <p><span>Add guests</span></p>
            </div>
        </div>
    )
}