import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { stayService } from '../../services/stay.service';
import { AnimatePresence } from 'framer-motion';

import AppHeader from "../../cmps/Header/AppHeader"
import { Footer } from '../../cmps/Footer/Footer'
import { MobileFooter } from '../../cmps/Footer/MobileFooter';
import { FilterMobileFooter } from '../../cmps/Footer/FilterMobileFooter';
import { FilterCategories } from '../../cmps/Stay/CategoryFilter/FilterCategories';
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"
import { FilterStayModal } from '../../cmps/Header/FilterStay/Modal/FilterStayModal';
import { setFilterBy } from '../../store/actions/filter.actions';

export function MainLayout() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const { isExpandedFilter } = useSelector((storeState) => storeState.filterModule)
    const { isOpenFilterMobile } = useSelector((storeState) => storeState.filterModule)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        stayService.fetchImages()
            .then((imgs) => {
                const mappedOptions = imgs.map((image) => ({
                    title: image.title,
                    value: image.value,
                    icon: `${image.src}`,
                }));
                setOptions(mappedOptions);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch images:", error);
                // setLoading(false);
            });
    }, [])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate);
    }

    return (
        <>
            <AppHeader />
            <FilterStayMobile />
            <FilterCategories onSetFilter={onSetFilter} filterBy={filterBy.category_tag} />

            <main>
                <div className={`${isScrolled && isExpandedFilter ? 'overlay' : ''}`}
                    onClick={(ev) => {
                        dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: false })
                    }}></div>
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