import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { AppHeaderMinimized } from '../../cmps/Header/AppHeaderMinimized';
import { Footer } from '../../cmps/Footer/Footer'
import { MobileFooter } from '../../cmps/Footer/MobileFooter';
import { FilterMobileFooter } from '../../cmps/Footer/FilterMobileFooter';
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MinimizedFilterLayout() {
    const { isOpenFilter } = useSelector((storeState) => storeState.filterModule)
    const { isOpenFilterMobile } = useSelector((storeState) => storeState.filterModule)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const dispatch = useDispatch()


    useEffect(() => {
    }, [])

    return (
        <>
            <AppHeaderMinimized />
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
                    <Footer /> : <MobileFooter />
                : <AnimatePresence>
                    <FilterMobileFooter />
                </AnimatePresence>}

        </>
    )
}