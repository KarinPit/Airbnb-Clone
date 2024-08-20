import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { stayService } from "../../../../services/stay.service"
import { setFilterBy } from "../../../../store/actions/filter.actions";


function Counter({ label, description, count, increment, decrement, isDisabled }) {
    return (
        <div className="counter">
            <div className="description">
                <h3>{label}</h3>
                <p>{description}</p>
            </div>

            <div className="amount-controller">
                <p
                    className={`decrease ${count < 1 || isDisabled ? 'disabled' : ''}`}
                    onClick={!isDisabled && count > 0 ? decrement : undefined}
                > - </p>
                <p className="amount">{count}</p>
                <p className="increase" onClick={increment}>+</p>
            </div>
        </div>
    );
}

export function WhoModal() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy.who)
    const [searchParams, setSearchParams] = useSearchParams()


    // useEffect(() => {
    //     setSearchParams(stayService.sanitizeFilterParams(filterBy))
    // }, [filterBy.who])

    useEffect(() => {
        checkIsAdultDisabled();
        setFilterBy({ who: filterByToEdit });
    }, [filterByToEdit]);

    function checkIsAdultDisabled() {
        return filterByToEdit.adults === 1 &&
            (filterByToEdit.children > 0 ||
                filterByToEdit.infants > 0 ||
                filterByToEdit.pets > 0);
    };

    function onIncrease(label) {
        setFilterByToEdit((prev) => {
            const newValues = { ...prev };
            if (label !== 'adults' && prev.adults === 0) {
                newValues.adults += 1;
                newValues.totalCount += 1;
            }
            newValues[label] += 1;
            if (label !== 'infants' && label !== 'pets') {
                newValues.totalCount += 1;
            }
            return newValues;
        });
    };

    function onDecrease(label) {
        setFilterByToEdit((prev) => {
            if (prev[label] <= 0) return prev;

            const newValues = { ...prev };
            if (label === 'adults' && checkIsAdultDisabled()) return prev;

            newValues[label] -= 1;
            if (label !== 'infants' && label !== 'pets') {
                newValues.totalCount -= 1;
            }
            return newValues;
        });
    };

    return (
        <div className="who-modal">
            <Counter
                label="Adults"
                description="Ages 13 or above"
                count={filterByToEdit.adults}
                increment={() => onIncrease("adults")}
                decrement={() => onDecrease("adults")}
                isDisabled={checkIsAdultDisabled()}
            />
            <Counter
                label="Children"
                description="Ages 2 - 12"
                count={filterByToEdit.children}
                increment={() => onIncrease("children")}
                decrement={() => onDecrease("children")}
            />
            <Counter
                label="Infants"
                description="Under 2"
                count={filterByToEdit.infants}
                increment={() => onIncrease("infants")}
                decrement={() => onDecrease("infants")}
            />
            <Counter
                label="Pets"
                description={<span>Bringing a service animal?</span>}
                count={filterByToEdit.pets}
                increment={() => onIncrease("pets")}
                decrement={() => onDecrease("pets")}
            />
        </div>
    );
}