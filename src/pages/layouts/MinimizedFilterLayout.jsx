import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import AppHeader from "../../cmps/Header/AppHeader"
import { Footer } from '../../cmps/Footer/Footer'
import { MobileFooter } from '../../cmps/Footer/MobileFooter';
import { FilterMobileFooter } from '../../cmps/Footer/FilterMobileFooter';
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MinimizedFilterLayout() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const { isOpenFilterMobile } = useSelector((storeState) => storeState.filterModule)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)


    useEffect(() => {
    }, [])

    return (
        <>
            <AppHeader />
            <FilterStayMobile />

            <main>
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