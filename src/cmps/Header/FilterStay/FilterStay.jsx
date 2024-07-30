import { useState, useRef, useContext } from 'react'

import FilterContext from '../../../context/FilterContext'
import { FilterInput } from './FilterInput'
import { stayService } from '../../../services/stay.service'

import { SearchIcon } from '../../SVG/HeaderSvg'

export function FilterStay({ isWideScreen }) {
    const { openFilter, setOpenFilter, setIsOpenMobile } = useContext(FilterContext)
    const whereRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const whoRef = useRef(null)
    const [isHovered, setIsHovered] = useState(null)

    const isActive = (inputName) => openFilter && openFilter.includes(inputName)

    const filterInputs = [
        {
            className: "where-input",
            label: "Where",
            subLabel: "Search destinations",
            refElement: whereRef,
            hideBorderCondition: isActive('where-input')
                || isActive('checkin-input')
                || isHovered?.current?.className.includes('where-input')
                || isHovered?.current?.className.includes('checkin-input'),
            pseudoElements: isActive('checkin-input') ? 'after' : ''
        },
        {
            className: "checkin-input",
            label: "Check in",
            subLabel: "Add dates",
            refElement: checkInRef,
            hideBorderCondition: isActive('checkin-input')
                || isActive('checkout-input')
                || isHovered?.current?.className.includes('checkin-input')
                || isHovered?.current?.className.includes('checkout-input'),
            pseudoElements: isActive('where-input') ? 'before' : ''
                || isActive('checkout-input') ? 'after' : ''
        },
        {
            className: "checkout-input",
            label: "Check out",
            subLabel: "Add dates",
            refElement: checkOutRef,
            hideBorderCondition: isActive('checkout-input')
                || isActive('who-input')
                || isHovered?.current?.className.includes('checkout-input')
                || isHovered?.current?.className.includes('who-input'),
            pseudoElements: isActive('checkin-input') ? 'before' : ''
                || isActive('who-input') ? 'after' : ''
        },
        {
            className: "who-input",
            label: "Who",
            subLabel: "Add guests",
            refElement: whoRef,
            hideBorderCondition: false,
            pseudoElements: isActive('checkout-input') ? 'before' : ''
        }
    ]

    function handleClick(element) {
        setOpenFilter(element.current.className)
    }

    function handleMobileFilterClick() {
        if (!isWideScreen) {
            setIsOpenMobile(true)
        }
    }


    return (
        <div className={`filter-search ${openFilter ? 'active-filter' : ''}`}
            onClick={handleMobileFilterClick}>

            <div className="mobile-filter">
                <SearchIcon />
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
    )
}