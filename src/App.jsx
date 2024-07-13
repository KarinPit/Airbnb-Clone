import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Suspense, lazy, useState } from 'react';

import { store } from './store/store'
import { Home } from './pages/Home'
import AppHeader from './cmps/AppHeader';
import FilterContext from './context/FilterContext';


export function App() {
    const [openFilter, setOpenFilter] = useState(false)
    const [filterSize, setFilterSize] = useState(false)

    return (
        <Provider store={store}>
            <Router>
                <FilterContext.Provider value={{ openFilter, setOpenFilter, filterSize, setFilterSize }}>
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

                        <main className='container' onClick={(e) => {
                            setOpenFilter(false)
                            setFilterSize(false)
                        }}>
                            <div className={`${filterSize ? 'overlay' : ''}`}></div>

                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </main>

                    </section>
                </FilterContext.Provider>
            </Router>
        </Provider >


    )
}
