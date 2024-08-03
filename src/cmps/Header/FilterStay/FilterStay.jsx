import { useState, useEffect, useRef } from 'react'

import { FilterInput } from './FilterInput'

import { SearchIcon } from '../../SVG/HeaderSvg'
import { useDispatch, useSelector } from 'react-redux'


export function FilterStay({ isWideScreen }) {
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const dispatch = useDispatch()

    const [filterByEdited, setFilterByEdited] = useState(filterBy)
    const [isHovered, setIsHovered] = useState(null)

    const whereRef = useRef(null)
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)
    const whoRef = useRef(null)

    const isActive = (inputName) => isOpenFilter && isOpenFilter.includes(inputName)


    useEffect(() => {
    }, [])

    useEffect(() => {
    }, [filterByEdited])


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
        dispatch({ type: 'SET_OPEN_FILTER', isOpenFilter: element.current.className })
    }

    function handleMobileFilterClick() {
        if (!isWideScreen) {
            dispatch({ type: 'SET_OPEN_FILTER_MOBILE', isOpenFilterMobile: true })
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log('Submitted filter', filterBy);
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
                    filterByEdited={filterByEdited}
                    setFilterByEdited={setFilterByEdited}
                />
            ))}
        </form>
    )
}