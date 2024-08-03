import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { WhereModal } from "./WhereModal"
import CalendarPicker from "./CalendarPicker/CalendarPicker"
import CalendarPickerMobile from "./CalendarPicker/CalendarPickerMobile"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const isOpenFilter = useSelector((storeState) => storeState.filterModule.isOpenFilter)
    const narrowBreakpoint = useSelector((storeState) => storeState.appModule.narrowBreakpoint)
    const { isWideScreen, setIswideScreen } = useState(window.innerWidth > narrowBreakpoint)

    useEffect(() => {
        // console.log('is wide screen', isWideScreen);
        window.addEventListener('resize', handleWindowResize)
        return (
            window.removeEventListener('resize', handleWindowResize)
        )
    // }, [isWideScreen])
    }, [])

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