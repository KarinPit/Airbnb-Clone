import { useState, useEffect } from 'react'

import { stayService } from '../services/stay.service'


export function StayIndex() {
    const [stays, setStays] = useState(null)
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        loadStays()
    }, [filterBy])

    async function loadStays() {
        try {
            const stays = await stayService.query(filterBy)
            setStays(stays)
        }
        catch (err) {
            console.log('Error in loadStays', err)
        }
    }

    return (
        <div className='stay-gallery'>
            {/* <p>Here will be all the stays</p> */}
        </div>
    )
}