import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ImageCarousel({ stayImages, isGuestFavorite, stayId }) {
    const [currentIndexes, setCurrentIndexes] = useState({ [stayId]: 0 });
    const [isHovered, setIsHovered] = useState(null);
    const [slideDirection, setSlideDirection] = useState("");
    const [dotCycle, setDotCycle] = useState(0);
    const totalImages = stayImages.additional.length;

    const updateDotCycle = (direction) => {
        return direction === "right"
            ? (currentIndexes[stayId] < 2 ? 0 : dotCycle + 18)
            : (dotCycle > 18 ? dotCycle - 18 : 0);
    };

    const handleArrowClick = (direction) => {
        const newIndex = direction === "right"
            ? Math.min(currentIndexes[stayId] + 1, totalImages - 1)
            : Math.max(currentIndexes[stayId] - 1, 0);

        setSlideDirection(direction);
        setCurrentIndexes((prev) => ({ ...prev, [stayId]: newIndex }));
        setDotCycle(updateDotCycle(direction));
    };

    const getDotClass = (index) => {
        const currentIndex = currentIndexes[stayId];

        if (currentIndex < 3) {
            return `${currentIndex === index ? "active-dot" : ""} ${index >= 3 ? "shrinked-dot" : ""}`;
        } else if (currentIndex >= 3 && currentIndex <= totalImages - 3) {
            const activeDotIndex = 2 * (dotCycle / 18) + 2;
            return `${index === activeDotIndex ? "active-dot" : ""} ${Math.abs(index - activeDotIndex) === 2 ? "shrinked-dot" : ""}`;
        } else {
            if (totalImages <= 5) {
                return `${index === currentIndex ? "active-dot" : ""} ${Math.abs(index) === 2 ? "shrinked-dot" : ""}`;
            }
            else {
                const dotsIndex = 2 * (dotCycle / 18)
                const toAdd = (dotCycle / 18 % 2) === 0 ? dotsIndex + 1 : dotsIndex
                return `${index === toAdd ? "active-dot" : ""} ${Math.abs(index) === 2 ? "shrinked-dot" : ""}`;
            }
        }
    };

    const dotTransform = () => {
        const currentIndex = currentIndexes[stayId];

        if (currentIndex >= 3 && currentIndex <= totalImages - 3) {
            return `translateX(${-dotCycle}px)`;
        } else if (currentIndex >= totalImages - 3) {
            return `translateX(${-dotCycle}px) ; transition: none`;
        } else {
            return "";
        }
    };

    return (
        <div
            className="stay-carousel"
            onMouseEnter={() => setIsHovered(stayId)}
            onMouseLeave={() => setIsHovered(null)}
        >
            <div className="add-to-favorites">
                {isGuestFavorite && (
                    <div className="guest-favorite">
                        <p>Guest favorite</p>
                    </div>
                )}
                <div className="heart-icons">
                    <svg xmlns="http://www.w3.org/2000/svg" id="heart" viewBox="0 0 29 29">
                        <path d="M14.854 6.083l-.354.353-.354-.354a6.5 6.5 0 00-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 00-9.192-9.191z"></path>
                    </svg>
                </div>
            </div>

            <AnimatePresence>
                {isHovered === stayId && (
                    <motion.div
                        className="arrows"
                        key="arrows"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ opacity: { duration: 0.1 } }}
                    >
                        <div
                            className={currentIndexes[stayId] === 0 ? "hide" : ""}
                            onClick={() => handleArrowClick("left")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="left-arrow">
                                <path d="M8.5 12.8l5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6z"></path>
                            </svg>
                        </div>
                        <div
                            className={currentIndexes[stayId] === totalImages - 1 ? "hide" : ""}
                            onClick={() => handleArrowClick("right")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow">
                                <path d="M15.54 11.29L9.88 5.64a1 1 0 00-1.42 0 1 1 0 000 1.41l4.95 5L8.46 17a1 1 0 000 1.41 1 1 0 00.71.3 1 1 0 00.71-.3l5.66-5.65a1 1 0 000-1.41z"></path>
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`carousel ${slideDirection}`} style={{ transform: `translateX(-${currentIndexes[stayId] * 100}%)` }}>
                <img src={stayImages.picture_url} alt="Stay Image" />
                {stayImages.additional.map((image) => (
                    <img key={image} src={image} alt="Stay Image" />
                ))}
            </div>

            <div className="carousel-dots">
                <div className="dots-container" style={{ transform: dotTransform() }}>
                    {Array.from({ length: totalImages * 2 - 1 }).map((_, index) => (
                        <div key={index} className={getDotClass(index)}>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}