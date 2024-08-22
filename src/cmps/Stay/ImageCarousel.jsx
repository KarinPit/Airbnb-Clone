import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"


export function ImageCarousel({ stayImages, isGuestFavorite, stayId }) {
    const [currentIndexes, setCurrentIndexes] = useState({ [stayId]: 0 })
    const [isHovered, setIsHovered] = useState(null)
    const [slideDirection, setSlideDirection] = useState('');
    const [dotCycle, setDotCycle] = useState(0);
    const totalImages = stayImages.additional.length;


    function handleArrowClick(direction) {
        setSlideDirection(direction)
        setCurrentIndexes(prev => ({
            ...prev,
            [stayId]: direction === 'right'
                ? Math.min(prev[stayId] + 1, stayImages.additional.length - 1)
                : Math.max(prev[stayId] - 1, 0)
        }))

        setDotCycle(prev => {
            if (direction === 'right') {
                if (currentIndexes[stayId] < 2) {
                    return 0
                }
                else {
                    return prev + 18;
                }
            } else {
                return prev > 18 ? prev - 18 : 0;
            }
        });
    }

    function getDotClass(index) {
        const currentIndex = currentIndexes[stayId];
        const activeDotIndex = 2 * (dotCycle / 18) + 2
        const shrinkDotIndex = 2 * (dotCycle / 18) + 2

        if (currentIndex < 3) {
            const className = `${currentIndex === index ? 'active-dot' : ''} ${index === 3 || index === 4 ? 'shrinked-dot' : ''}`
            return className
        }

        else if (currentIndex >= 3 && currentIndex <= totalImages - 3) {
            const className = `${index === activeDotIndex ? 'active-dot' : ''} ${index % 5 === 0 || index % 5 === 1 ? 'shrinked-dot' : ''}`
            return className
        }

        else {
            const className = `${currentIndex === (totalImages - (3 - index)) ? 'active-dot' : ''} ${index % 5 === 0 || index % 5 === 1 ? 'shrinked-dot' : ''}`
            return className
        }
    }

    function dotTransform() {
        const currentIndex = currentIndexes[stayId]
        console.log(dotCycle);

        if (currentIndex >= 3 && currentIndex <= totalImages - 4) {
            return `translateX(${-dotCycle}px)`;
        }
        else if (currentIndex > (totalImages - 5))
            return `translateX(${-dotCycle}px)`;
    }

    return (
        <div className="stay-carousel"
            onMouseEnter={() =>
                setIsHovered(stayId)
            }
            onMouseLeave={() =>
                setIsHovered(null)
            }>

            <div className="add-to-favorites">
                {isGuestFavorite &&
                    <div className="guest-favorite">
                        <p>Guest favorite</p>
                    </div>}

                <div className="heart-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" id="heart" viewBox="0 0 29 29">
                        <path d="M14.854 6.083l-.354.353-.354-.354a6.5 6.5 0 00-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 00-9.192-9.191z"></path>
                    </svg>
                </div>
            </div>

            <AnimatePresence>
                {isHovered === stayId &&
                    <motion.div className="arrows"
                        key="arrows"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: { duration: 0.1 },

                        }}
                    >
                        <div className={currentIndexes[stayId] === 0 ? 'hide' : ''}
                            onClick={() => handleArrowClick('left')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="left-arrow">
                                <path d="M8.5 12.8l5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6z"></path>
                            </svg>
                        </div>

                        <div className={currentIndexes[stayId] === stayImages.additional.length - 1 ? 'hide' : ''}
                            onClick={() => handleArrowClick('right')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow">
                                <path d="M15.54 11.29L9.88 5.64a1 1 0 00-1.42 0 1 1 0 000 1.41l4.95 5L8.46 17a1 1 0 000 1.41 1 1 0 00.71.3 1 1 0 00.71-.3l5.66-5.65a1 1 0 000-1.41z"></path>
                            </svg>
                        </div>
                    </motion.div>}
            </AnimatePresence>


            <div className={`carousel ${slideDirection}`} style={{ transform: `translateX(-${currentIndexes[stayId] * 100}%)` }}>
                <img src={stayImages.picture_url} alt="Stay Image"></img>
                {stayImages.additional.map(image => {
                    return (
                        <img key={image} src={image} alt="Stay Image"></img>
                    )
                })}
            </div>

            <div className="carousel-dots">
                <div className="dots-container" style={{ transform: dotTransform() }}>
                    {Array.from({ length: 3 * stayImages.additional.length }).map((_, index) => (
                        <div key={index} className={`${getDotClass(index)}`}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}