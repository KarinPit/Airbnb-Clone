import { useContext } from "react";
import FilterContext from "../../../../context/FilterContext";
import { WhereModal } from "./WhereModal";
import CalendarPicker from "./CalendarPicker/CalendarPicker";
import CalendarPickerMobile from "./CalendarPicker/CalendarPickerMobile";
import { WhoModal } from "./WhoModal";

export function FilterStayModal() {
    const { openFilter, isWideScreen } = useContext(FilterContext);

    const renderModalContent = () => {
        if (openFilter.includes('where-input')) {
            return <WhereModal />;
        }
        if (openFilter.includes('checkin-input') || openFilter.includes('checkout-input')) {
            return isWideScreen ? <CalendarPicker /> : <CalendarPickerMobile />;
        }
        if (openFilter.includes('who-input')) {
            return <WhoModal />;
        }
        return null;
    };

    if (!openFilter) return null;

    return (
        <div className={`filter-modal ${openFilter.includes('who-input') ? 'who-adjusted' : ''}`}>
            {renderModalContent()}
        </div>
    );
}