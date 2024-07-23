import { useContext } from "react"
import FilterContext from "../context/FilterContext"
import { WhereModal } from "./WhereModal"
import { CalendarPicker, CalendarPickerMobile } from "./CalendarPicker"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const context = useContext(FilterContext)

    if (context.openFilter) return (
        <div className={`filter-modal ${context.openFilter.includes('who-input') ? 'who-adjusted' : ''}`}>
            {context.openFilter.includes('where-input') ?
                <WhereModal />
                : context.openFilter.includes('checkin-input') || context.openFilter.includes('checkout-input') ?
                context.isWideScreen ? <CalendarPicker /> : <CalendarPickerMobile />
                
                
                    : context.openFilter.includes('who-input') ?
                        <WhoModal /> : ''}
        </div>
    )
}