import React, { useEffect } from "react";
import { createRouting } from "./routes";
import { Provider, useDispatch } from "react-redux";

import { store } from "./store/store";
import { handleScroll, handleResize } from "./store/actions/app.actions"


export function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Provider store={store}>
            <section className='main-app' onClick={(e) => {
                if (e.target.className === 'container'
                    || e.target.className === 'main-app'
                    || e.target.className === 'header'
                    || e.target.className === 'filter-search-container'
                    || e.target.className === 'filter-search-sub-container'
                    || e.target.className === 'primary-bg') {
                    dispatch({ type: SET_OPEN_FILTER, isOpenFilter: false })
                }
            }}>

                {createRouting()}
            </section>
        </Provider>
    )
}
