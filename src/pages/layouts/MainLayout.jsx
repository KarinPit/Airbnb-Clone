import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { stayService } from '../../services/stay.service';

import { AppHeader } from "../../cmps/Header/AppHeader"
import { Footer } from '../../cmps/Footer/Footer'
import { MobileFooter } from '../../cmps/Footer/MobileFooter';
import { FilterMobileFooter } from '../../cmps/Footer/FilterMobileFooter';
import { FilterCategories } from '../../cmps/Stay/CategoryFilter/FilterCategories';
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"
import { FilterStayModal } from '../../cmps/Header/FilterStay/Modal/FilterStayModal';
import { AuthModal } from '../../cmps/Header/AuthModal';
import { setFilterBy } from '../../store/actions/filter.actions';


export function MainLayout() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const { isOpenFilter } = useSelector((storeState) => storeState.filterModule)
    const { isOpenFilterMobile } = useSelector((storeState) => storeState.filterModule)
    const isOpenAuthModal = useSelector((storeState) => storeState.appModule.isOpenAuthModal)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const loggedUser = useSelector((storeState) => storeState.userModule.user)
    const dispatch = useDispatch()

    useEffect(() => {
        stayService.fetchImages()
            .then((imgs) => {
                const mappedOptions = imgs.map((image) => ({
                    title: image.title,
                    value: image.value,
                    icon: `${image.src}`,
                }));
                // setOptions(mappedOptions);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch images:", error);
                // setLoading(false);
            });
    }, [])

    useEffect(() => {
    }, [loggedUser])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate);
    }

    return (
        <>
            <div className='grouped-header-comps'>
                <AppHeader />
                <FilterStayMobile />
                <FilterCategories onSetFilter={onSetFilter} filterBy={filterBy.category_tag} />
            </div>

            <div className={`${isOpenFilter || isOpenAuthModal ? 'overlay' : ''} ${isOpenAuthModal ? 'modal' : ''}`}
                onClick={(ev) => {
                    dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: false })
                    dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: false })
                }}>
            </div>

            <AuthModal />

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