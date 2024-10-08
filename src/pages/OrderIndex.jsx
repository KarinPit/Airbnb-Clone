import React, { useState, useEffect, useRef } from 'react';
import { createSearchParams, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { format, intervalToDuration } from 'date-fns';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { getDateName } from '../utils/CalendarUtils.jsx';
import { login, logout, signup } from '../store/actions/user.actions.js';
import { saveOrder } from '../store/actions/order.actions.js';
import { stayService } from '../services/stay.service';
import { LoginSignup } from '../cmps/Header/LoginSingup.jsx';
import { calcDaysBetweenDates } from '../utils/CalendarUtils.jsx';
import { setFilterBy } from '../store/actions/filter.actions.js';
import { OrderIndexMobile } from './OrderIndexMobile.jsx';
import CalendarPicker from '../cmps/Header/FilterStay/Modal/CalendarPicker/CalendarPicker.jsx';
import { WhoModal } from '../cmps/Header/FilterStay/Modal/WhoModal.jsx';

import { LeftArrow } from '../cmps/SVG/HeaderSvg.jsx'
import { useDispatch, useSelector } from 'react-redux';


export function OrderIndex() {
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
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const isOpenModal = useSelector(storeState => storeState.filterModule.isOpenModal);
    const dispatch = useDispatch()


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
            hostId: currentStay.host.host_id,
            buyer: {
                _id: loggedUser.id,
                fullname: loggedUser.fullname
            },
            totalPrice: totalPrice,
            totalDays: totalDays,
            checkIn: filterBy.checkIn,
            checkOut: filterBy.checkOut,
            guests: filterBy.who,
            stay: {
                _id: currentStay._id,
                name: currentStay.name,
                price: currentStay.price.$numberDecimal,
                address: currentStay.address,
                images: currentStay.images
            },
            message: "",
            status: "pending"
        }

        saveOrder(order);
        navigate(`/profile/${loggedUser.id}/buyer`);
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

    function handleEditClick(input) {
        dispatch({ type: 'SET_OPEN_MODAL', isOpenModal: input })
    }

    if (!currentStay) return ''


    return (
        isWideScreen ? <>
            <div className="order-preview">
                <NavLink to={{
                    pathname: `/stay/${stayId}`,
                    search: `?${createSearchParams({ ...stayService.sanitizeFilterParams(filterBy) })}`
                }}>
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

                                <button
                                    onClick={() => { handleEditClick('dates') }}>Edit
                                </button>
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

                                <button
                                    onClick={() => { handleEditClick('who') }}>Edit
                                </button>
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

                        {loggedUser ? <button className="confirm-btn" onClick={createOrder}>Confirm and pay</button>
                            : <div className='login-menu'>
                                <h3>Log in or sign up to book</h3>
                                <LoginSignup onLogin={onLogin} onSignup={onSignup} isOrderPreview={true} />
                            </div>}
                    </div>

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
                                <p><span>{stayService.calcGeneralScore(currentStay)}</span> ({currentStay.reviews.length} reviews)</p>
                            </div>
                        </div>
                    </div>

                    <div className="stay-info">
                        <div className='stay-info-container'>
                            <div className='stay-info-container-title'>
                                <p>Price details</p>
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
            </div>

            <div className='modals'>
                {isOpenModal === 'dates' ?
                    <CalendarPicker disableOverlay={true} /> : ''}
                {isOpenModal === 'who' ? <WhoModal /> : ''}
            </div>

        </> : <OrderIndexMobile />

    );
}
