import { useEffect, useRef, useState } from "react"


export function ImageCarousel({ stayImages, isGuestFavorite, stayId }) {
    const [currentImage, setCurrentImage] = useState(stayImages.picture_url)
    const [currentIndexes, setCurrentIndexes] = useState({})
    const [isHovered, setIsHovered] = useState(null)

    useEffect(() => {
        const initialIndexes = {};
        stayImages.additional.forEach(() => { initialIndexes[stayId] = 0 })
        setCurrentIndexes(initialIndexes);
    }, [])

    useEffect(() => {
        console.log(currentIndexes)
    }, [currentIndexes])

    function handleHover(stayId) {
        setIsHovered(stayId);
    }

    function handleArrowClick(arrowType) {
        if (isHovered === stayId) {
            setCurrentIndexes((prev) => {
                const newIndex = arrowType === 'right'
                    ? prev[isHovered] + 1
                    : prev[isHovered] - 1;

                return {
                    ...prev,
                    [isHovered]: newIndex
                };
            });
        }
    }

    return (
        <div className="stay-carousel"
            onMouseEnter={() => { handleHover(stayId) }}
            onMouseLeave={() => { handleHover(null) }}
        >
            <div className="add-to-favorites">
                {isGuestFavorite &&
                    <div className="guest-favorite">
                        <p>Guest favorite</p>
                    </div>}

                <div className="heart-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" id="heart" x="0" y="0" version="1.1" viewBox="0 0 29 29" xmlSpace="preserve"><path d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z"></path><path d="m14.854 6.083-.354.353-.354-.354a6.5 6.5 0 0 0-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 0 0-9.192-9.191z"></path></svg>
                </div>
            </div>

            <div className={`arrows ${isHovered === stayId ? 'show' : ''}`}>
                <div onClick={() => { handleArrowClick('left') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="left-arrow"><path d="m8.5 12.8 5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6 0-.1 0-.1 0 0z"></path></svg>
                </div>
                <div onClick={() => { handleArrowClick('right') }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
                </div>
            </div>

            <div>
                <img src={currentImage}></img>
            </div>
        </div>
    )
}