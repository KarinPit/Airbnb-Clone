import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { WhereModal } from "./WhereModal"
import CalendarPicker from "./CalendarPicker/CalendarPicker"
import CalendarPickerMobile from "./CalendarPicker/CalendarPickerMobile"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const isWideScreen = useSelector((storeState) => storeState.appModule.isWideScreen)
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)

    useEffect(() => {
    }, [isWideScreen])

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