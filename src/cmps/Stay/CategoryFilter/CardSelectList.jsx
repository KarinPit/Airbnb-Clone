import React, { useState } from "react";
import { useFormikContext } from "formik";
import { CardSelect } from './CardSelect'

function flattenOptions(options) {
  return options.reduce((acc, optionGroup) => {
    if (optionGroup.items && Array.isArray(optionGroup.items)) {
      const items = optionGroup.items.map((item) => ({
        ...item,
        category: optionGroup.title || optionGroup.category,
      }));
      return [...acc, ...items];
    }
    return [...acc, optionGroup];
  }, []);
}

export function CardSelectList({
  options,
  name,
  multiSelect = false,
  className = "",
}) {
  const { values, setFieldValue } = useState(null)

  const flatOptions = flattenOptions(options);
  const handleSelect = (option) => {
    const currentValues = values[name] || [];

    if (multiSelect) {
      if (currentValues.includes(option.value)) {
        setFieldValue(
          name,
          currentValues.filter((value) => value !== option.value)
        );
      } else {
        setFieldValue(name, [...currentValues, option.value]);
      }
    } else {
      setFieldValue(name, option.value === values[name] ? null : option.value);
    }
  };
  console.log(values);

  return flatOptions.map((option) => (
    <CardSelect
      className={className}
      key={option.title}
      option={option}
      isSelected={
        multiSelect
          ? (values[name] || []).includes(option.value)
          : values[name] === option.value
      }
      onSelect={() => handleSelect(option)}
    />
  ));
}
