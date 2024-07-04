import { motion } from "framer-motion"
import { useState, useRef, useContext } from "react"
import FilterModalContext from "../context/FilterModalContext"


export function FilterStay() {
    const [clickedElement, setClickedElement] = useState(null)
    const context = useContext(FilterModalContext)
    const whereRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const whoRef = useRef(null)

    function handleClick(element) {
        context.setOpenFilter(true)
    }

    return (
        <div className="filter-search">
            <div className="mobile-filter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path></svg>
                <div>
                    <p>Where to?</p>
                    <p>Anywhere * Anyweek * Add guests</p>
                </div>
            </div>

            <div className="where-input" ref={whereRef} onClick={() => { handleClick(whereRef) }}>
                <p>Where</p>
                <p>Search destinations</p>
            </div>

            <div className="border-div"></div>

            <div className="checkin-input" ref={checkInRef} onClick={() => { handleClick(checkInRef) }}>
                <p>Check In</p>
                <p>Add dates</p>
            </div>

            <div className="border-div"></div>

            <div className="checkout-input" ref={checkOutRef} onClick={() => { handleClick(checkOutRef) }}>
                <p>Checkout</p>
                <p>Add dates</p>
            </div>

            <div className="border-div"></div>

            <div className="who-input" ref={whoRef} onClick={() => { handleClick(whoRef) }}>
                <p>Who</p>
                <p>Add guests</p>
            </div>

            <button className="primary-bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path></svg>
            </button>
        </div>
    )
}

export function MinimizedFilter() {
    return (
        <div className="minimized-filter">
            <div className="where-input">
                <motion.p
                    key="where-p"
                    initial={{ scaleX: 0.5 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0.5 }}
                    transition={{
                        duration: 0.25
                    }}
                >
                    Anywhere
                </motion.p>
            </div>

            <div className="border-div"></div>

            <div className="checkin-input"><motion.p
                key="where-p"
                initial={{ scaleX: 0.5 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0.5 }}
                transition={{
                    duration: 0.25
                }}
            >
                Any week
            </motion.p></div>

            <div className="border-div"></div>

            <div className="who-input"><motion.p
                key="where-p"
                initial={{ scaleX: 0.5 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0.5 }}
                transition={{
                    duration: 0.25
                }}
            >
                Add guests
            </motion.p></div>

            <button className="primary-bg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search"><path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path></svg>
            </button>
        </div>



    )
}