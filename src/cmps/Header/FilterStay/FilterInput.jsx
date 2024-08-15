import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { format } from 'date-fns'
import { getMonthName } from '../../../utils/CalendarUtils'

import { SearchIcon } from '../../SVG/HeaderSvg'
import { setFilterBy } from '../../../store/actions/filter.actions'
import { useSelector } from 'react-redux'


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
}) {

    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ loc: filterBy.loc })
    const isHoveredClass = isHovered && isHovered.current.className.includes(className) ? 'hovered' : ''
    const activeClass = isActive ? 'active-input' : ''
    const borderClass = hideBorder ? 'hide-border' : ''


    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onFilterChange(ev) {
        let { value } = ev.target
        setFilterByToEdit(prev => ({ ...prev, loc: value }))
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
                        value={filterBy.checkIn ? `${getMonthName(new Date(filterBy.checkIn).getMonth())} ${format(filterBy.checkIn, 'd')}` : ''}
                    >
                    </input>
                        : className === 'checkout-input' ? <input placeholder='Add dates'
                            type="text"
                            name="checkOut"
                            readOnly
                            value={filterBy.checkOut ? `${getMonthName(new Date(filterBy.checkOut).getMonth())} ${format(filterBy.checkOut, 'd')} ` : ''}
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