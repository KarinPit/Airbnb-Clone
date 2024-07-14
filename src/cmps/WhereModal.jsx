import { useState } from 'react';

import globalMap from '../../public/images/maps/world-map.jpg';
import italyMap from '../../public/images/maps/italy-map.webp';
import spainMap from '../../public/images/maps/spain-map.webp';
import greeceMap from '../../public/images/maps/greece-map.webp';
import europeMap from '../../public/images/maps/europe-map.webp';
import unitedStatesMap from '../../public/images/maps/united-states-map.webp';

const maps = [
    { src: globalMap, label: "I'm flexible" },
    { src: italyMap, label: "Italy" },
    { src: europeMap, label: "Europe" },
    { src: greeceMap, label: "Greece" },
    { src: unitedStatesMap, label: "United States" },
    { src: spainMap, label: "Spain" },
]

export function WhereModal() {
    const [clickedIndex, setClickedIndex] = useState(null)

    function handleClick(index) {
        setClickedIndex(index === clickedIndex ? null : index)
    }


    return (
        <div className="where-modal">
            <div className="recent-searches">
                <h4>Recent searches</h4>
                <div className="search-records">
                    <div className="record">
                        <div className="svg-container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="clock">
                                <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"></path>
                                <path d="M17.515,14.143,13,11.434V6a1,1,0,0,0-2,0v6a1.075,1.075,0,0,0,.485.857l5,3a1,1,0,1,0,1.03-1.714Z"></path>
                            </svg>
                        </div>
                        <div className="text-container">
                            <p>Italy &middot; stay</p>
                            <p>Apr 1 - Jul 1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-div"></div>

            <div className="search-regions">
                <h4>Search by region</h4>
                <div className="countries">
                    {maps.map((map, index) => (
                        <div
                            key={index}
                            className={`country ${clickedIndex === index ? 'shrink' : ''}`}
                            onMouseDown={() => handleClick(index)}
                            onMouseOut={() => setClickedIndex(null)}
                        >
                            <img src={map.src} alt={map.label} />
                            <p>{map.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function WhereModalMobile() {
    const [clickedIndex, setClickedIndex] = useState(null)

    function handleClick(index) {
        setClickedIndex(index === clickedIndex ? null : index)
    }


    return (
        <div className="where-modal mobile">
            <div className="search-regions">
                <h2>Where to?</h2>
                <form>
                    <div className='input'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="search">
                            <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
                        </svg>
                        <input placeholder='Search destinations'></input>
                    </div>
                </form>
                <div className="countries">
                    {maps.map((map, index) => (
                        <div
                            key={index}
                            className={`country ${clickedIndex === index ? 'shrink' : ''}`}
                            onMouseDown={() => handleClick(index)}
                            onMouseOut={() => setClickedIndex(null)}
                        >
                            <img src={map.src} alt={map.label} />
                            <p>{map.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
