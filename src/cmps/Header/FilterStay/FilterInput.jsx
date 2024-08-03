// import React, { useEffect, useState } from 'react'

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
    filterByEdited,
    setFilterByEdited
}) {
    const isHoveredClass = isHovered && isHovered.current.className.includes(className) ? 'hovered' : ''
    const activeClass = isActive ? 'active-input' : ''
    const borderClass = hideBorder ? 'hide-border' : ''

    function onFilterChange(ev) {
        let { name: field, type, value } = ev.target
        value = type === 'number' ? +value : value
        setFilterByEdited(prev => ({ ...prev, [field]: value }))
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
                    <input placeholder={!filterByEdited.location ? 'Search destinations' : filterByEdited.location}
                        type="text"
                        name="location"
                        value={filterByEdited.location}
                        autoComplete="off"
                        onChange={onFilterChange}>
                    </input>

                    : className === 'checkin-input' ? <input placeholder={!filterByEdited.checkIn ? 'Add dates' : filterByEdited.checkIn}
                        type="text"
                        name="checkIn"
                        readOnly
                        value={filterByEdited.checkIn}
                        onChange={onFilterChange}>
                    </input>
                        : className === 'checkout-input' ? <input placeholder={!filterByEdited.checkOut ? 'Add dates' : filterByEdited.checkOut}
                            type="text"
                            name="checkOut"
                            readOnly
                            value={filterByEdited.checkOut}
                            onChange={onFilterChange}>
                        </input>
                            : className === 'who-input' ? <input placeholder='Add guests'
                                type="number"
                                name="who"
                                readOnly
                                value={!filterByEdited.who <= 0 ? filterByEdited.who : ''}
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