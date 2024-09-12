import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

export function OrderSidebar({ stay }) {
    const filterBy = useSelector(storeState => storeState.filterModule.filterBy);
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalDays, setTotalDays] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })


    useEffect(() => {
        const calcDays = intervalToDuration({ start: new Date(filterBy.checkIn), end: new Date(filterBy.checkOut) })

        if (Object.keys(calcDays).length === 0) {
            setTotalDays(0)
        }
        else {
            const calcPrice = calcDays.days * stay.price.$numberDecimal
            setTotalDays(calcDays.days)
            setTotalPrice(calcPrice)
        }

    }, [filterBy.checkIn, filterBy.checkOut])


    function handleMouseMove(e) {
        const rect = e.target.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width * 100
        const y = (e.clientY - rect.top) / rect.height * 100

        setMousePosition({ x, y })
    }

    return (
        <div className="book-it-sidebar">
            {filterBy.checkIn && filterBy.checkOut ?
                <h2>${stay && Math.round(stay.price.$numberDecimal)} <span>night</span></h2>
                : <h2>Add dates for prices</h2>}

            <form>
                <input
                    className="check-in"
                    placeholder={filterBy.checkIn ? format(filterBy.checkIn, 'dd.MM.yyyy') : "CHECK-IN"}
                    value={filterBy.checkIn ? format(filterBy.checkIn, 'dd.MM.yyyy') : 'CHECK-IN'}
                    readOnly
                />
                <input
                    className="check-out"
                    placeholder={filterBy.checkOut ? format(filterBy.checkOut, 'dd.MM.yyyy') : "CHECK-OUT"}
                    value={filterBy.checkOut ? format(filterBy.checkOut, 'dd.MM.yyyy') : 'CHECK-OUT'}
                    readOnly
                />
                <input
                    className="guests"
                    placeholder="GUESTS"
                    value={filterBy.who ? Object.entries(filterBy.who)
                        .filter(([key, count]) => key !== 'adults' && key !== 'children' && count > 0)
                        .map(([key, count]) => {
                            let label = key;
                            if (count === 1) {
                                if (key === 'infants') label = 'infant';
                                if (key === 'pets') label = 'pet';
                            } else {
                                if (key === 'infants') label = 'infants';
                                if (key === 'pets') label = 'pets';
                            }
                            return `${count} ${label === 'totalCount' ? 'guests' : label}`;
                        })
                        .join(', ') : ''}
                    readOnly
                />
            </form>

            {/* <Link to={`/order/${stay._id}`}> */}
            <button style={{
                backgroundPositionX: `${100 - mousePosition.x}%`,
                backgroundPositionY: `${100 - mousePosition.y}%`
            }}
                onMouseMove={handleMouseMove}>Reserve</button>
            {/* </Link> */}

            <p>You won't be charged yet</p>
            <div className="price-calc">
                <div className="net-price">
                    {filterBy.checkIn && filterBy.checkOut ?
                        <>
                            <p>${stay.price.$numberDecimal} x {totalDays} nights</p>
                            <p>${stay.price.$numberDecimal * totalDays}</p>
                        </> : ''}
                </div>

                <div className="cleaning-fee">
                    <p>Cleaning fee</p>
                    <p>${Math.round(stay.cleaning_fee.$numberDecimal)}</p>
                </div>

                <div className="service-fee">
                    <p>Airbnb service fee</p>
                    <p>${Math.round(totalPrice * 0.03)}</p>
                </div>
            </div>

            <div className="total-price">
                <p>Total</p>
                {filterBy.checkIn && filterBy.checkOut ?
                    <p>${totalPrice + Math.round(totalPrice * 0.03) + Math.round(stay.cleaning_fee.$numberDecimal)}</p> : '$0'}
            </div>
        </div>
    );
}
