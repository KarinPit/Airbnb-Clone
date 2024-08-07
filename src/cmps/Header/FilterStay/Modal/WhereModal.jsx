import { useEffect, useState, useRef, useCallback } from 'react'

import { Clock, SearchIcon } from '../../../SVG/HeaderSvg'

import globalMap from '../../../../../public/images/maps/world-map.jpg'
import italyMap from '../../../../../public/images/maps/italy-map.webp'
import spainMap from '../../../../../public/images/maps/spain-map.webp'
import greeceMap from '../../../../../public/images/maps/greece-map.webp'
import europeMap from '../../../../../public/images/maps/europe-map.webp'
import unitedStatesMap from '../../../../../public/images/maps/united-states-map.webp'

const maps = [
    { src: globalMap, label: "I'm flexible" },
    { src: italyMap, label: "Italy" },
    { src: europeMap, label: "Europe" },
    { src: greeceMap, label: "Greece" },
    { src: unitedStatesMap, label: "United States" },
    { src: spainMap, label: "Spain" },
]

function RecentSearch() {
    return (
        <div className="recent-searches">
            <h4>Recent searches</h4>
            <div className="search-records">
                <div className="record">
                    <div className="svg-container">
                        <Clock />
                    </div>
                    <div className="text-container">
                        <p>Italy &middot; stay</p>
                        <p>Apr 1 - Jul 1</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchRegions({ clickedIndex, handleClick }) {
    return (
        <div className="search-regions">
            <h4>Search by region</h4>
            <div className="countries">
                {maps.map((map, index) => (
                    <div
                        key={index}
                        className={`country ${clickedIndex === index ? 'shrink' : ''}`}
                        onMouseDown={() => handleClick(index)}
                    // onMouseOut={() => handleClick(null)}
                    >
                        <img src={map.src} alt={map.label} />
                        <p>{map.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SearchForm() {
    return (
        <div className='input'>
            <SearchIcon />
            <input placeholder='Search destinations' />
        </div>
    )
}

export function WhereModalMobile() {
    const [clickedIndex, setClickedIndex] = useState(null)

    const handleClick = (index) => {
        setClickedIndex(index === clickedIndex ? null : index)
    }

    return (
        <div className="where-modal mobile">
            <div className="search-regions">
                <h2>Where to?</h2>
                <SearchForm />
                <SearchRegions clickedIndex={clickedIndex} handleClick={handleClick} />
            </div>
        </div>
    )
}

export function WhereModal({ filterBy, onChangeFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    const clickedIndexRef = useRef(null)

    useEffect(() => {
        onChangeFilter({ loc: filterByToEdit.loc })
    }, [filterByToEdit])

    function handleClick(index) {
        const newClickedIndex = index === clickedIndexRef.current ? null : index
        clickedIndexRef.current = newClickedIndex

        setFilterByToEdit({
            loc: newClickedIndex === null ? '' : (maps[newClickedIndex]?.label || '')
        })
    }

    return (
        <div className="where-modal">
            <RecentSearch />
            <div className="border-div"></div>
            <SearchRegions clickedIndex={clickedIndexRef.current} handleClick={handleClick} />
        </div>
    )
}