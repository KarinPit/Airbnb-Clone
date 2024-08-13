import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { stayService } from "../../../../services/stay.service"

import { WhereModal } from "./WhereModal"
import CalendarPicker from "./CalendarPicker/CalendarPicker"
import CalendarPickerMobile from "./CalendarPicker/CalendarPickerMobile"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)

    useEffect(() => {
    }, [isWideScreen])

    // async function loadStays() {
    //     try {
    //         const stays = await stayService.query(filterBy)
    //     }
    //     catch (err) {
    //         console.log('error in loadStays', err)
    //     }
    // }

    const renderModalContent = () => {
        if (isOpenFilter.includes('where-input')) {
            return <WhereModal />
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