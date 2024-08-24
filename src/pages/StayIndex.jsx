import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { format } from 'date-fns'
import { getDistance } from 'geolib'
import { getMonthName } from '../utils/CalendarUtils'
import { setFilterBy } from '../store/actions/filter.actions'
import { stayService } from '../services/stay.service'

import { ImageCarousel } from '../cmps/Stay/ImageCarousel'
import { FilterCategories } from '../cmps/Stay/CategoryFilter/FilterCategories'

export function StayIndex() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const userLoc = useSelector((storeState) => storeState.userModule.currentLocation)
    const [stays, setStays] = useState(null)
    const [options, setOptions] = useState([]);

    useEffect(() => {
        loadStays()
        stayService.fetchImages()
            .then((imgs) => {
                const mappedOptions = imgs.map((image) => ({
                    title: image.title,
                    value: image.value,
                    icon: `/public/images/filter-category/${image.src}`,
                }));
                setOptions(mappedOptions);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch images:", error);
                setLoading(false);
            });
    }, [])

    async function loadStays() {
        try {
            const stays = await stayService.query()
            setStays(stays)
        }
        catch (err) {
            console.log('Error in loadStays', err)
        }
    }

    function getDateName(checkIn, checkOut) {
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        const checkInMonth = getMonthName(checkInDate.getMonth())
        const checkOutMonth = getMonthName(checkOutDate.getMonth())
        const checkInDay = format(checkInDate, 'd')
        const checkOutDay = format(checkOutDate, 'd')
        return `${checkInMonth} ${checkInDay} - ${checkOutMonth} ${checkOutDay}`
    }

    function extractCoords(locArray) {
        const [long, lat] = locArray
        return { latitude: lat, longitude: long }
    }

    
  function onSetFilter(fieldsToUpdate) {
    setFilterBy(fieldsToUpdate);
  }

    if (!stays || !userLoc) return <div>Loading...</div>

    return (
        <>
            <FilterCategories onSetFilter={onSetFilter} filterBy={filterBy.category_tag} />

            <div className='stay-gallery'>
                {stays.map(stay => (
                    <div key={stay._id}>
                        <ImageCarousel stayImages={stay.images} isGuestFavorite={stay.is_guest_favorite} stayId={stay._id} />

                        <div className='stay-desc'>
                            <div className='desc-info'>
                                <p>{`${stay.address.market}, ${stay.address.country}`}</p>
                                <p>{`${(() => {
                                    const staycoords = extractCoords(stay.address.location.coordinates)
                                    const distanceKm = Math.round(getDistance(staycoords, userLoc) / 1000)
                                    return distanceKm.toLocaleString()
                                })()} kilometers away`}
                                </p>
                                <p>{getDateName(stay.availability.avalable_checkIn.$date, stay.availability.avalable_checkOut.$date)} </p>
                                <p><span>${Math.round(stay.price.$numberDecimal)}</span> night</p>
                            </div>

                            <div className='desc-rating'>
                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="star"><path d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9
                                C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7
                                c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"></path></svg>
                                <p>{
                                    Number.isInteger(stay.review_scores.review_scores_rating * 5 / 100)
                                        ? (stay.review_scores.review_scores_rating * 5 / 100).toFixed(1)
                                        : parseFloat((stay.review_scores.review_scores_rating * 5 / 100).toFixed(2))
                                }</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}



// useEffect(() => {
//     loadStays()
// }, [filterBy])

// async function loadStays() {
//     try {
//         const stays = await stayService.query(filterBy)
//         setStays(stays)
//     }
//     catch (err) {
//         console.log('Error in loadStays', err)
//     }
// }