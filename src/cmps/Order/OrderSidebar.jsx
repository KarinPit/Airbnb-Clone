import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, Link } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';
import { stayService } from '../../services/stay.service';
import CalendarPicker from "../Header/FilterStay/Modal/CalendarPicker/CalendarPicker"
import { WhoModal } from "../Header/FilterStay/Modal/WhoModal"


export function OrderSidebar({ stay }) {
    const filterBy = useSelector(storeState => storeState.filterModule.filterBy);
    const isOpenModal = useSelector(storeState => storeState.filterModule.isOpenModal);
    const dispatch = useDispatch()
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

    function handleInputClick(input) {
        dispatch({ type: 'SET_OPEN_MODAL', isOpenModal: input })
    }

    return (
        <div className="book-it-sidebar">
            {filterBy.checkIn && filterBy.checkOut ?
                <h2>${stay && Math.round(stay.price.$numberDecimal)} <span>night</span></h2>
                : <h2>Add dates for prices</h2>}

            <form>
                <div className='calendar-inputs'>
                    <div className="check-in"
                        onClick={() => { handleInputClick('check-in') }}
                    >
                        <p>CHECK-IN</p>
                        <input
                            className="check-in"
                            placeholder={filterBy.checkIn ? format(filterBy.checkIn, 'dd/MM/yyyy') : "Add date"}
                            value={filterBy.checkIn ? format(filterBy.checkIn, 'dd/MM/yyyy') : 'Add date'}
                            readOnly
                        />
                        {isOpenModal === 'check-in' || isOpenModal === 'check-out' ? <CalendarPicker disableOverlay={true} /> : ''}
                    </div>

                    <div className="check-out"
                        onClick={() => { handleInputClick('check-out') }}
                    >
                        <p>CHECK-OUT</p>
                        <input
                            placeholder={filterBy.checkOut ? format(filterBy.checkOut, 'dd/MM/yyyy') : "Add date"}
                            value={filterBy.checkOut ? format(filterBy.checkOut, 'dd/MM/yyyy') : 'Add date'}
                            readOnly
                        />
                    </div>
                </div>

                <div className="guests"
                    onClick={() => { handleInputClick('who') }}
                >
                    <p>GUESTS</p>
                    <input
                        placeholder="Add guests"
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
                    {isOpenModal === 'who' ? <WhoModal /> : ''}
                </div>
            </form>

            <Link to={{
                pathname: `/stay/${stay._id}/confirm-order`,
                search: `?${createSearchParams({ ...stayService.sanitizeFilterParams(filterBy) })}`
            }}>
                <button
                    style={{
                        backgroundPositionX: `${100 - mousePosition.x}%`,
                        backgroundPositionY: `${100 - mousePosition.y}%`
                    }}
                    onClick={(event) => {

                        if (filterBy.checkIn === '' || filterBy.checkOut === '' || filterBy.who.totalCount === 0) {
                            event.preventDefault();
                        }
                        dispatch({ type: 'SET_OPEN_MODAL', isOpenModal: false })
                    }}
                    onMouseMove={handleMouseMove}
                >
                    Reserve
                </button>
            </Link>

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
