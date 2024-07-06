import { useContext } from "react"
import FilterContext from "../context/FilterContext"
import { WhereModal } from "./WhereModal"
import { CalendarModal } from "./CalendarPicker"
import { WhoModal } from "./WhoModal"


export function FilterStayModal() {
    const context = useContext(FilterContext)

    return (
        <div className="filter-modal">
            {context.openFilter === 'where-input' ?
                <WhereModal />
                : context.openFilter === 'checkin-input' || context.openFilter === 'checkout-input' ?
                    <CalendarModal />
                    : context.openFilter === 'who-input' ?
                        <WhoModal /> : ''}
        </div>
    )
}