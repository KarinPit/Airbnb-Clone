import { useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from "framer-motion";

import { GeneralNav, UserNav } from './TopNav';
import { FilterStay } from '../Header/FilterStay/FilterStay';
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized";
import { FilterStayMobile } from './FilterStay/FilterStayMobile';
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal';

import airbnbLogo from '../../../public/svg/airbnb-logo.svg';

export function AppHeader() {
    const isExpandedFilter = useSelector((state) => state.filterModule.isExpandedFilter);
    const isOpenFilter = useSelector((state) => state.filterModule.isOpenFilter);
    const isOpenFilterMobile = useSelector((state) => state.filterModule.isOpenFilterMobile);
    const isWideScreen = useSelector((state) => state.appModule.isWideScreen);
    const isScrolled = useSelector((state) => state.appModule.isScrolled);
    const currentWidth = useSelector((state) => state.appModule.currentWidth);
    const normalBreakpoint = useSelector((state) => state.appModule.normalBreakpoint);
    const firstRender = useRef(true);

    const filterClassName = `filter-search-container ${isWideScreen ? '' : 'mobile'}`;

    // Animation Variants
    const animations = {
        filterStay: {
            initial: { opacity: 0, y: -100, scaleX: 0.5 },
            animate: { opacity: 1, y: 0, scaleX: 1 },
            exit: { opacity: 0, y: -50, scaleX: 0.5 },
        },
        minimizedFilterStay: {
            initial: { opacity: 0, y: 30, scaleX: 2 },
            animate: { opacity: 1, y: 0, scaleX: 1 },
            exit: { opacity: 0, y: 30, scaleX: 2 }
        },
        mobileFilterStay: {
            initial: { opacity: 0, y: -50, scale: 0.5 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -50, scale: 0.5 }
        },
        navOptions: {
            initial: { opacity: 0, y: -50, scale: 0 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: normalBreakpoint < currentWidth ? -50 : -150, x: normalBreakpoint < currentWidth ? -50 : -200, scale: 0 }
        }
    };

    // Transition Utility
    const createTransition = (duration = 0.25) => ({
        opacity: { duration: 0 },
        y: { duration },
        scaleX: { duration }
    });

    useEffect(() => {
        firstRender.current = false;
    }, []);

    const renderNavigation = useCallback(() => (
        (!isScrolled || isExpandedFilter) && (
            <motion.div
                key="nav-options"
                className="nav-options"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                variants={firstRender.current ? {} : animations.navOptions}
            >
                <GeneralNav />
            </motion.div>
        )
    ), [isScrolled, isExpandedFilter]);

    const renderExpandedFilter = useCallback(() => (
        <motion.div
            key="FilterStay"
            className={filterClassName}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={createTransition()}
            variants={firstRender.current ? {} : animations.filterStay}
        >
            <div className="filter-search-sub-container">
                <FilterStay />
                {isOpenFilter && <FilterStayModal />}
            </div>
        </motion.div>
    ), [isOpenFilter, filterClassName]);

    const renderMinimizedFilter = useCallback(() => (
        isScrolled && (
            <motion.div
                key="MinimizedFilter"
                className={filterClassName}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={createTransition()}
                variants={firstRender.current ? {} : animations.minimizedFilterStay}
            >
                <FilterStayMinimized />
            </motion.div>
        )
    ), [isScrolled, filterClassName]);

    const renderMobileFilter = useCallback(() => (
        isOpenFilterMobile && (
            <motion.div
                key="FilterStayMobile"
                className={filterClassName}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                variants={firstRender.current ? {} : animations.mobileFilterStay}
            >
                <FilterStayMobile />
            </motion.div>
        )
    ), [isOpenFilterMobile, filterClassName]);

    return (
        <header className={`header ${isScrolled && !isExpandedFilter ? 'scrolled' : ''}`}>
            <a href="/" className="logo">
                <img src={airbnbLogo} alt="airbnb logo" />
                <span className="primary-color">airbnb</span>
            </a>

            <AnimatePresence>{renderNavigation()}</AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {isScrolled && isWideScreen
                    ? isExpandedFilter
                        ? renderExpandedFilter()
                        : renderMinimizedFilter()
                    : renderExpandedFilter()}
            </AnimatePresence>

            <AnimatePresence>{renderMobileFilter()}</AnimatePresence>
        </header>
    );
}