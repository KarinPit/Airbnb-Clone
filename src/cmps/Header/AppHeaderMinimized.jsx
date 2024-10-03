import { useEffect, useCallback, useRef } from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from "framer-motion";

import { GeneralNav, UserNav } from './TopNav';
import { FilterStay } from '../Header/FilterStay/FilterStay';
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized";
import { FilterStayMobile } from './FilterStay/FilterStayMobile';
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal';
import { stayService } from '../../services/stay.service';

import airbnbLogo from '../../../public/svg/airbnb-logo.svg';


export function AppHeaderMinimized({ hideFilter, hideUserNav }) {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const isExpandedFilter = useSelector((storeState) => storeState.filterModule.isExpandedFilter);
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter);
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile);
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen);
    const currentWidth = useSelector((storeState) => storeState.appModule.currentWidth);
    const normalBreakpoint = useSelector((storeState) => storeState.appModule.normalBreakpoint);
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled);
    const filterClassName = `filter-search-container ${isOpenFilter ? 'open-filter' : ''} ${isWideScreen ? '' : 'mobile'}`
    const firstRender = useRef(true);

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
            animate: { opacity: 1, y: 0, scale: 1 }
        }
    };

    useEffect(() => {
    }, [isWideScreen, isOpenFilter]);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    const renderNavOptions = useCallback(() => (
        <AnimatePresence>
            {(isOpenFilter && isExpandedFilter) && (
                <motion.div
                    key="nav-options"
                    className="nav-options"
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, y: normalBreakpoint < currentWidth ? -50 : -150, x: normalBreakpoint < currentWidth ? -50 : -200, scale: 0 }}
                    transition={{ duration: 0.25 }}
                    variants={firstRender.current ? {} : animations.navOptions}
                >
                    <GeneralNav />
                </motion.div>
            )}
        </AnimatePresence>
    ), [isOpenFilter, isExpandedFilter]);

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
        <AnimatePresence>
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
        </AnimatePresence>
    ), [isScrolled, filterClassName]);

    const renderMobileFilter = useCallback(() => (
        <AnimatePresence>
            {isOpenFilterMobile && (
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
            )}
        </AnimatePresence>
    ), [isOpenFilterMobile, filterClassName]);

    return (
        <div className="stay-details-header-container">
            <header className={`stay-details-header ${isOpenFilter ? 'expanded-filter' : ''}`}>

                <Link className="logo" to={{
                    pathname: "/",
                    search: `?${createSearchParams({ ...stayService.sanitizeFilterParams(filterBy) })}`
                }}>
                    <img src={airbnbLogo} alt="airbnb logo" />
                    <span className="primary-color">airbnb</span>
                </Link>

                <AnimatePresence>
                    {renderNavOptions()}
                </AnimatePresence>


                {!hideUserNav &&
                    <UserNav />}

                {!hideFilter &&
                    <AnimatePresence>
                        {isOpenFilter
                            ? renderFilter()
                            : renderMinimizedFilter()
                        }
                    </AnimatePresence>
                }

                {renderMobileFilter()}
            </header>
        </div>
    );
}