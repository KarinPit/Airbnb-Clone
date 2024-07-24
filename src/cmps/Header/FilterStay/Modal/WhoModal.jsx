import { useState } from "react";

function Counter({ label, description, count, increment, decrement }) {
    return (
        <div className="counter">
            <div className="description">
                <h3>{label}</h3>
                <p>{description}</p>
            </div>

            <div className="amount-controller">
                <p className={`decrease ${count < 1 ? 'disabled' : ''}`} onClick={count > 0 ? decrement : () => { }}>-</p>
                <p className="amount">{count}</p>
                <p className="increase" onClick={increment}>+</p>
            </div>
        </div>
    );
}

export function WhoModal() {
    const [adultCount, setAdultCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [petCount, setPetCount] = useState(0);

    const increment = (setter) => () => setter(prev => prev + 1);
    const decrement = (setter, count) => () => setter(prev => prev - 1);

    return (
        <div className="who-modal">
            <Counter
                label="Adults"
                description="Ages 13 or above"
                count={adultCount}
                increment={increment(setAdultCount)}
                decrement={decrement(setAdultCount, adultCount)}
            />
            <Counter
                label="Children"
                description="Ages 2 - 12"
                count={childrenCount}
                increment={increment(setChildrenCount)}
                decrement={decrement(setChildrenCount, childrenCount)}
            />
            <Counter
                label="Infants"
                description="Under 2"
                count={infantCount}
                increment={increment(setInfantCount)}
                decrement={decrement(setInfantCount, infantCount)}
            />
            <Counter
                label="Pets"
                description={<span>Bringing a service animal?</span>}
                count={petCount}
                increment={increment(setPetCount)}
                decrement={decrement(setPetCount, petCount)}
            />
        </div>
    );
}