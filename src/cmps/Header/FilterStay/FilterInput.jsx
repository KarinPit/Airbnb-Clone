import React, { useEffect, useState } from 'react'

import { SearchIcon } from '../../SVG/HeaderSvg'


export function FilterInput({
    className,
    label,
    subLabel,
    refElement,
    isActive,
    isHovered,
    onClick,
    onMouseEnter,
    onMouseLeave,
    hideBorder,
    pseudoElements,
    filterBy,
    onChangeFilter
}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const isHoveredClass = isHovered && isHovered.current.className.includes(className) ? 'hovered' : ''
    const activeClass = isActive ? 'active-input' : ''
    const borderClass = hideBorder ? 'hide-border' : ''


    useEffect(() => {
        onChangeFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilterChange(ev) {
        let { name: field, type, value } = ev.target
        value = type === 'number' ? +value : value
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
                        onChange={onFilterChange}>
                    </input>

                    : className === 'checkin-input' ? <input placeholder={!filterBy.checkIn ? 'Add dates' : filterBy.checkIn}
                        type="text"
                        name="checkIn"
                        readOnly
                        value={filterBy.checkIn}
                        onChange={onFilterChange}>
                    </input>
                        : className === 'checkout-input' ? <input placeholder={!filterBy.checkOut ? 'Add dates' : filterBy.checkOut}
                            type="text"
                            name="checkOut"
                            readOnly
                            value={filterBy.checkOut}
                            onChange={onFilterChange}>
                        </input>
                            : className === 'who-input' ? <input placeholder='Add guests'
                                type="number"
                                name="who"
                                readOnly
                                value={!filterBy.who <= 0 ? filterBy.who : ''}
                                onChange={onFilterChange}>
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