import { useEffect, useState } from "react";

import { stayService } from "../services/stay.service"
import { useSelector } from "react-redux";
import { StayDetailsSkeleton } from "../cmps/Stay/Skeletons/StayDetailsSkeleton"
import { MapView } from "../cmps/Stay/MapView"
import { Link, useParams, useSearchParams } from "react-router-dom";
import { differenceInYears, format, intervalToDuration } from "date-fns";
import CalendarPicker from "../cmps/Header/FilterStay/Modal/CalendarPicker/CalendarPicker"
import { OrderSidebar } from "../cmps/Order/OrderSidebar"
import { setFilterBy } from '../store/actions/filter.actions'
import { LeftArrowIcon } from "../services/svg.service";

import chatBoxIcon from "../../public/svg/amenities/chat-box.svg"
import CheckCircleIcon from "../../public/svg/amenities/check-circle.svg"
import KeyIcon from "../../public/svg/amenities/key.svg"
import mapIcon from "../../public/svg/amenities/map.svg"
import priceTagIcon from "../../public/svg/amenities/price-tag.svg"
import sprayerIcon from "../../public/svg/amenities/sprayer.svg"


export function StayDetails() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const [stay, setStay] = useState(null)
    const isLoading = useSelector(storeState => storeState.appModule.isLoading);
    const isWideScreen = useSelector(storeState => storeState.appModule.isWideScreen);
    const { checkIn, checkOut } = useSelector(storeState => storeState.filterModule.filterBy);
    const { stayId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const currentOrder = []


    useEffect(() => {
        setFilterBy(stayService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        const newParams = stayService.sanitizeFilterParams(filterBy);
        setSearchParams((prev) => ({ ...prev, ...newParams }));
    }, [filterBy])

    useEffect(() => {
        stayService.getById(stayId)
            .then((stay) => {
                setStay(stay)
            })
            .catch((err) => {
                console.log('Error loading stay', err);
            })
    }, [stayId])

    const stayAmenities = {
        amenities: [
            { name: 'Garden view', icon: "../../../public/svg/amenities/flower.svg" },
            { name: 'Courtyard view', icon: "../../../public/svg/amenities/flower.svg" },
            { name: 'Backyard', icon: "../../../public/svg/amenities/flower.svg" },
            { name: 'Mountain', icon: "../../../public/svg/amenities/mountain.svg" },
            { name: 'Pool', icon: "../../../public/svg/amenities/pool.svg" },
            { name: 'Doorman', icon: "../../../public/svg/amenities/doorman.svg" },
            { name: 'Heating', icon: "../../../public/svg/amenities/temperature.svg" },
            { name: 'Washer', icon: "../../../public/svg/amenities/washer.svg" },
            { name: 'Elevator', icon: "../../../public/svg/amenities/elevator.svg" },
            { name: 'Dryer', icon: "../../../public/svg/amenities/dryer.svg" },
            { name: 'Smoke detector', icon: "../../../public/svg/amenities/smoke-detector.svg" },
            { name: 'Essentials', icon: "../../../public/svg/amenities/hygiene-kit.svg" },
            { name: 'Fire extinguisher', icon: "../../../public/svg/amenities/extinguisher.svg" },
            { name: 'Shampoo', icon: "../../../public/svg/amenities/shampoo.svg" },
            { name: 'Carbon monoxide detector', icon: "../../../public/svg/amenities/carbon-monoxide-detector.svg" },
            { name: 'Paid parking off premises', icon: "../../../public/svg/amenities/parking.svg" },
            { name: 'Free street parking', icon: "../../../public/svg/amenities/parking.svg" },
            { name: 'Valley view', icon: "../../../public/svg/amenities/mountain.svg" },
            { name: 'Shared beach access – Beachfront', icon: "../../../public/svg/amenities/sunset.svg" },
            { name: 'Wifi', icon: "../../../public/svg/amenities/wifi.svg" },
            { name: 'Buzzer/wireless intercom', icon: "../../../public/svg/amenities/telephone.svg" },
            { name: 'Internet', icon: "../../../public/svg/amenities/internet.svg" },
            { name: 'Family/kid friendly', icon: "../../../public/svg/amenities/family.svg" },
            { name: 'Air conditioning', icon: "../../../public/svg/amenities/snow-flake.svg" },
            { name: 'Wheelchair accessible', icon: "../../../public/svg/amenities/wheelchair.svg" },
            { name: 'Free parking on premises', icon: "../../../public/svg/amenities/car.svg" },
            { name: 'Carbon monoxide alarm', icon: "../../../public/svg/amenities/paw.svg", strike: true },
            { name: 'Sea view', icon: "../../../public/svg/amenities/sunset.svg" },
            { name: 'Hair dryer', icon: "../../../public/svg/amenities/hairdryer.svg" },
            { name: 'Kitchen', icon: "../../../public/svg/amenities/kitchen-utensil.svg" },
            { name: 'Dishes and silverware', icon: "../../../public/svg/amenities/kitchen-utensil.svg" },
            { name: 'Dedicated workspace', icon: "../../../public/svg/amenities/paw.svg" },
            { name: 'TV', icon: "../../../public/svg/amenities/tv.svg" },
            { name: 'Cable TV', icon: "../../../public/svg/amenities/tv.svg" },
            { name: 'Smoking allowed', icon: "../../../public/svg/amenities/smoking.svg" },
            { name: 'Pets allowed', icon: "../../../public/svg/amenities/paw.svg" },
            { name: 'Pets live on this property', icon: "../../../public/svg/amenities/paw.svg" },
            { name: 'Cat(s)', icon: "../../../public/svg/amenities/paw.svg" },
            { name: 'First aid kit', icon: "../../../public/svg/amenities/first-aid.svg" },
            { name: 'Cooking basics', icon: "../../../public/svg/amenities/kitchen-utensil.svg" },
            { name: 'Private hot tub - available all year', icon: "../../../public/svg/amenities/paw.svg" },
            { name: 'Smoke alarm', icon: "../../../public/svg/amenities/paw.svg", strike: true },
            { name: 'Hangers', icon: "../../../public/svg/amenities/hangers.svg" },
            { name: 'Lock on bedroom door', icon: "../../../public/svg/amenities/lock.svg" },
        ]
    }

    if (isLoading || !stay) return <StayDetailsSkeleton />;

    return (
        <>
            <div className="stay-main-area">
                <div className="stay-header">
                    <h1>{stay.name}</h1>
                    <div className="stay-header-actions">
                        <Link>
                            <button className="return">
                                <LeftArrowIcon />
                            </button>
                        </Link>

                        <button className="share">
                            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="share">
                                <path d="M21,12c-0.6,0-1,0.4-1,1v6c0,0.6-0.4,1-1,1H5c-0.6,0-1-0.4-1-1v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6c0,1.7,1.3,3,3,3h14
                                c1.7,0,3-1.3,3-3v-6C22,12.4,21.6,12,21,12z M8.7,7.7L11,5.4V15c0,0.6,0.4,1,1,1s1-0.4,1-1V5.4l2.3,2.3c0.4,0.4,1,0.4,1.4,0
                                c0,0,0,0,0,0c0.4-0.4,0.4-1,0-1.4c0,0,0,0,0,0l-4-4c-0.1-0.1-0.2-0.2-0.3-0.2c-0.2-0.1-0.5-0.1-0.8,0c-0.1,0-0.2,0.1-0.3,0.2l-4,4
                                c-0.4,0.4-0.4,1,0,1.4C7.7,8.1,8.3,8.1,8.7,7.7z"></path>
                            </svg>
                            <p>Share</p>
                        </button>
                        <button className="save">
                            <svg xmlns="http://www.w3.org/2000/svg" id="heart" viewBox="0 0 29 29">
                                <path d="M14.854 6.083l-.354.353-.354-.354a6.5 6.5 0 00-9.192 9.192l.354.354L14.5 24.82l9.192-9.192.354-.354a6.5 6.5 0 00-9.192-9.191z"></path>
                            </svg>
                            <p>Save</p>
                        </button>
                    </div>
                </div>

                <div className="image-gallery">
                    {isWideScreen ? stay.images.additional.map((img, idx) => {
                        if (idx <= 4) {
                            return (
                                <img
                                    key={idx}
                                    src={img}
                                    className={idx === 0 ? "main-img" : ""}
                                    alt={`Description ${idx + 1}`}
                                />
                            )
                        }
                        return null
                    })
                        : <img
                            src={stay.images.picture_url}
                            className="main-image"
                            alt="Description 1"
                        />}
                    {/* <div className="overlay"></div> */}
                </div>
            </div>

            <div className="main-desc">
                <div className="with-sticky-order">
                    <div>
                        <div>
                            <h2>{stay.property_type} in {stay.address.market}, {stay.address.country}</h2>
                            <p>{stay.guests_included.$numberDecimal < 2 ? `${stay.guests_included.$numberDecimal} guest` : `${stay.guests_included.$numberDecimal} guests`} &middot; {stay.amenities[0]} &middot; {stay.amenities[1]}</p>
                            <div className="review-summary">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="star">
                                        <path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9
                                        C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7
                                        c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path>
                                    </svg>
                                    <p>{
                                        Number.isInteger(stay.review_scores.review_scores_rating * 5 / 100)
                                            ? (stay.review_scores.review_scores_rating * 5 / 100).toFixed(1)
                                            : parseFloat((stay.review_scores.review_scores_rating * 5 / 100).toFixed(2))
                                    }</p>
                                </div>
                                <p>&middot; </p>
                                <p className="review-score">{stay.reviews.length} {stay.reviews.length === 1 ? 'review' : 'reviews'}</p>
                            </div>
                        </div>

                        <div className="host-info">
                            <img src={stay.host.host_picture_url}></img>
                            <div>
                                <h3 className="hosted-by">Hosted by {stay.host.host_name}</h3>
                                {stay.host.host_is_superhost ?
                                    <p className="host-experience">Superhost &middot; {differenceInYears(new Date(), stay.first_review.$date)} years hosting</p> : ''}
                            </div>
                        </div>

                        <div className="more-info">
                            <div className="main-amenities">
                                <div className="amenity">
                                    <div className="amenity-img">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="paw">
                                            <g>
                                                <path d="M46.75 41.11a20.77 20.77 0 0 0-8.42-9c-9.14-5.25-19.11 1.81-22.62 10.55-2.6 5.11 2.39 11.29 7.94 9.74l.13 0 4.12-1.46a11.09 11.09 0 0 1 7.39 0l4.13 1.46c5.56 1.7 10.71-4.53 8.07-9.7zm-3.08 7.66a3.92 3.92 0 0 1-3.32.73L36.3 48.06a14.16 14.16 0 0 0-9.4 0l-4 1.44A4 4 0 0 1 18.41 44l.75-1.53C22.11 36 30 30.69 36.81 34.69h0a17.74 17.74 0 0 1 7.23 7.72L44.79 44A4 4 0 0 1 43.67 48.77zM18.26 35.08c4.59-3.21-1.23-12.42-6.1-9.65C7.52 28.66 13.53 37.91 18.26 35.08zM14.19 30.9c-.53-.88-1-2.19-.43-2.93 1-.19 1.85.76 2.47 1.64h0c.53.89 1 2.19.43 2.94C16.3 32.76 15.07 32.3 14.19 30.9zM24 27.55c5.31 2 7.54-4.25 5.69-9.89-1.3-3.83-4-7.25-7.77-6C16.74 13.82 18.84 25.39 24 27.55zm-.89-13.09c1.43-.28 2.86 1.61 3.72 4.11 1 3.23.27 5.91-.71 6.33-1.42.29-2.86-1.6-3.72-4.1C21.36 17.56 22.13 14.88 23.11 14.46zM51.84 25.43c-4.87-2.77-10.69 6.44-6.1 9.65C50.47 37.91 56.48 28.66 51.84 25.43zm-2 5.47c-.88 1.4-2.12 1.86-2.47 1.65-.59-.75-.1-2 .43-2.94h0c.62-.87 1.47-1.84 2.47-1.64C50.84 28.71 50.34 30 49.81 30.9zM36.69 27.66c3.78 1.28 6.46-2.13 7.77-5.95 3.3-10.93-6.73-14.47-10.15-4.05C32.88 22.16 33.9 26.46 36.69 27.66zm.48-9.09c.84-2.48 2.31-4.41 3.72-4.11 1 .42 1.75 3.1.71 6.33-.84 2.5-2.33 4.42-3.72 4.11C36.9 24.48 36.14 21.8 37.17 18.57z"></path>
                                            </g>
                                        </svg>
                                    </div>

                                    <div className="amenity-info">
                                        <h3>Furry friends welcome</h3>
                                        <p>Bring your pets along for the stay.
                                        </p>
                                    </div>
                                </div>

                                <div className="amenity">
                                    <div className="amenity-img">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="door">
                                            <polygon fill="none" stroke="#222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" points="47.55 4.33 29.55 8.52 29.55 55.48 29.55 59.73 47.55 55.53 47.55 4.33"></polygon>
                                            <polyline fill="none" stroke="#222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" points="47.55 4.33 47.55 4.28 16.45 4.28 16.45 55.48 29.55 55.48"></polyline>
                                            <line x1="35.8" x2="35.8" y1="33.54" y2="28.06" fill="none" stroke="#222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></line>
                                        </svg>
                                    </div>

                                    <div className="amenity-info">
                                        <h3>Self check-in</h3>
                                        <p>Check yourself in with the keypad.</p>
                                    </div>
                                </div>

                                {stay.host.isSuperHost ?
                                    <>
                                        <div className="amenity">
                                            <div className="amenity-img">
                                                {/* <img src={medalIcon}></img> */}
                                                <img></img>
                                            </div>

                                            <div className="amenity-info">
                                                <h3>{stay.host.fullname} is a Superhost</h3>
                                                <p>Superhosts are experienced, highly rated Hosts.</p>
                                            </div>
                                        </div></> : ''}

                            </div>

                            <div className="full-desc">
                                <p>{stay.summary}</p>
                                <button>
                                    <p>Show more</p>
                                    {/* <img src={rightArrow}></img> */}
                                </button>
                            </div>

                            <div className="place-offers-summary">
                                <h2>What this place offers</h2>
                                <div className="place-offers">
                                    {stay.amenities.map((amenity, idx) => {
                                        if (!isWideScreen ? idx < 5 : idx < 10) {
                                            let amenityIcon = stayAmenities.amenities.find(a => a.name === amenity)
                                            return (<div className="offer" key={idx}>
                                                {amenityIcon && <img src={amenityIcon.icon}></img>}
                                                <p>{amenity}</p>
                                            </div>)
                                        }
                                    })}
                                </div>
                                <button>Show all {stay.amenities.length} amenities</button>
                            </div>

                            <div>
                                <div className="order-calendar">
                                    {checkIn && checkOut ?
                                        <>
                                            <h2>{`${intervalToDuration({ start: checkIn, end: checkOut }).days} nights in ${stay.name}`}</h2>
                                            <p>{`${format(new Date(checkIn), 'MMM d, yyyy')} - ${format(new Date(checkOut), 'MMM d, yyyy')}`}</p>
                                        </>
                                        :
                                        <>
                                            <h2>Select check-in date</h2>
                                            <p>Add your travel dates for exact pricing</p>
                                        </>}
                                    <CalendarPicker breakPoint={1200} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="order-stay">
                        <OrderSidebar currentOrder={currentOrder} />
                    </div>
                </div>

                <div className="reviews">
                    <div className="overall-rating">
                        <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="star">
                            <path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9
                                        C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7
                                        c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path>
                        </svg>

                        <h2>
                            {`${Number.isInteger(stay.review_scores.review_scores_rating * 5 / 100)
                                ? (stay.review_scores.review_scores_rating * 5 / 100).toFixed(1)
                                : parseFloat((stay.review_scores.review_scores_rating * 5 / 100).toFixed(2))}
                             · ${stay.reviews.length} reviews`}</h2>
                    </div>
                    <div className="ratings">
                        <div className="rating-category">
                            <div className="rating-title">Overall rating</div>
                            <div className="rating-bars">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div key={i} className="bar">
                                        <p>{i + 1}</p>
                                        <div className={`rating-bar ${i < stay.reviews.overall ? 'filled' : ''}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Cleanliness</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_cleanliness
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_cleanliness
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_cleanliness
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={sprayerIcon}></img>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Accuracy</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_accuracy
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_accuracy
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_accuracy
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={CheckCircleIcon}></img>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Check-in</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_checkin
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_checkin
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_checkin
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={KeyIcon}></img>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Communication</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_communication
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_communication
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_communication
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={chatBoxIcon}></img>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Location</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_location
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_location
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_location
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={mapIcon}></img>
                        </div>
                        <div className="rating-category">
                            <div>
                                <div className="rating-title">Value</div>
                                <div className="rating-value">
                                    {Number.isInteger(stay.review_scores.review_scores_value
                                        * 5 / 10)
                                        ? (stay.review_scores.review_scores_value
                                            * 5 / 10).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_value
                                            * 5 / 10).toFixed(2))}
                                </div>
                            </div>
                            <img src={priceTagIcon}></img>
                        </div>
                    </div>
                </div>

                <div className="review-list">
                    {stay.reviews.map((review, index) => (
                        index <= 5 ? <div key={index} className="review-card">
                            {index <= stay.reviews.length - 1 ? <><div className="review-header">
                                {/* <img src={stay.reviews[index].by.imgUrl} alt={`${review.name}'s profile`} className="review-image" /> */}
                                <div className="review-details">
                                    <div className="review-name">{review.reviewer_name}</div>
                                    {/* <div className="review-location">{review.location}</div> */}
                                </div>
                            </div>
                                <div className="review-rating">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        // <img key={i} src={StarIcon}></img>
                                        <img key={i}></img>
                                    ))}
                                    {/* <span className="review-date">{review.date}</span>
                                <span className="review-stay">{review.stay}</span> */}
                                </div>
                                {stay.reviews[index].comments.length > 185 ?
                                    <>
                                        <div className="review-text">
                                            {stay.reviews[index].comments.substring(0, 185)}...
                                        </div>
                                        <div className="review-more">Show more</div>
                                    </>
                                    : <div className="review-text">
                                        {stay.reviews[index].comments}
                                    </div>}
                            </> : ''}
                        </div> : ''
                    ))}
                </div>

                <div className="map-view">
                    <MapView stay={stay} />
                </div>
            </div >

            <div className="host-profile-container">
                <div className="host-profile">
                    <h2>Meet your Host</h2>
                    <div className="host-card">
                        <div className="host-info">
                            <div className="host-overview">
                                <img src={stay.host.host_picture_url} alt={`${stay.host.host_name}'s profile`} className="host-image" />
                                <div className="host-name">{stay.host.host_name}</div>
                                <div className="host-role">Host</div>
                            </div>
                            <div className="host-stats">
                                <div className="host-details">
                                    <div className="host-detail">
                                        {stay.reviews.length} Reviews
                                    </div>
                                    <div className="host-detail">
                                        {stay.host.rating}
                                    </div>
                                    <div className="host-detail">
                                        {stay.host.yearsHosting} Years hosting
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="host-contact">
                            <div className="contact-details">
                                <div className="contact-title">Host details</div>
                                <div className="contact-info">
                                    Response rate: {`${stay.host.host_response_rate}%`}
                                </div>
                                <div className="contact-info">
                                    Responds {stay.host.host_response_time}
                                </div>
                                <button className="message-button">Message Host</button>
                            </div>
                            <div className="contact-warning">
                                To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="things-to-know">
                <h2>Things to know</h2>
                <div className="things-container">
                    <div className="thing">
                        <h3>House rules</h3>
                        <p>{stay.house_rules}</p>
                    </div>

                    <div className="thing">
                        <h3>Personal note</h3>
                        <p>{stay.interaction}</p>
                    </div>

                    <div className="thing">
                        <h3>Cancellation policy</h3>
                        <p>{stay.cancellation_policy}</p>
                    </div>

                </div>
            </div> */}
        </>
    )
}