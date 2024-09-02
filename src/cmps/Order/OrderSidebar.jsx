import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, isValid, intervalToDuration } from 'date-fns';

export function OrderSidebar({ currentOrder }) {
    const stay = useSelector(storeState => storeState.stayModule.stay);
    const cleaningFee = 10;
    const airbnbFee = 25;

    function formatDate(type) {
        const date = currentOrder?.range[type];
        if (!date || !isValid(new Date(date))) {
            return ''; // Return an empty string if the date is not set or invalid
        }
        return String(format(new Date(date), 'dd.MM.yyyy'));
    }

    return (
        <div className="book-it-sidebar">
            {/* <h2>${stay.price}<span> night</span></h2> */}
            <form>
                <input
                    className="check-in"
                    placeholder={currentOrder?.range?.start ? formatDate('start') : "CHECK-IN"}
                    value={currentOrder?.range?.start ? formatDate('start') : 'CHECK-IN'}
                    readOnly
                />
                <input
                    className="check-out"
                    placeholder={currentOrder?.range?.end ? formatDate('end') : "CHECK-OUT"}
                    value={currentOrder?.range?.end ? formatDate('end') : 'CHECK-OUT'}
                    readOnly
                />
                <input className="guests" placeholder="GUESTS"
                    value={currentOrder?.guests ? Object.entries(currentOrder.guests)
                        .filter(([key, count]) => count > 0)
                        .map(([key, count]) => `${count} ${key}`)
                        .join(', ') : ''}
                    readOnly
                />
            </form>
            {/* <Link to={`/order/${stay._id}`}> */}
                <button>Reserve</button>
            {/* </Link> */}
            <p>You won't be charged yet</p>
            <div className="price-calc">
                <div className="net-price">
                    {currentOrder?.range?.start && currentOrder?.range?.end ?
                        <>
                            <p>${stay.price} x {intervalToDuration({ start: new Date(currentOrder.range.start), end: new Date(currentOrder.range.end) }).days} nights</p>
                            <p>${stay.price * intervalToDuration({ start: new Date(currentOrder.range.start), end: new Date(currentOrder.range.end) }).days}</p>
                        </> : ''}
                </div>
                <div className="cleaning-fee">
                    <p>Cleaning fee</p>
                    <p>${cleaningFee}</p>
                </div>
                <div className="service-fee">
                    <p>Airbnb service fee</p>
                    <p>${airbnbFee}</p>
                </div>
            </div>
            <div className="total-price">
                <p>Total</p>
                {currentOrder?.range?.start && currentOrder?.range?.end ?
                    <p>${stay.price * intervalToDuration({
                        start: new Date(currentOrder.range.start),
                        end: new Date(currentOrder.range.end)
                    }).days - cleaningFee - airbnbFee}</p> : '$0'}
            </div>
        </div>
    );
}
