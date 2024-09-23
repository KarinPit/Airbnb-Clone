import React, { useEffect } from "react";
import { createRouting } from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store } from "./store/store";
import { handleScroll, handleResize } from "./store/actions/app.actions"
import { getUserLocation } from "./store/actions/user.actions";
import { useLocation } from "react-router";



export function App() {
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const location = useLocation()
    const dispatch = useDispatch()
    const shouldAddScrollListener = !location.pathname.includes('confirm-order') && !location.pathname.includes('stay');

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        getUserLocation()

        if (shouldAddScrollListener) {
            window.addEventListener('scroll', handleScroll)
        }

        return () => {
            window.removeEventListener('resize', handleResize)

            if (shouldAddScrollListener) {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [location.pathname])

    return (
        <Provider store={store}>
            <section className={`main-app ${isOpenFilterMobile ? 'hide-overflow' : ''}${isScrolled && shouldAddScrollListener ? 'scrolled' : ''} ${location.pathname.includes('stay') ? 'stay-details-layout' : ''} ${location.pathname.includes('profile') ? 'profile-layout' : ''}`}
                onClick={(e) => {
                    // {console.log(e.target.className)}
                    if (e.target.className === 'container'
                        || e.target.className === 'main-app '
                        || e.target.className === 'header '
                        || e.target.className === 'filter-search-container '
                        || e.target.className === 'stay-gallery'
                        || e.target.closest('main')
                        || e.target.className === 'primary-bg') {
                        dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: false })
                    }
                }}>
                {createRouting()}
            </section>
        </Provider>
    )
}
