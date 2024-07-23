import { useState, useEffect, useRef, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import FilterContext from '../context/FilterContext'
import { GeneralNav } from './TopNav'
import { WhereModalMobile } from './WhereModal'
import { CalendarPickerMobile } from './CalendarPicker'
import { WhoModal } from './WhoModal'


export function FilterStayMobile() {
    const context = useContext(FilterContext)
    const whereMobileRef = useRef(null)
    const checkInMobileRef = useRef(null)
    const whoMobileRef = useRef(null)

    function handleFilterClick(element) {
        context.setOpenFilterMobile(element.current.className)
    }

    function handleButtonClick() {
        context.setOpenFilterMobile('where-input-mobile')
        context.setIsOpenMobile(false)
    }


    return (
        <div className={`mobile-filters-container ${context.isOpenMobile ? 'show' : ''}`}>
            <AnimatePresence>
                {context.isOpenMobile &&
                    <motion.div className='top-nav'
                        key={'top-nav'}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.3
                        }}>
                        <button onClick={handleButtonClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="x"><rect width="256" height="256" fill="none"></rect><line x1="200" x2="56" y1="56" y2="200" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line><line x1="200" x2="56" y1="200" y2="56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line></svg>
                        </button>

                        <div className='nav'>
                            <GeneralNav />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

            <AnimatePresence>
                {context.isOpenMobile &&
                    <motion.div className='where-input-mobile'
                        key={'where-input-mobile'}
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.3
                        }}
                        ref={whereMobileRef}
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
                    </motion.div>
                }
            </AnimatePresence>


            <AnimatePresence>
                {context.isOpenMobile &&
                    <motion.div className='checkin-input-mobile'
                        key={'checkin-input-mobile'}
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.3
                        }}
                        ref={checkInMobileRef}
                        onClick={() => handleFilterClick(checkInMobileRef)}>
                        {context.openFilterMobile && context.openFilterMobile.includes('checkin-input-mobile') ?
                            <div className='mobile-container'>
                                <CalendarPickerMobile />
                            </div>
                            :
                            <>
                                <p>When</p>
                                <p><span>Add dates</span></p>
                            </>}
                    </motion.div>
                }
            </AnimatePresence>

            <AnimatePresence>
                {context.isOpenMobile &&
                    <motion.div className='who-input-mobile'
                        key={'who-input-mobile'}
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -50 }}
                        transition={{
                            ease: 'easeInOut',
                            duration: 0.3
                        }}
                        ref={whoMobileRef}
                        onClick={() => handleFilterClick(whoMobileRef)}>
                        {context.openFilterMobile && context.openFilterMobile.includes('who-input-mobile') ?
                            <div className='mobile-container'>
                                <h2>Who's coming?</h2>
                                <WhoModal />
                            </div>
                            : <>
                                <p>Who</p>
                                <p><span>Add guests</span></p>
                            </>}
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}