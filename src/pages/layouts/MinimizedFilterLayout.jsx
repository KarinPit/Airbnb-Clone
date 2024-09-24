import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLocation } from "react-router";

import { AnimatePresence } from 'framer-motion';

import { AppHeaderMinimized } from '../../cmps/Header/AppHeaderMinimized';
import { Footer } from '../../cmps/Footer/Footer'
import { MobileFooter } from '../../cmps/Footer/MobileFooter';
import { FilterMobileFooter } from '../../cmps/Footer/FilterMobileFooter';
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MinimizedFilterLayout() {
    const { isOpenFilter } = useSelector((storeState) => storeState.filterModule)
    const { isOpenFilterMobile } = useSelector((storeState) => storeState.filterModule)
    const isMobile = useSelector((storeState) => storeState.appModule.isMobile)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const dispatch = useDispatch()
    const location = useLocation()
    const isConfirmOrderPage = location.pathname.includes('confirm-order')

    return (
        <>
            <AppHeaderMinimized hideFilter={isConfirmOrderPage} hideUserNav={isConfirmOrderPage}/>
            <FilterStayMobile />

            <div className={`${isOpenFilter ? 'overlay' : ''}`}
                onClick={(ev) => {
                    dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: false })
                    dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: false })
                }}>
            </div>

            <main className='stay-details'>
                <Outlet />
            </main>

            {!isOpenFilterMobile ?
                isWideScreen ?
                    <Footer /> : !isConfirmOrderPage ? <MobileFooter /> : <Footer isSticky={!isConfirmOrderPage} />
                : <AnimatePresence>
                    <FilterMobileFooter />
                </AnimatePresence>}

        </>
    )
}