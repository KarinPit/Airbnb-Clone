import { useState, useEffect, useContext } from 'react';
import { motion, useScroll, AnimatePresence } from "framer-motion"

import { FilterStay, MinimizedFilter } from './FilterStay'
import { FilterStayModal } from './FilterStayModal'
import FilterContext from "../context/FilterContext"

import airbnbLogo from '../../public/svg/airbnb-logo.svg'


export default function AppHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768)
    const { scrollY } = useScroll()
    const context = useContext(FilterContext)

    useEffect(() => {
        function handleResize() {
            setIsWideScreen(window.innerWidth > 768)
        }

        window.addEventListener('resize', handleResize)
        scrollY.onChange((latest) => {
            setIsScrolled(latest > 0)
        })

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [scrollY])


    return (
        <header className={`header${isScrolled ? ' scrolled' : ''}`}>
            <a href="" className="logo">
                <img src={airbnbLogo} alt="airbnc logo" />
                <span className="primary-color">airbnc</span>
            </a>

            <AnimatePresence>
                {isScrolled && isWideScreen ? (
                    <motion.div
                        key="nav-options-scrolled"
                        className='nav-options'
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -100, scale: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{
                            duration: 0.5
                        }}
                    >
                        <a href="#" className='active'>Stays</a>
                        <a href="#">About me</a>
                    </motion.div>
                ) : (
                    <motion.div
                        key="nav-options-default"
                        className='nav-options'
                        initial={{ y: -50, scale: 0 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 0 }}
                        transition={{
                            duration: 0.2
                        }}
                    >
                        <a href="#" className='active'>Stays</a>
                        <a href="#">About me</a>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='user-nav'>
                <a href="#">Switch to hosting</a>
                <a href='#'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="globe"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="16"></circle><line x1="37.467" x2="218.532" y1="96" y2="96" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="37.471" x2="218.534" y1="160" y2="160" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><ellipse cx="128" cy="128" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="16" rx="40" ry="93.423"></ellipse></svg>
                </a>

                <div className="user-menu grey-border">
                    <div className='menu-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" id="list"><line x1="35.704" x2="164.096" y1="49.782" y2="49.782" fill="none" stroke="#050b1e" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="13"></line><line x1="35.904" x2="164.296" y1="99.8" y2="99.8" fill="none" stroke="#050b1e" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="13"></line><line x1="35.904" x2="164.296" y1="150.018" y2="150.018" fill="none" stroke="#050b1e" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="13"></line></svg>
                    </div>
                    <div className='profile-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" id="user"><path d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path></svg>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isScrolled && isWideScreen ? (
                    <motion.div
                        key="MinimizedFilter"
                        className="filter-search-container"
                        initial={{ opacity: 0, y: 50, scaleX: 2 }}
                        animate={{ opacity: 1, y: 0, scaleX: 1 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            opacity: { duration: 0 },
                            y: { duration: 0.25 },
                            scaleX: { duration: 0.25 }
                        }}
                    >

                        <MinimizedFilter isScrolled={isScrolled} />
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            key="FilterStay"
                            className="filter-search-container"
                            initial={{ opacity: 0, y: -50, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.5 }}
                            transition={{
                                opacity: { duration: 0 },
                                scale: { duration: 0.25 },
                                y: { duration: 0.25 }
                            }}
                        >
                            <div>
                                <FilterStay />
                                {context.openFilter ?
                                    <FilterStayModal />
                                    : ''}
                            </div>

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}