import { FilterStay } from '../Header/FilterStay/FilterStay';
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized";
import { FilterStayMobile } from './FilterStay/FilterStayMobile';
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal';
import { useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneralNav, UserNav } from './TopNav';
import { FilterCategories } from '../Stay/CategoryFilter/FilterCategories';
import { setFilterBy } from '../../store/actions/filter.actions';

import airbnbLogo from '../../../public/svg/airbnb-logo.svg';

export function AppHeader() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
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
            exit: { opacity: 0, y: -50, scaleX: 0.5 }
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
        }
    };

    useEffect(() => {
        firstRender.current = false;
    }, []);

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate);
    }

    const renderNavigation = useCallback(() => (
        <motion.div
            key="nav-options"
            className="nav-options"
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: normalBreakpoint < currentWidth ? -50 : -150, x: normalBreakpoint < currentWidth ? 0
                 : -200, scale: 0 }}
            transition={{ duration: 0.25 }}
            variants={firstRender.current ? {} : animations.navOptions}
        >
            <GeneralNav />
        </motion.div >

    ), [isScrolled, isExpandedFilter]);

    const renderFilter = useCallback(() => (
        <motion.div
            key="FilterStay"
            className={filterClassName}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                opacity: { duration: 0 },
                y: { duration: 0.25 },
                scaleX: { duration: 0.25 }
            }}
            variants={firstRender.current ? {} : animations.filterStay}
        >
            <div className="filter-search-sub-container">
                <FilterStay />
                {isOpenFilter && <FilterStayModal />}
            </div>
        </motion.div>
    ), [isOpenFilter, filterClassName]);

    const renderMinimizedFilter = useCallback(() => (
        <motion.div
            key="MinimizedFilter"
            className={filterClassName}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                opacity: { duration: 0 },
                y: { duration: 0.25 },
                scaleX: { duration: 0.25 }
            }}
            variants={firstRender.current ? {} : animations.minimizedFilterStay}
        >
            <FilterStayMinimized />
        </motion.div>

    ), [isScrolled, filterClassName]);

    const renderMobileFilter = useCallback(() => (
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

    ), [isOpenFilterMobile, filterClassName]);

    return (
        <header className={`header ${isScrolled && !isExpandedFilter ? 'scrolled' : ''}  ${isOpenFilter ? 'expanded' : ''}`}>
            <a href="/" className="logo">
                <img src={airbnbLogo} alt="airbnb logo" />
                <span className="primary-color">airbnb</span>
            </a>

            <AnimatePresence>{(!isScrolled || isExpandedFilter) && renderNavigation()}</AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {isScrolled && isWideScreen
                    ? isExpandedFilter
                        ? renderFilter()
                        : renderMinimizedFilter()
                    : renderFilter()}
            </AnimatePresence>

            <AnimatePresence>{isOpenFilterMobile && renderMobileFilter()}</AnimatePresence>
            
        </header>
    );
}