import React, { useEffect } from "react";
import { createRouting } from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store } from "./store/store";
import { handleScroll, handleResize } from "./store/actions/app.actions"
import { getUserLocation } from "./store/actions/user.actions";
import { useLocation } from "react-router";



export function App() {
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const isOpenFilterMobile = useSelector((storeState) => storeState.filterModule.isOpenFilterMobile)
    const isScrolled = useSelector((storeState) => storeState.appModule.isScrolled)
    const location = useLocation()
    const dispatch = useDispatch()
    const shouldAddScrollListener = !location.pathname.includes('confirm-order') && !location.pathname.includes('stay') && !location.pathname.includes('profile');

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
            <section className={`main-app ${isOpenFilterMobile ? 'hide-overflow' : ''}${isScrolled && shouldAddScrollListener ? 'scrolled' : ''} ${isOpenFilter ? 'expanded-filter' : ''} ${location.pathname.includes('stay') ? 'stay-details-layout' : ''} ${location.pathname.includes('profile') ? 'profile-layout' : ''}`}
                onClick={(e) => {
                    // { console.log(e.target.className) }
                    if (e.target.className === 'container'
                        || e.target.className === 'main-app '
                        || e.target.className === 'header '
                        || e.target.className === 'filter-search-container '
                        || e.target.className === 'stay-gallery'
                        || e.target.closest('main')
                        || e.target.className === 'primary-bg') {
                        dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: false })
                        dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: false })
                    }

                    if (e.target.className === 'review-summary'
                        || e.target.className === 'place-offers-summary'
                        || e.target.className === 'host-info'
                        || e.target.className === 'amenity'
                        || e.target.className === 'order-stay'
                        || e.target.className === 'stay-details'
                        || e.target.className === 'trip-summary'
                        || e.target.className === 'overlay'
                        || e.target.className === 'overlay modal'
                    ) {
                        dispatch({ type: 'SET_IS_OPEN_AUTH_MODAL', isOpenAuthModal: false })
                        dispatch({ type: 'SET_OPEN_MODAL', isOpenModal: false })
                    }
                }}>
                {createRouting()}
            </section>
        </Provider>
    )
}
