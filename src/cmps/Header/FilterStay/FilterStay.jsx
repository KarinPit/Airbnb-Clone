import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom"

import { FilterInput } from './FilterInput'
import { SearchIcon } from '../../SVG/HeaderSvg'


export function FilterStay() {
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [isHovered, setIsHovered] = useState(null)
    const dispatch = useDispatch()

    const whereRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const whoRef = useRef(null)

    const isActive = (inputName) => isOpenFilter && isOpenFilter.includes(inputName)


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
            pseudoElements: isActive('checkin-input') ? 'after' : '',
            filterKey: 'loc'
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
                || isActive('checkout-input') ? 'after' : '',
            filterKey: 'checkIn'
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
                || isActive('who-input') ? 'after' : '',
            filterKey: 'checkOut'
        },
        {
            className: "who-input",
            label: "Who",
            subLabel: "Add guests",
            refElement: whoRef,
            hideBorderCondition: false,
            pseudoElements: isActive('checkout-input') ? 'before' : '',
            filterKey: 'who'
        }
    ]

    function handleClick(element) {
        dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: element.current.className })
    }

    function handleMobileFilterClick() {
        if (!isWideScreen) {
            dispatch({ type: 'SET_OPEN_FILTER_MOBILE', isOpenFilterMobile: true })
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        // setFilterBy(filterByEdited)
    }

    return (
        <form className={`filter-search ${isOpenFilter ? 'active-filter' : ''}`}
            onClick={handleMobileFilterClick} onSubmit={(ev) => handleSubmit(ev)}>

            <div className="mobile-filter">
                <SearchIcon />
                <div>
                    <p>Where to?</p>
                    <p>Anywhere * Anyweek * Add guests</p>
                </div>
            </div>

            {filterInputs.map(({ className, label, subLabel, refElement, hideBorderCondition, pseudoElements, filterKey }) => (
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
                    filterKey={filterKey}
                    filterBy={filterBy}
                />
            ))}
        </form>
    )
}