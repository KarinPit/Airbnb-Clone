import React, { useState, useEffect, useRef } from 'react';
import { createSearchParams, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getDateName } from '../utils/CalendarUtils.jsx';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { saveOrder } from '../store/actions/order.actions.js';
import { stayService } from '../services/stay.service.js';
import { LoginSignup } from '../cmps/Header/LoginSingup.jsx';
import { calcDaysBetweenDates } from '../utils/CalendarUtils.jsx';
import { setFilterBy } from '../store/actions/filter.actions.js';

import { LeftArrow } from '../cmps/SVG/HeaderSvg.jsx'
import { useSelector } from 'react-redux';


export function OrderIndexMobile() {
    const [currentOrder, setCurrentOrder] = useState(JSON.parse(localStorage.getItem('currentOrder')));
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [currentStay, setCurrentStay] = useState(null);
    const loggedUser = useSelector((storeState) => storeState.userModule.user)
    const [selectedPayment, setSelectedPayment] = useState(null);
    const svgRef1 = useRef(null);
    const svgRef2 = useRef(null);
    const { stayId } = useParams();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalDays, setTotalDays] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setFilterBy(stayService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        const newParams = stayService.sanitizeFilterParams(filterBy);
        setSearchParams((prev) => ({ ...prev, ...newParams }));
    }, [filterBy]);

    useEffect(() => {
        // setLoggedUser(sessionStorage.loggedinUser ? JSON.parse(sessionStorage.loggedinUser) : null);

        stayService.getById(stayId)
            .then((stay) => {
                setCurrentStay(stay);
            })
            .catch((err) => {
                console.log('Error loading current stay in order preview', err);
            });

    }, []);

    useEffect(() => {
        if (currentStay) {
            const calcDays = calcDaysBetweenDates(filterBy.checkIn, filterBy.checkOut)
            const calcPrice = calcDays * currentStay.price.$numberDecimal
            setTotalDays(calcDays)
            setTotalPrice(calcPrice)
        }
    }, [currentStay, filterBy.checkIn, filterBy.checkOut])


    function createOrder() {
        const order = {
            hostId: currentStay.host._id,
            buyer: {
                _id: loggedUser._id,
                fullname: loggedUser.fullname,
            },
            totalPrice: currentStay.price * intervalToDuration({
                start: new Date(currentOrder.range.start),
                end: new Date(currentOrder.range.end)
            }).days - cleaningFee - airbnbFee,
            startDate: currentOrder.range.start,
            endDate: currentOrder.range.end,
            guests: { ...currentOrder.guests },
            stay: {
                _id: currentStay._id,
                name: currentStay.name,
                price: currentStay.price,
            },
            msgs: [],
            status: "pending",
        };

        console.log(order);

        saveOrder(order);
        navigate(`/profile/buyer/${loggedUser._id}`);
    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials);
            showSuccessMsg(`Welcome: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot login');
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials);
            showSuccessMsg(`Welcome new user: ${user.fullname}`);
        } catch (err) {
            showErrorMsg('Cannot signup');
        }
    }

    async function onLogout() {
        try {
            await logout();
            showSuccessMsg(`Bye now`);
        } catch (err) {
            showErrorMsg('Cannot logout');
        }
    }

    function onSelectPayment(ref) {
        setSelectedPayment(prev => {
            return ref.current.className
        })
    }

    if (!currentStay) return ''


    return (
        <>
            <div className="order-preview">

                <NavLink to={{
                    pathname: `/stay/${stayId}`,
                    search: `?${createSearchParams({ ...stayService.sanitizeFilterParams(filterBy) })}`
                }}>
                    <LeftArrow />
                </NavLink>

                <h2>Request to book</h2>

                <div className="trip-summary">

                    <div className="stay-details">
                        <div>
                            <img src={currentStay.images.picture_url} alt={currentStay.name} />
                            <div className='stay-detail-container'>
                                <p className='stay-name'>{currentStay.name} in {currentStay.address.market}, {currentStay.address.country}</p>
                                <p className='stay-type'> {currentStay.property_type}</p>
                                <div className='stay-review-container'>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 32 32"
                                        aria-hidden="true"
                                        role="presentation"
                                        focusable="false"
                                        display="block"
                                        height="12px"
                                        width="12px"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z">
                                        </path>
                                    </svg>
                                    <p><span>{stayService.calcGeneralScore(currentStay)}</span> ({currentStay.reviews.length} reviews)</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p>
                                <span>Free cancellation before Nov 6.</span> Get a full refund if you change your mind.
                            </p>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="calendar">
                                    <path d="M12,14a1,1,0,1,0-1-1A1,1,0,0,0,12,14Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,14Zm-5,4a1,1,0,1,0-1-1A1,1,0,0,0,12,18Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,18ZM7,14a1,1,0,1,0-1-1A1,1,0,0,0,7,14ZM19,4H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20ZM20,8H4V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1ZM7,18a1,1,0,1,0-1-1A1,1,0,0,0,7,18Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="trip-details">
                        <h3>Your trip</h3>

                        <div className="dates">
                            <div>
                                <p>Dates</p>
                                <p>{filterBy.checkIn && filterBy.checkOut && getDateName(filterBy.checkIn, filterBy.checkOut)}</p>
                            </div>
                            <button>Edit</button>
                        </div>

                        <div className="guests">
                            <div>
                                <p>Guests</p>
                                <p>{filterBy.who && Object.entries(filterBy.who)
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
                                    .join(', ')}</p>
                            </div>
                            <button>Edit</button>
                        </div>
                    </div>

                    <div className="payment-summary">
                        <h3>Choose how to pay</h3>

                        <div className='payment-options'>
                            <div className={`payment-option ${selectedPayment === 'pay-now' ? 'selected' : ''}`}>
                                <p>Pay the full price now</p>

                                <button className="pay-now" ref={svgRef1} onClick={() => onSelectPayment(svgRef1)}>
                                    {selectedPayment === "pay-now" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" id="circle">
                                            <path d="M16 4C9.372 4 4 9.372 4 16s5.372 12 12 12 12-5.372 12-12S22.628 4 16 4zm0 22c-5.514 0-10-4.486-10-10S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10zm-6-10a6 6 1080 1 0 12 0 6 6 1080 1 0-12 0z"></path>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 30" id="circle">
                                            <circle cx="18" cy="16" r="12" stroke="#000" strokeWidth="2"></circle>
                                        </svg>}
                                </button>
                            </div>
                            <div className={`payment-option ${selectedPayment === 'pay-later' ? 'selected' : ''}`}>

                                <p>Pay part now, part later</p>
                                {/* <p>$774.09 due today, $774.09 on Jun 20, 2024. No extra fees.</p> */}


                                <button className="pay-later" ref={svgRef2} onClick={() => onSelectPayment(svgRef2)}>
                                    {selectedPayment === "pay-later" ?
                                        <svg xmlns="http://www.w3.org/2000/svg" id="circle">
                                            <path d="M16 4C9.372 4 4 9.372 4 16s5.372 12 12 12 12-5.372 12-12S22.628 4 16 4zm0 22c-5.514 0-10-4.486-10-10S10.486 6 16 6s10 4.486 10 10-4.486 10-10 10zm-6-10a6 6 1080 1 0 12 0 6 6 1080 1 0-12 0z"></path>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 30" id="circle">
                                            <circle cx="18" cy="16" r="12" stroke="#000" strokeWidth="2"></circle>
                                        </svg>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="order-details">
                        <div className="stay-info">
                            <div className='stay-info-container'>
                                <div className='stay-info-container-title'>
                                    <h3>Price details</h3>
                                </div>

                                {filterBy.checkIn && filterBy.checkOut ?
                                    <div className='stay-info-price-container'>
                                        <div>
                                            <p>${Math.round(currentStay.price.$numberDecimal)} x {`${totalDays === 1 ? '1 night' : `${totalDays} nights`}`}
                                            </p>
                                            <p>${Math.round(currentStay.price.$numberDecimal) * totalDays}</p>
                                        </div>

                                        <div>
                                            <p>Cleaning fee</p>
                                            <p>${Math.round(currentStay.cleaning_fee.$numberDecimal)}</p>
                                        </div>

                                        <div>
                                            <p>Airbnb service fee</p>
                                            <p>${Math.round(totalPrice * 0.03)}</p>
                                        </div>

                                        <div>
                                            <p>Total (USD)</p>
                                            <p>${currentStay.price.$numberDecimal * totalDays + Math.round(totalPrice * 0.03) + Math.round(currentStay.cleaning_fee.$numberDecimal)}</p>
                                        </div>
                                    </div> : ''}
                            </div>
                        </div>
                    </div>

                    {loggedUser ? <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button> : <div className='login-menu'>
                        <h3>Log in or sign up to book</h3>
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={true} />
                        {/* <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={true} /> */}
                    </div>}


                </div>


            </div>

        </>
    );
}
