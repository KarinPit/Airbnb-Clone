import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import AppHeader from "../../cmps/Header/AppHeader"
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MainLayout() {
    const { isExpandedFilter } = useSelector((storeState) => storeState.filterModule)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const dispatch = useDispatch()



    return (
        <>
            <AppHeader />
            <FilterStayMobile />

            <main>
                <div className={`${isScrolled && isExpandedFilter ? 'overlay' : ''}`}
                    onClick={(ev) => dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: false })}></div>

                <Outlet />
            </main>
        </>
    )
}