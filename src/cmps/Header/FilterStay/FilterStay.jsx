import { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import FilterContext from '../../../context/FilterContext';
import { FilterInput } from './FilterInput';
import { WhereModalMobile } from "../FilterStay/Modal/WhereModal";
import CalendarPicker from './Modal/CalendarPicker/CalendarPicker';
import { WhoModal } from "../FilterStay/Modal/WhoModal";

export function FilterStay({ isWideScreen }) {
    const { openFilter, setOpenFilter, setIsOpenMobile } = useContext(FilterContext);
    const whereRef = useRef(null);
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);
    const whoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(null);

    const handleClick = (element) => {
        setOpenFilter(element.current.className);
    };

    const handleMobileFilterClick = () => {
        if (!isWideScreen) {
            setIsOpenMobile(true);
        }
    };

    const isActive = (inputName) => openFilter && openFilter.includes(inputName);

    const filterInputs = [
        {
            className: "where-input",
            label: "Where",
            subLabel: "Search destinations",
            refElement: whereRef,
            hideBorderCondition: isActive('where-input') || isActive('checkin-input') || isHovered?.current?.className.includes('where-input') || isHovered?.current?.className.includes('checkin-input'),
            pseudoElements: isActive('checkin-input') ? 'after' : ''
        },
        {
            className: "checkin-input",
            label: "Check in",
            subLabel: "Add dates",
            refElement: checkInRef,
            hideBorderCondition: isActive('checkin-input') || isActive('checkout-input') || isHovered?.current?.className.includes('checkin-input') || isHovered?.current?.className.includes('checkout-input'),
            pseudoElements: isActive('where-input') ? 'before' : '' || isActive('checkout-input') ? 'after' : ''
        },
        {
            className: "checkout-input",
            label: "Check out",
            subLabel: "Add dates",
            refElement: checkOutRef,
            hideBorderCondition: isActive('checkout-input') || isActive('who-input') || isHovered?.current?.className.includes('checkout-input') || isHovered?.current?.className.includes('who-input'),
            pseudoElements: isActive('checkin-input') ? 'before' : '' || isActive('who-input') ? 'after' : ''
        },
        {
            className: "who-input",
            label: "Who",
            subLabel: "Add guests",
            refElement: whoRef,
            hideBorderCondition: false,
            pseudoElements: isActive('checkout-input') ? 'before' : ''
        }
    ];

    return (
        <div className={`filter-search ${openFilter ? 'active-filter' : ''}`}
            onClick={handleMobileFilterClick}>

            <div className="mobile-filter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                    <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                </svg>
                <div>
                    <p>Where to?</p>
                    <p>Anywhere * Anyweek * Add guests</p>
                </div>
            </div>
            {filterInputs.map(({ className, label, subLabel, refElement, hideBorderCondition, pseudoElements }) => (
                <FilterInput
                    key={className}
                    className={className}
                    label={label}
                    subLabel={subLabel}
                    refElement={refElement}
                    isActive={isActive(className)}
                    isHovered={isHovered}
                    onClick={() => handleClick(refElement)}
                    onMouseEnter={() => setIsHovered(refElement)}
                    onMouseLeave={() => setIsHovered(null)}
                    hideBorder={hideBorderCondition}
                    pseudoElements={pseudoElements}
                />
            ))}
        </div>
    );
}