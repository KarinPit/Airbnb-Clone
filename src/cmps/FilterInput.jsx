import React from 'react'

export function FilterInput({ className, label, subLabel, refElement, isActive, isHovered, onClick, onMouseEnter, onMouseLeave, hideBorder, pseudoElements }) {
    return (
        <div className={[`${className} ${isActive ? 'active-input' : ''} ${isHovered && isHovered.current.className.includes(className) ? 'hovered' : ''} ${pseudoElements}`].join(' ').replace(/\s+/g, ' ').trim()}
            ref={refElement} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>

            <div>
                <p>{label}</p>
                <p>{subLabel}</p>
            </div>

            {className !== 'who-input' ?
                <div className={`border-div ${hideBorder ? 'hide-border' : ''}`}></div>
                : ''}
        </div>
    )
}

