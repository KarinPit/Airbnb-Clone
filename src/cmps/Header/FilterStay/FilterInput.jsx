import React from 'react';

import { SearchIcon } from '../../SVG/HeaderSvg';

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
}) {
    const isHoveredClass = isHovered && isHovered.current.className.includes(className) ? 'hovered' : '';
    const activeClass = isActive ? 'active-input' : '';
    const borderClass = hideBorder ? 'hide-border' : '';

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
                <p>{subLabel}</p>
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
    );
}