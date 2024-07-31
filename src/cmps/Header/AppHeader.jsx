import { useState, useEffect, useContext, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, useScroll, AnimatePresence } from "framer-motion"

import { GeneralNav, UserNav } from './TopNav'
import { FilterStay } from '../Header/FilterStay/FilterStay'
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized"
import { FilterStayMobile } from './FilterStay/FilterStayMobile'
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal'
import FilterContext from "../../context/FilterContext"
import airbnbLogo from '../../../public/svg/airbnb-logo.svg'


export default function AppHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const {
        isWideScreen,
        screenWidth,
        filterSize,
        openFilter,
        isOpenMobile,
        setIsWideScreen,
        setOpenFilterMobile,
        setIsOpenMobile,
        setFilterSize,
        setOpenFilter
    } = useContext(FilterContext)

    const filterClassName = isWideScreen ? 'filter-search-container' : 'filter-search-container mobile'

    useEffect(() => {

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isWideScreen, screenWidth])


    const renderNavOptions = useCallback(() => (
        <AnimatePresence>
            {(!isScrolled || filterSize) && <motion.div
                key="nav-options"
                className="nav-options"
                initial={{ opacity: 0, y: -50, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0 }}
                transition={{ duration: 0.25 }}
            >
                <GeneralNav />
            </motion.div>}

        </AnimatePresence>
    ), [isScrolled, filterSize])

    const renderFilter = useCallback(() => (
        <motion.div
            key="FilterStay"
            className={filterClassName}
            initial={{ opacity: 0, y: -100, scaleX: 0.5 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            exit={{ opacity: 0, y: -50, scaleX: 0.5 }}
            transition={{
                opacity: { duration: 0 },
                y: { duration: 0.25 },
                scaleX: { duration: 0.25 }
            }}        >
            <div className="filter-search-sub-container">
                <FilterStay isWideScreen={isWideScreen} />
                {openFilter && <FilterStayModal />}
            </div>
        </motion.div>
    ), [filterClassName, openFilter, isWideScreen])

    const renderMinimizedFilter = useCallback(() => (
        <motion.div
            key="MinimizedFilter"
            className={filterClassName}
            initial={{ opacity: 0, y: 50, scaleX: 2 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            exit={{ opacity: 0, y: 50, scaleX: 2 }}
            transition={{
                opacity: { duration: 0 },
                y: { duration: 0.25 },
                scaleX: { duration: 0.25 }
            }}
            onClick={() => setFilterSize(true)}
        >
            {console.log('rendered minimized filter')}
            <FilterStayMinimized isScrolled={isScrolled} />
        </motion.div>
    ), [filterClassName, isScrolled, setFilterSize])

    const renderMobileFilter = useCallback(() => (
        <AnimatePresence>
            {isOpenMobile && (
                <motion.div
                    key="FilterStayMobile"
                    className={filterClassName}
                    initial={{ opacity: 0, y: -50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                >
                    <FilterStayMobile />
                </motion.div>
            )}
        </AnimatePresence>
    ), [filterClassName, isOpenMobile])

    function handleResize() {
        const newIsWideScreen = window.innerWidth > screenWidth
        setIsWideScreen(newIsWideScreen)
        if (newIsWideScreen) {
            setIsOpenMobile(false)
        } else {
            setOpenFilter(false)
        }
    }

    function handleScroll() {
        console.log(window.scrollY);
        setIsScrolled(window.scrollY > 0)
        setFilterSize(false)
    }

    return (
        <header className={`header${isScrolled && !filterSize ? ' scrolled' : ''}`}>

            <Link to="/" className="logo">
                <img src={airbnbLogo} alt="airbnb logo" />
                <span className="primary-color">airbnb</span>
            </Link>

            <AnimatePresence>
                {isScrolled && isWideScreen && !filterSize ? renderNavOptions() : renderNavOptions()}
            </AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {isScrolled && isWideScreen
                    ? filterSize
                        ? renderFilter()
                        : renderMinimizedFilter()
                    : renderFilter()}
            </AnimatePresence>

            {renderMobileFilter()}
        </header>
    )
}