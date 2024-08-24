import React from "react";

export function CardSelect({ option, isSelected, onSelect, className }) {
  const Icon = option.icon;
  return (
    <div
      className={`card-select ${isSelected ? "selected" : ""} ${
        className || ""
      }`}
      onClick={onSelect}
    >
      <span className="card-select__icon-wrapper">
        {typeof Icon === "function" ? (
          <Icon />
        ) : (
          <img src={Icon} alt={option.title} />
        )}
      </span>
      <div className="card-select__information">
        <span className="card-select__title">{option.title}</span>
        {option.info && (
          <span className="card-select__info">{option.info}</span>
        )}
      </div>
    </div>
  );
}
