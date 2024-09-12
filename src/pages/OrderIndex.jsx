

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { saveOrder } from '../store/actions/order.actions.js';
import { stayService } from '../services/stay.service';
import { LoginSignup } from '../cmps/Header/LoginSingup.jsx';

import { LeftArrow } from '../cmps/SVG/HeaderSvg.jsx'
import { circleSelect, circleSelected } from '../services/svg.service.jsx'


export function OrderIndex() {
    const [currentOrder, setCurrentOrder] = useState(JSON.parse(localStorage.getItem('currentOrder')));
    const [currentStay, setCurrentStay] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const imgRef1 = useRef(null);
    const imgRef2 = useRef(null);
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
        setSelectedPayment((prevSelected) => {
            if (prevSelected === ref.current.className) {
                return null;
            } else {
                if (imgRef1.current) imgRef1.current.src = circleSelect;
                if (imgRef2.current) imgRef2.current.src = circleSelect;
                ref.current.src = circleSelected;
                return ref.current.className;
            }
        });
    }

    if (!currentStay) return '';

    return (
        <div className="order-preview">
            <div className="order-summary">
                <NavLink to={`/stay/${stayId}`}>
                    <img src={LeftArrow} alt="Back" />
                </NavLink>
                <div className="trip-summary">
                    <h2>Confirm and pay</h2>
                    <div className="trip-details">
                        <h3>Your trip</h3>
                        <div className='trip-info'>
                            <div>
                                {currentOrder?.range?.start && currentOrder?.range?.end ?
                                    <>
                                        <p><strong>Dates</strong>: {format(new Date(currentOrder.range.start), 'd.MM.yyyy')} - {format(new Date(currentOrder.range.end), 'd.MM.yyyy')}</p>
                                        {/* <button>Edit</button> */}
                                    </> : ''}
                                {currentOrder?.guests ?
                                    <>
                                        <p><strong>Guests</strong>: {Object.entries(currentOrder.guests)
                                            .filter(([key, count]) => count > 0)
                                            .map(([key, count]) => `${count} ${key}`)
                                            .join(', ')}</p>
                                        {/* <button>Edit</button> */}
                                    </> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="payment-summary">
                        <h3>Choose how to pay</h3>
                        <br></br>
                        <div>
                            <div className={`payment-option ${selectedPayment === 'pay-now' ? 'selected' : ''}`}>
                                <p><strong>Pay the full price now</strong></p>
                                <button onClick={() => onSelectPayment(imgRef1)}>
                                    <img className="pay-now" ref={imgRef1} src={circleSelect} alt="Pay Now" />
                                </button>
                            </div>
                            <div className={`payment-option ${selectedPayment === 'pay-later' ? 'selected' : ''}`}>
                                <div>
                                    <p><strong>Pay part now, part later</strong></p>
                                    {/* <p>$774.09 due today, $774.09 on Jun 20, 2024. No extra fees.</p> */}
                                </div>
                                <button onClick={() => onSelectPayment(imgRef2)}>
                                    <img className="pay-later" ref={imgRef2} src={circleSelect} alt="Pay Later" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {loggedUser ? <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button> : <div className='login-menu'>
                        <h3>Log in or sign up to book</h3>
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={true} />
                    </div>}
                </div>
            </div>
            <div className="order-details">
                <div className="stay-details">
                    <img src={currentStay.images.picture_url} alt={currentStay.name} />
                    <div className='stay-detail-container'>
                        <p className='stay-name'>{currentStay.name}</p>
                        <p className='stay-type'> {currentStay.type}</p>
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
    );
}
