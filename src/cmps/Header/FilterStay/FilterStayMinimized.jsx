import React from 'react'
import { useSelector } from 'react-redux'

import { motion } from 'framer-motion'

import { SearchIcon } from '../../SVG/HeaderSvg'


export function FilterStayMinimized() {
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)

    const isActive = (inputName) => isOpenFilter === inputName

    return (
        <div className="minimized-filter">
            {["where-input", "checkin-input", "who-input"].map((inputName, index) => (
                <React.Fragment key={inputName}>
                    <div className={inputName}>
                        <motion.p
                            key={`${inputName}-p`}
                            initial={{ scaleX: 0.5 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0.5 }}
                            transition={{ duration: 0.25 }}
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