import React, { useContext } from "react"
import { Outlet } from 'react-router-dom';

import AppHeader from "../../cmps/Header/AppHeader"
import FilterModalContext from "../../context/FilterContext"
import { FilterStayMobile } from "../../cmps/Header/FilterStay/FilterStayMobile"


export function MainLayout() {
    const { filterSize, setOpenFilter, setFilterSize } = useContext(FilterModalContext)
    return (
        <>
            <AppHeader />
            <FilterStayMobile />

            <main onClick={(e) => {
                setOpenFilter(false)
                setFilterSize(false)
            }}>
                <div className={`${filterSize ? 'overlay' : ''}`}></div>

                <Outlet />
            </main>
        </>
    )
}