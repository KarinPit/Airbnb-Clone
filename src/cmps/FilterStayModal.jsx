import { useContext } from "react"
import FilterContext from "../context/FilterContext"

export function FilterStayModal() {
    const context = useContext(FilterContext)

    return (
        <div className="filter-modal">
            {context.openFilter === 'where-input' ?
                <div className="where-modal">where!</div>
                : context.openFilter === 'checkin-input' ?
                    <div className="checkIn-modal">CheckIn!</div>
                    : context.openFilter === 'checkout-input' ?
                        <div className="checkIn-modal">CheckOut!</div>
                        : context.openFilter === 'who-input' ?
                            <div className="checkIn-modal">Who!</div>
                            : ''}
        </div>
    )
}