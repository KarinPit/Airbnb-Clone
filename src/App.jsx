import React from "react";
import { createRouting } from "./routes";
import { useState } from "react";
import AppHeader from './cmps/Header/AppHeader'
import { FilterStayMobile } from './cmps/Header/FilterStay/FilterStayMobile'
import FilterContext from './context/FilterContext'


export function App() {
    const screenWidth = 743
    const [openFilter, setOpenFilter] = useState(false)
    const [filterSize, setFilterSize] = useState(false)
    const [isOpenMobile, setIsOpenMobile] = useState(false)
    const [openFilterMobile, setOpenFilterMobile] = useState('where-input-mobile')
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > screenWidth)
    return (
        <>
            <FilterContext.Provider
                value={{
                    openFilter, setOpenFilter,
                    filterSize, setFilterSize,
                    isOpenMobile, setIsOpenMobile,
                    openFilterMobile, setOpenFilterMobile,
                    isWideScreen, setIsWideScreen,
                    screenWidth
                }}>

                <section className='main-app' onClick={(e) => {
                    if (e.target.className === 'container'
                        || e.target.className === 'main-app'
                        || e.target.className === 'header'
                        || e.target.className === 'filter-search-container'
                        || e.target.className === 'filter-search-sub-container') {
                        setOpenFilter(false)
                    }
                }}>
                    <AppHeader />
                    <FilterStayMobile />

                    <main onClick={(e) => {
                        setOpenFilter(false)
                        setFilterSize(false)
                    }}>
                        <div className={`${filterSize ? 'overlay' : ''}`}></div>
                        {createRouting()}
                    </main>

                </section>
            </FilterContext.Provider>
        </>
    )
}
