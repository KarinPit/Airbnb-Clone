import React from 'react'

export function FilterInput({ className, label, subLabel, refElement, isActive, onClick, hideBorder }) {
    return (
        <div className={[`${className} ${isActive ? 'active-input' : ''}`].join(' ').replace(/\s+/g, ' ').trim()} ref={refElement} onClick={onClick}>
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

