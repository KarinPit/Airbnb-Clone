import { useState, useEffect, useContext } from 'react';
import { motion, useScroll, AnimatePresence } from "framer-motion"

import { GeneralNav, UserNav } from './TopNav'
import { FilterStay, MinimizedFilter, MobileFilter } from './FilterStay'
import { FilterStayModal } from './FilterStayModal'
import FilterContext from "../context/FilterContext"

import airbnbLogo from '../../public/svg/airbnb-logo.svg'


export default function AppHeader() {
    const screenWIdth = 783
    const [isScrolled, setIsScrolled] = useState(false)
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > screenWIdth)
    const { scrollY } = useScroll()
    const context = useContext(FilterContext)
    const filterClassName = isWideScreen ? 'filter-search-container' : 'filter-search-container mobile';

    function onChangeFilter(value) {
        context.setFilterSize(value)
    }

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth > screenWIdth)
        }

        window.addEventListener('resize', handleResize)
        scrollY.onChange((latest) => {
            setIsScrolled(latest > 0)
            onChangeFilter(false)
        })

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [scrollY])


    return (
        <header className={`header${isScrolled && !context.filterSize ? ' scrolled' : ''}`}>
            <a href="" className="logo">
                <img src={airbnbLogo} alt="airbnc logo" />
                <span className="primary-color">airbnc</span>
            </a>

            <AnimatePresence>
                {/* Check if user has scrolled, the screen is wide, and the filter is not expanded */}
                {isScrolled && isWideScreen && !context.filterSize ? (
                    <motion.div
                        key="nav-options-scrolled"
                        className='nav-options'
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -100, scale: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <GeneralNav />
                    </motion.div>
                ) : (
                    <motion.div
                        key="nav-options-default"
                        className='nav-options'
                        initial={{ y: -50, scale: 0 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 0 }}
                        transition={{
                            duration: 0.2
                        }}
                    >
                        <GeneralNav />
                    </motion.div>
                )}
            </AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {/* Check if user has scrolled and the screen is wide */}
                {isScrolled && isWideScreen ? (
                    context.filterSize ? (
                        <motion.div
                            key="FilterStay"
                            className={filterClassName}
                            initial={{ opacity: 0, y: -50, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.5 }}
                            transition={{
                                opacity: { duration: 0 },
                                scale: { duration: 0.25 },
                                y: { duration: 0.25 }
                            }}
                        >
                            <div className='filter-search-sub-container'>
                                <FilterStay />
                                {/* Check if filter modal is open */}
                                {context.openFilter ? (
                                    <FilterStayModal />
                                ) : null}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="MinimizedFilter"
                            className={filterClassName}
                            initial={{ opacity: 0, y: 50, scaleX: 2 }}
                            animate={{ opacity: 1, y: 0, scaleX: 1 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                opacity: { duration: 0 },
                                y: { duration: 0.25 },
                                scaleX: { duration: 0.25 }
                            }}
                            onClick={() => { onChangeFilter(true) }}
                        >
                            <MinimizedFilter isScrolled={isScrolled} />
                        </motion.div>
                    )
                ) : (
                    <motion.div
                        key="FilterStay"
                        className={filterClassName}
                        initial={{ opacity: 0, y: -50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.5 }}
                        transition={{
                            opacity: { duration: 0 },
                            scale: { duration: 0.25 },
                            y: { duration: 0.25 }
                        }}
                    >

                        
                        <div className='filter-search-sub-container'>
                            {isWideScreen ?
                                <FilterStay /> : <MobileFilter />}
                            {/* Check if filter modal is open */}
                            {context.openFilter ? (
                                <FilterStayModal />
                            ) : null}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}