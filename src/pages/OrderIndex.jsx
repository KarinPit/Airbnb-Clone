import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getDateName } from '../utils/CalendarUtils.jsx';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { saveOrder } from '../store/actions/order.actions.js';
import { stayService } from '../services/stay.service';
import { LoginSignup } from '../cmps/Header/LoginSingup.jsx';

import { LeftArrow } from '../cmps/SVG/HeaderSvg.jsx'
import { useSelector } from 'react-redux';


export function OrderIndex() {
    const [currentOrder, setCurrentOrder] = useState(JSON.parse(localStorage.getItem('currentOrder')));
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [currentStay, setCurrentStay] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const svgRef1 = useRef(null);
    const svgRef2 = useRef(null);
    const { stayId } = useParams();
    const navigate = useNavigate();
    const cleaningFee = 10;
    const airbnbFee = 25;

    useEffect(() => {
        setLoggedUser(sessionStorage.loggedinUser ? JSON.parse(sessionStorage.loggedinUser) : null);

        stayService.getById(stayId)
            .then((stay) => {
                setCurrentStay(stay);
            })
            .catch((err) => {
                console.log('Error loading current stay in order preview', err);
            });

    }, [stayId]);


    // function handleReserve() {
    //   setCurrentOrder(prevOrder => {
    //     const updatedOrder = {
    //       ...prevOrder,
    //       stayId: currentStay._id
    //     };
    //     localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
    //     return updatedOrder;
    //   });
    // }

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
            setLoggedUser(user);
        } catch (err) {
            showErrorMsg('Cannot login');
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials);
            showSuccessMsg(`Welcome new user: ${user.fullname}`);
            setLoggedUser(user);
        } catch (err) {
            showErrorMsg('Cannot signup');
        }
    }

    async function onLogout() {
        try {
            await logout();
            showSuccessMsg(`Bye now`);
            setLoggedUser(null);
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
                {/* <div className="order-summary"> */}

                <NavLink to={`/stay/${stayId}`}>
                    <LeftArrow />
                </NavLink>

                <h2>Request to book</h2>

                <div className="trip-summary">
                    <div>

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

                        {loggedUser ? <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button> : <div className='login-menu'>
                            <h3>Log in or sign up to book</h3>
                            <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={true} />
                        </div>}
                    </div>
                    {/* </div> */}

                </div>

                <div className="order-details">
                    <div className="stay-details">
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
                                <p>{stayService.calcGeneralScore(currentStay)}</p>
                                {/* <p className='stay-reviews'>{currentStay.avgRating.toFixed(1)} ({currentStay.reviews.length} reviews)</p> */}
                            </div>
                        </div>
                    </div>

                    <div className="stay-info">
                        <div className='stay-info-container'>
                            <div className='stay-info-container-title'>
                                <p>Price details</p>
                            </div>

                            {currentOrder?.range?.start && currentOrder?.range?.end ?
                                <div className='stay-info-price-container'>
                                    <p>Accommodation: ${currentStay.price * intervalToDuration({
                                        start: new Date(currentOrder.range.start),
                                        end: new Date(currentOrder.range.end)
                                    }).days}</p>
                                    <p>Taxes: ${cleaningFee + airbnbFee}</p>
                                    <p>Total: ${currentStay.price * intervalToDuration({
                                        start: new Date(currentOrder.range.start),
                                        end: new Date(currentOrder.range.end)
                                    }).days - cleaningFee - airbnbFee}</p>
                                </div> : ''}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
