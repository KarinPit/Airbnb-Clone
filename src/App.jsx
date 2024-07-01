import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Suspense, lazy } from 'react';

import { store } from './store/store'

import { Home } from './pages/Home'
import AppHeader from './cmps/AppHeader';


export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className='main-app'>
                    <AppHeader />

                    <main className='container'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </main>

                </section>
            </Router>
        </Provider >


    )
}
