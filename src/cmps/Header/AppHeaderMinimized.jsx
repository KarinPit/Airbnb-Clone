import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { motion, AnimatePresence } from "framer-motion";

import { GeneralNav, UserNav } from './TopNav';
import { FilterStay } from '../Header/FilterStay/FilterStay';
import { FilterStayMinimized } from "./FilterStay/FilterStayMinimized";
import { FilterStayMobile } from './FilterStay/FilterStayMobile';
import { FilterStayModal } from './FilterStay/Modal/FilterStayModal';

import airbnbLogo from '../../../public/svg/airbnb-logo.svg';


export function AppHeaderMinimized() {
    const isExpandedFilter = useSelector((storeState) => storeState.filterModule.isExpandedFilter);
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter);
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile);
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen);
    const currentWidth = useSelector((storeState) => storeState.appModule.currentWidth);
    const normalBreakpoint = useSelector((storeState) => storeState.appModule.normalBreakpoint);
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled);
    const filterClassName = `filter-search-container ${isOpenFilter ? 'open-filter' : ''} ${isWideScreen ? '' : 'mobile'}`

    useEffect(() => {
    }, [isWideScreen, isOpenFilter]);


    const renderNavOptions = useCallback(() => (
        <AnimatePresence>
            {(isOpenFilter && isExpandedFilter) && (
                <motion.div
                    key="nav-options"
                    className="nav-options"
                    initial={{ opacity: 0, y: -50, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: normalBreakpoint < currentWidth ? -50 : -150, x: normalBreakpoint < currentWidth ? -50 : -200, scale: 0 }}
                    transition={{ duration: 0.25 }}
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
            initial={{ opacity: 0, y: -100, scaleX: 0.5 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            exit={{ opacity: 0, y: -50, scaleX: 0.5 }}
            transition={{
                opacity: { duration: 0 },
                y: { duration: 0.25 },
                scaleX: { duration: 0.25 }
            }}
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
                initial={{ opacity: 0, y: 30, scaleX: 2 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                exit={{ opacity: 0, y: 30, scaleX: 2 }}
                transition={{
                    opacity: { duration: 0 },
                    y: { duration: 0.25 },
                    scaleX: { duration: 0.25 }
                }}
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
                    initial={{ opacity: 0, y: -50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                >
                    <FilterStayMobile />
                </motion.div>
            )}
        </AnimatePresence>
    ), [isOpenFilterMobile, filterClassName]);

    return (
        <>
        <header className={`stay-details-header ${isOpenFilter ? 'expanded-filter' : ''}`}>
            <a href="/" className="logo">
                <img src={airbnbLogo} alt="airbnb logo" />
                <span className="primary-color">airbnb</span>
            </a>

            <AnimatePresence>
                {renderNavOptions()}
            </AnimatePresence>

            <UserNav />

            <AnimatePresence>
                {isOpenFilter
                    ? renderFilter()
                    : renderMinimizedFilter()
                }
            </AnimatePresence>

            {renderMobileFilter()}
        </header>
        
        <hr></hr>
        </>
    );
}