import React, { useRef, useContext, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterContext from '../../../context/FilterContext';
import { GeneralNav } from './TopNav';
import { WhereModalMobile } from '../FilterStay/Modal/WhereModal';
import CalendarPickerMobile from './Modal/CalendarPicker/CalendarPickerMobile';
import { WhoModal } from '../FilterStay/Modal/WhoModal';


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
));

export function FilterStayMobile() {
    const { isOpenMobile, setOpenFilterMobile, openFilterMobile, setIsOpenMobile } = useContext(FilterContext);
    const whereMobileRef = useRef(null);
    const checkInMobileRef = useRef(null);
    const whoMobileRef = useRef(null);

    const handleFilterClick = (element) => setOpenFilterMobile(element.current.className);

    const handleButtonClick = () => {
        setOpenFilterMobile('where-input-mobile');
        setIsOpenMobile(false);
    };

    return (
        <div className={`mobile-filters-container ${isOpenMobile ? 'show' : ''}`}>
            <AnimatePresence>
                {isOpenMobile && (
                    <motion.div
                        className='top-nav'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        exit={{ y: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                    >
                        <button onClick={handleButtonClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="x">
                                <rect width="256" height="256" fill="none"></rect>
                                <line x1="200" x2="56" y1="56" y2="200" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="200" x2="56" y1="200" y2="56" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                            </svg>
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
                subLabel="I'm flexible"
                isActive={isOpenMobile}
                onClick={() => handleFilterClick(whereMobileRef)}
                ref={whereMobileRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
                {openFilterMobile && openFilterMobile.includes('where-input-mobile') && (
                    <div className='mobile-container'>
                        <WhereModalMobile />
                    </div>
                )}
            </MobileFilterSection>

            <MobileFilterSection
                className='checkin-input-mobile'
                label='When'
                subLabel='Add dates'
                isActive={isOpenMobile}
                onClick={() => handleFilterClick(checkInMobileRef)}
                ref={checkInMobileRef}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.4 }}
            >
                {openFilterMobile && openFilterMobile.includes('checkin-input-mobile') && (
                    <div className='mobile-container'>
                        <CalendarPickerMobile />
                    </div>
                )}
            </MobileFilterSection>

            <MobileFilterSection
                className='who-input-mobile'
                label='Who'
                subLabel='Add guests'
                isActive={isOpenMobile}
                onClick={() => handleFilterClick(whoMobileRef)}
                ref={whoMobileRef}
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
            >
                {openFilterMobile && openFilterMobile.includes('who-input-mobile') && (
                    <div className='mobile-container'>
                        <h2>Who's coming?</h2>
                        <WhoModal />
                    </div>
                )}
            </MobileFilterSection>
        </div>
    );
}