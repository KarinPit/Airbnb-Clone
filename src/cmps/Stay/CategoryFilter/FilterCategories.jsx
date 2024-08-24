import React, { useEffect, useRef, useState } from "react";
import { ScrollMenu } from "./ScrollMenu";
import { LeftArrowIcon, RightArrowIcon } from "../../../services/svg.service";
import { stayService } from "../../../services/stay.service"

// export function FilterCategories() {
  export function FilterCategories({ onSetFilter, filterBy }) {
  const [images, setImages] = useState([]);
  const labelRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    stayService.fetchImages()
      .then((imgs) => {
        setImages(imgs);
      })
      .catch((error) => console.error("Failed to fetch images:", error));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setTimeout(() => scrollToFocus(filterBy), 0);
    }
  }, [images]);

  const scrollToFocus = (filterBy) => {
    const focusIndex = images.findIndex((image) => image.title === filterBy);

    if (labelRefs.current[focusIndex]) {
      const labelElement = labelRefs.current[focusIndex];
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        const labelPosition =
          labelElement.getBoundingClientRect().left +
          labelElement.offsetWidth -
          scrollContainer.getBoundingClientRect().left -
          scrollContainer.offsetWidth +
          scrollContainer.scrollLeft;

        scrollContainer.scrollTo({
          left: labelPosition + 60,
          behavior: "auto",
        });
      }
    }
  };

  useEffect(() => {
    labelRefs.current = images.map(
      (_, i) => labelRefs.current[i] || React.createRef()
    );
  }, [images.length]);

  const handleClick = (title) => {
    onSetFilter({ category_tag: title });
  };
  return (
    <ScrollMenu
      RightIcon={RightArrowIcon}
      LeftIcon={LeftArrowIcon}
      scrollRef={scrollContainerRef}
    >
      <div className="filter-categories-wrapper full">
        {images.map((image, index) => (
          <label
            key={index}
            ref={(el) => (labelRefs.current[index] = el)}
            className={`filter-categories-label ${filterBy === image.title ? "focused" : ""
              }`}
            tabIndex={0}
            aria-labelledby={`input-${index}`}
            onClick={() => handleClick(image.title)}
          >
            <input
              id={`input-${index}`}
              className="filter-categories-scroller"
              onChange={(e) => handleClick(e)}
            />
            <img
              src={`/assets/img/filter-category/${image.src}`}
              alt={image.alt}
            />
            <span>{image.title}</span>
          </label>
        ))}
      </div>
    </ScrollMenu>
  );
}
