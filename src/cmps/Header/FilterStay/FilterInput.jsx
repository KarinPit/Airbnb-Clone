import React, { useEffect, useState } from 'react'

import { SearchIcon } from '../../SVG/HeaderSvg'
import { setFilterBy } from '../../../store/actions/filter.actions'
import { stayService } from '../../../services/stay.service'
import { useSearchParams } from 'react-router-dom'


export function FilterInput({
    className,
    label,
    refElement,
    isActive,
    isHovered,
    onClick,
    onMouseEnter,
    onMouseLeave,
    hideBorder,
    pseudoElements,
    filterBy,
    filterKey,
}) {
    const [filterByToEdit, setFilterByToEdit] = useState({ [filterKey]: filterBy[filterKey] })
    const isHoveredClass = isHovered && isHovered.current.className.includes(className) ? 'hovered' : ''
    const activeClass = isActive ? 'active-input' : ''
    const borderClass = hideBorder ? 'hide-border' : ''
    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        const initialFilter = stayService.getFilterFromParams(searchParams);
        setFilterBy(initialFilter);
        setFilterByToEdit(initialFilter);
    }, [])

    useEffect(() => {
        setSearchParams(stayService.sanitizeFilterParams(filterBy))
    }, [filterBy])

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onFilterChange(ev) {
        let { name: field, value } = ev.target
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div
            className={`${className} ${activeClass} ${isHoveredClass} ${pseudoElements}`.replace(/\s+/g, ' ').trim()}
            ref={refElement}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div>
                <p>{label}</p>
                {className === 'where-input' ?
                    <input placeholder={!filterBy.loc ? 'Search destinations' : filterBy.loc}
                        type="text"
                        name="loc"
                        value={filterBy.loc}
                        autoComplete="off"
                        onChange={onFilterChange}
                    >
                    </input>

                    : className === 'checkin-input' ? <input placeholder='Add dates'
                        type="text"
                        name="checkIn"
                        readOnly
                        value={filterBy.checkIn}
                    >
                    </input>
                        : className === 'checkout-input' ? <input placeholder='Add dates'
                            type="text"
                            name="checkOut"
                            readOnly
                            value={filterBy.checkOut}
                        >
                        </input>

                            : className === 'who-input' ? <input placeholder="Add guests"
                                type="text"
                                name="who"
                                readOnly
                                value={filterBy.who.totalCount > 0 ? `${filterBy.who.totalCount} guests` : ''}
                            >
                            </input> : ''
                }
            </div>

            {className !== 'who-input' && (
                <div className={`border-div ${borderClass}`}></div>
            )}

            {className === 'who-input' && (
                <button className="primary-bg">
                    <SearchIcon />
                </button>
            )}
        </div>
    )
}