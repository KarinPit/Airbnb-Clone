import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import AppHeader from "../../cmps/Header/AppHeader"
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MainLayout() {
    const { isExpandedFilter } = useSelector((storeState) => storeState.filterModule.isExpandedFilter)

    return (
        <>
            <AppHeader />
            <FilterStayMobile />

            <main onClick={(e) => {
            }}>
                <div className={`${isExpandedFilter ? 'overlay' : ''}`}></div>

                <Outlet />
            </main>
        </>
    )
}