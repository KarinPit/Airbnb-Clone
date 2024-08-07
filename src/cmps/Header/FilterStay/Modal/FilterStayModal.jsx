import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { setFilterBy } from '../../../../store/actions/filter.actions'
import { stayService } from "../../../../services/stay.service"

import { WhereModal } from "./WhereModal"
import CalendarPicker from "./CalendarPicker/CalendarPicker"
import CalendarPickerMobile from "./CalendarPicker/CalendarPickerMobile"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const { loc, checkIn, checkOut, who } = filterBy

    useEffect(() => {
    }, [isWideScreen])

    useEffect(() => {
        setSearchParams(sanitizeFilterParams())
        loadStays()
    }, [filterBy])

    function sanitizeFilterParams() {
        const sanitizedFilter = Object.keys(filterBy).filter((key) => filterBy[key]).reduce((acc, currentVal) => {
            acc[currentVal] = filterBy[currentVal]
            return acc
        }, {})

        return sanitizedFilter
    }

    function onChangeFilter(fieldsToUpdate) {
        setFilterBy(fieldsToUpdate)
    }

    async function loadStays() {
        try {
            const stays = await stayService.query(filterBy)
        }
        catch (err) {
            console.log('error in loadStays', err)
        }
    }

    const renderModalContent = () => {
        if (isOpenFilter.includes('where-input')) {
            return <WhereModal filterBy={{ loc }} onChangeFilter={onChangeFilter} />
        }

        if (isOpenFilter.includes('checkin-input') || isOpenFilter.includes('checkout-input')) {
            return isWideScreen ? <CalendarPicker /> : <CalendarPickerMobile />
        }

        if (isOpenFilter.includes('who-input')) {
            return <WhoModal />
        }

        return null
    }

    if (!isOpenFilter) return null

    return (
        <div className={`filter-modal ${isOpenFilter.includes('who-input') ? 'who-adjusted' : ''}`}>
            {renderModalContent()}
        </div>
    )
}