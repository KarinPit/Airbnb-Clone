import React, { useEffect } from "react";
import { createRouting } from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import { store } from "./store/store";
import { handleScroll, handleResize } from "./store/actions/app.actions"
import { getUserLocation } from "./store/actions/user.actions";


export function App() {
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)
        getUserLocation()

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Provider store={store}>
            <section className={`main-app ${isOpenFilterMobile ? 'hide-overflow' : ''}${isScrolled ? 'scrolled' : ''}`} onClick={(e) => {
                if (e.target.className === 'container'
                    || e.target.className === 'main-app'
                    || e.target.className === 'header'
                    || e.target.className === 'filter-search-container '
                    || e.target.className === 'stay-gallery'
                    || e.target.className === 'primary-bg') {
                    dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: false })
                }
            }}>
                {createRouting()}
            </section>
        </Provider>
    )
}
