import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { motion } from 'framer-motion'
import { SearchIcon } from '../../SVG/HeaderSvg'


export function FilterStayMinimized() {
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const dispatch = useDispatch()
    const isActive = (inputName) => isOpenFilter === inputName
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    function handleClick(element) {
        dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: true })
        dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: element })
    }

    const animations = {
        filterStay: {
            initial: { scaleX: 0.5 },
            animate: { scaleX: 1 },
            exit: { scaleX: 0.5 }
        }
    }

    return (
        <div className="minimized-filter">
            {["where-input", "checkin-input", "who-input"].map((inputName, index) => (
                <React.Fragment key={inputName}>
                    <div className={inputName} onClick={() => handleClick(inputName)}>
                        <motion.p
                            key={`${inputName}-p`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                            variants={firstRender.current ? {} : animations.navOptions}
                        >
                            {inputName === "where-input" ? "Anywhere" : inputName === "checkin-input" ? "Any week" : "Add guests"}
                        </motion.p>
                    </div>
                    {index < 2 && (
                        <div className={`border-div ${isActive("where-input") || isActive("checkin-input") ? 'hide-border' : ''}`}></div>
                    )}
                </React.Fragment>
            ))}
            <button className="primary-bg">
                <SearchIcon />
            </button>
        </div>
    )
}