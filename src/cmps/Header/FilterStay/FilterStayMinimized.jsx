import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import FilterContext from '../../../context/FilterContext';

export function FilterStayMinimized() {
    const { openFilter } = useContext(FilterContext);

    const isActive = (inputName) => openFilter === inputName;

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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                    <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                </svg>
            </button>
        </div>
    );
}