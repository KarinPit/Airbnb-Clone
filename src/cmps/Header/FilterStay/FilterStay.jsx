import { useState, useRef, useContext } from 'react'

import { motion } from 'framer-motion'
import FilterContext from '../context/FilterContext'
import { FilterInput } from './FilterInput'
import { WhereModalMobile } from "./WhereModal"
import { CalendarPicker } from "./CalendarPicker"
import { WhoModal } from "./WhoModal"



export function FilterStay() {
    const context = useContext(FilterContext)
    const whereRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const whoRef = useRef(null)
    const [isHovered, setIsHovered] = useState(null)

    function handleClick(element) {
        context.setOpenFilter(element.current.className)
    }


    const isActive = (inputName) => context.openFilter && context.openFilter.includes(inputName)

    return (
        <div className={`filter-search ${context.openFilter ? 'active-filter' : ''}`}>
            <div className="mobile-filter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                    <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                </svg>
                <div>
                    <p>Where to?</p>
                    <p>Anywhere * Anyweek * Add guests</p>
                </div>
            </div>

            <FilterInput
                className="where-input"
                label="Where"
                subLabel="Search destinations"
                refElement={whereRef}
                isActive={isActive('where-input')}
                isHovered={isHovered}
                onClick={() => handleClick(whereRef)}
                onMouseEnter={() => { setIsHovered(whereRef) }}
                onMouseLeave={() => { setIsHovered(null) }}
                hideBorder={isActive('where-input') || isActive('checkin-input')
                    || isHovered && isHovered.current.className.includes('where-input')
                    || isHovered && isHovered.current.className.includes('checkin-input')
                }
                pseudoElements={isActive('checkin-input') ? 'after' : ''}
            />

            <FilterInput
                className="checkin-input"
                label="Check in"
                subLabel="Add dates"
                refElement={checkInRef}
                isActive={isActive('checkin-input')}
                isHovered={isHovered}
                onClick={() => handleClick(checkInRef)}
                onMouseEnter={() => { setIsHovered(checkInRef) }}
                onMouseLeave={() => { setIsHovered(null) }}
                hideBorder={isActive('checkin-input') || isActive('checkout-input')
                    || isHovered && isHovered.current.className.includes('checkin-input')
                    || isHovered && isHovered.current.className.includes('checkout-input')
                }
                pseudoElements={isActive('where-input') ? 'before' : '' || isActive('checkout-input') ? 'after' : ''}
            />

            <FilterInput
                className="checkout-input"
                label="Check out"
                subLabel="Add dates"
                refElement={checkOutRef}
                isActive={isActive('checkout-input')}
                isHovered={isHovered}
                onClick={() => handleClick(checkOutRef)}
                onMouseEnter={() => { setIsHovered(checkOutRef) }}
                onMouseLeave={() => { setIsHovered(null) }}
                hideBorder={isActive('checkout-input') || isActive('who-input')
                    || isHovered && isHovered.current.className.includes('checkout-input')
                    || isHovered && isHovered.current.className.includes('who-input')
                }
                pseudoElements={isActive('checkin-input') ? 'before' : '' || isActive('who-input') ? 'after' : ''} />

            <FilterInput
                className="who-input"
                label="Who"
                subLabel="Add guests"
                refElement={whoRef}
                isActive={isActive('who-input')}
                isHovered={isHovered}
                onClick={() => handleClick(whoRef)}
                onMouseEnter={() => { setIsHovered(whoRef) }}
                onMouseLeave={() => { setIsHovered(null) }}
                hideBorder={false}
                pseudoElements={isActive('checkout-input') ? 'before' : ''}

            />
        </div>
    )
}


export function MinimizedFilter() {
    const context = useContext(FilterContext)

    const isActive = (inputName) => context.openFilter === inputName

    return (
        <div className="minimized-filter">
            <div className="where-input">
                <motion.p
                    key="where-p"
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0.5 }}
                    transition={{ duration: 0.25 }}
                >
                    Anywhere
                </motion.p>
            </div>

            <div className={`border-div ${isActive('where-input') || isActive('checkin-input') ? 'hide-border' : ''}`}></div>

            <div className="checkin-input">
                <motion.p
                    key="checkin-p"
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0.5 }}
                    transition={{ duration: 0.25 }}
                >
                    Any week
                </motion.p>
            </div>

            <div className={`border-div ${isActive('where-input') || isActive('checkin-input') ? 'hide-border' : ''}`}></div>

            <div className="who-input">
                <motion.p
                    key="who-p"
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0.5 }}
                    transition={{ duration: 0.25 }}
                >
                    Add guests
                </motion.p>
            </div>

            <button className="primary-bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                    <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                </svg>
            </button>
        </div>
    )
}

export function MobileFilter() {
    const context = useContext(FilterContext)

    function handleClick() {
        context.setIsOpenMobile(true)
    }

    return (
        <>
            <div className='filter-search mobile' onClick={handleClick}>
                <div className="mobile-filter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                        <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                    </svg>
                    <div>
                        <p>Where to?</p>
                        <p>Anywhere * Anyweek * Add guests</p>
                    </div>
                </div>
            </div>
        </>
    )
}