import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Suspense, lazy, useState } from 'react';

import { store } from './store/store'
import { Home } from './pages/Home'
import AppHeader from './cmps/AppHeader';
import FilterContext from './context/FilterContext';


export function App() {
    const [openFilter, setOpenFilter] = useState(false)

    return (
        <Provider store={store}>
            <Router>
                <FilterContext.Provider value={{ openFilter, setOpenFilter }}>
                    <section className='main-app' onClick={(e) => {
                        if (e.target.className === 'container'
                            || e.target.className === 'main-app'
                            || e.target.className === 'header') {
                            setOpenFilter(false)
                        }
                    }}>
                        <AppHeader />

                        <main className='container'>
                            <Routes>
                                {/* <Route path="/" element={<Home />} /> */}
                            </Routes>
                        </main>

                    </section>
                </FilterContext.Provider>
            </Router>
        </Provider >


    )
}
