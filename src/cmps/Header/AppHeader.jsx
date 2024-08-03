import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { motion, AnimatePresence } from "framer-motion"

import { GeneralNav, UserNav } from './TopNav'
import { FilterStay } from '../Header/FilterStay/FilterStay'
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized"
import { FilterStayMobile } from './FilterStay/FilterStayMobile'
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal'

import airbnbLogo from '../../../public/svg/airbnb-logo.svg'


export default function AppHeader() {
    const isExpandedFilter = useSelector((storeState) => storeState.filterModule.isExpandedFilter)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWide)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const dispatch = useDispatch()

    const filterClassName = isWideScreen ? 'filter-search-container' : 'filter-search-container mobile'

    const renderNavOptions = useCallback(() => (
        <AnimatePresence>
            {(!isScrolled || isExpandedFilter) && <motion.div
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
    ), [isWideScreen, isScrolled])


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
                {isOpenFilter && <FilterStayModal />}
            </div>
        </motion.div>
    ), [filterClassName, isOpenFilter, isWideScreen])


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
            onClick={() => dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: true })}
        >
            <FilterStayMinimized isScrolled={isScrolled} />
        </motion.div>
    ), [filterClassName, isScrolled])


    const renderMobileFilter = useCallback(() => (
        <AnimatePresence>
            {isOpenFilterMobile && (
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
    ), [filterClassName, isOpenFilterMobile])


    return (
        <header className={`header${isScrolled && !isExpandedFilter ? ' scrolled' : ''}`}>

            <Link to="/" className="logo">
                <img src={airbnbLogo} alt="airbnb logo" />
                <span className="primary-color">airbnb</span>
            </Link>

            <AnimatePresence>
                {isScrolled && isWideScreen && !isExpandedFilter ? renderNavOptions() : renderNavOptions()}
            </AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {isScrolled && isWideScreen
                    ? isExpandedFilter
                        ? renderFilter()
                        : renderMinimizedFilter()
                    : renderFilter()}
            </AnimatePresence>

            {renderMobileFilter()}
        </header>
    )
}