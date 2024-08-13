import React, { useState, useRef, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { getMonthName } from '../../../utils/CalendarUtils'

import { GeneralNav } from '../TopNav'
import { WhereModalMobile } from '../FilterStay/Modal/WhereModal'
import CalendarPickerMobile from './Modal/CalendarPicker/CalendarPickerMobile'
import { WhoModal } from '../FilterStay/Modal/WhoModal'

import { XButton } from '../../SVG/HeaderSvg'


const MobileFilterSection = forwardRef(({ className, label, subLabel, isActive, onClick, children, initial, animate, exit, transition }, ref) => (
    <AnimatePresence>
        {isActive && (
            <motion.div
                className={className}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                onClick={onClick}
                ref={ref}
            >
                {children || (
                    <>
                        <p>{label}</p>
                        <p><span>{subLabel}</span></p>
                    </>
                )}
            </motion.div>
        )}
    </AnimatePresence>
))

export function FilterStayMobile() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile)
    const defaultFilter = useSelector((storeState) => storeState.filterModule.defaultFilter)
    const dispatch = useDispatch()

    const [currentOpenedFilter, setCurrentOpenedFilter] = useState(defaultFilter)

    const whereMobileRef = useRef(null)
    const checkInMobileRef = useRef(null)
    const whoMobileRef = useRef(null)

    const handleFilterClick = (element) => setCurrentOpenedFilter(element.current.className)

    const handleButtonClick = () => {
        setCurrentOpenedFilter('where-input-mobile')
        dispatch({ type: 'SET_OPEN_FILTER_MOBILE', isOpenFilterMobile: false })
    }

    return (
        <div className={`mobile-filters-container ${isOpenFilterMobile ? 'show' : ''}`}>
            <AnimatePresence>
                {isOpenFilterMobile && (
                    <motion.div
                        className='top-nav'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                    >
                        <button onClick={handleButtonClick}>
                            <XButton />
                        </button>
                        <div className='nav'>
                            <GeneralNav />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <MobileFilterSection
                className='where-input-mobile'
                label='Where'
                subLabel={filterBy.loc}
                isActive={isOpenFilterMobile}
                onClick={() => handleFilterClick(whereMobileRef)}
                ref={whereMobileRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
                {currentOpenedFilter && currentOpenedFilter.includes('where-input-mobile') && (
                    <div className='mobile-container'>
                        <WhereModalMobile />
                    </div>
                )}
            </MobileFilterSection>

            <MobileFilterSection
                className='checkin-input-mobile'
                label='When'
                subLabel={filterBy.checkIn && !filterBy.checkOut ? `${getMonthName(new Date(filterBy.checkIn).getMonth())} ${format(filterBy.checkIn, 'd')}` : filterBy.checkIn && filterBy.checkOut ? `${getMonthName(new Date(filterBy.checkIn).getMonth())} ${format(filterBy.checkIn, 'd')} -${getMonthName(new Date(filterBy.checkOut).getMonth())} ${format(filterBy.checkOut, 'd')}` : 'Add dates'}
                isActive={isOpenFilterMobile}
                onClick={() => handleFilterClick(checkInMobileRef)}
                ref={checkInMobileRef}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.4 }}
            >
                {currentOpenedFilter && currentOpenedFilter.includes('checkin-input-mobile') && (
                    <div className='mobile-container'>
                        <CalendarPickerMobile />
                    </div>
                )}
            </MobileFilterSection>

            <MobileFilterSection
                className='who-input-mobile'
                label='Who'
                subLabel={+filterBy.who.totalCount > 0 ? `${filterBy.who.totalCount} guests` : 'Add guests'}
                isActive={isOpenFilterMobile}
                onClick={() => handleFilterClick(whoMobileRef)}
                ref={whoMobileRef}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
            >
                {currentOpenedFilter && currentOpenedFilter.includes('who-input-mobile') && (
                    <div className='mobile-container'>
                        <h2>Who's coming?</h2>
                        <WhoModal />
                    </div>
                )}
            </MobileFilterSection>
        </div>
    )
}