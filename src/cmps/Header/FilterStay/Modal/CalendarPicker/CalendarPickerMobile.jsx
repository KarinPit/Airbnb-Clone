import React, { useState, useEffect } from 'react'
import { addMonths, startOfDay, isValid, isAfter } from 'date-fns'
import { CalendarCells } from '../../../../../utils/CalendarCells'
import { getMonthName } from '../../../../../utils/CalendarUtils'
import { setFilterBy } from '../../../../../store/actions/filter.actions'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stayService } from '../../../../../services/stay.service'

const screenWidth = 850

function useResize(callback) {
    useEffect(() => {
        window.addEventListener('resize', callback)
        return () => {
            window.removeEventListener('resize', callback)
        }
    }, [callback])
}

export default function CalendarPickerMobile() {
    const filterBy = useSelector((storeState) => storeState.filterModule.filterBy)
    const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(window.innerWidth < screenWidth)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [range, setRange] = useState({ start: filterBy.checkIn, end: filterBy.checkOut })
    const [hoveredDate, setHoveredDate] = useState(null)
    const [filterByToEdit, setFilterByToEdit] = useState({ checkIn: filterBy.checkIn, checkOut: filterBy.checkOut })
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    useEffect(() => {
        setSearchParams(stayService.sanitizeFilterParams(filterBy))
    }, [filterBy.checkIn, filterBy.checkOut])

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    useResize(() => {
        setIsMinimizedCalendar(window.innerWidth < screenWidth)
    })

    const nextMonthDate = addMonths(currentDate, 1)

    const handleNextClick = () => {
        setCurrentDate(addMonths(currentDate, 2))
    }

    function handleDateClick(day) {
        if (!range.start || (range.start && range.end)) {
            if (isValid(day)) {
                setRange({ start: day, end: null })
                setFilterByToEdit(prev => ({ ...prev, 'checkIn': day, 'checkOut': '' }))
            }
        } else {
            const newRange = {
                start: range.start,
                end: day < range.start ? null : day,
            }

            if (isValid(newRange.end)) {
                setRange(newRange)
                setFilterByToEdit(prev => ({ ...prev, 'checkOut': day }))
            }
        }
    }

    const handleDateHover = (day) => {
        if (range.start && !range.end && isAfter(day, range.start)) {
            setHoveredDate(day)
        } else {
            setHoveredDate(null)
        }
    }

    return (
        <div className="calendar-picker mobile">
            <table className="current-month">
                <thead>
                    <tr className='table-title'>
                        <th colSpan="7">
                            <h2>When's your trip?</h2>
                        </th>
                    </tr>
                    <tr className="day-names">
                        <th>Su</th>
                        <th>Mo</th>
                        <th>Tu</th>
                        <th>We</th>
                        <th>Th</th>
                        <th>Fr</th>
                        <th>Sa</th>
                    </tr>
                </thead>
                <tbody>
                    <MonthRow
                        currentDate={currentDate}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={handleDateClick}
                        onDateHover={handleDateHover}
                    />
                    <MonthRow
                        currentDate={nextMonthDate}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={handleDateClick}
                        onDateHover={handleDateHover}
                    />
                    <MonthRow
                        currentDate={addMonths(currentDate, 2)}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={handleDateClick}
                        onDateHover={handleDateHover}
                    />
                    <MonthRow
                        currentDate={addMonths(currentDate, 3)}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={handleDateClick}
                        onDateHover={handleDateHover}
                    />
                </tbody>
            </table>

            <div className="modal-calendar-controls">
                <div className='load-dates'>
                    <button onClick={handleNextClick}>Load more dates</button>
                </div>

                <div className='control-buttons'>
                    <button className='skip-button'>Skip</button>
                    <button className='next-button'
                        onClick={() => { dispatch({ type: 'SET_OPEN_FILTER_MOBILE', isOpenFilterMobile: 'who-input-mobile' }) }}>Next</button>
                </div>
            </div>
        </div>
    )
}

const MonthRow = ({ currentDate, range, hoveredDate, onDateClick, onDateHover }) => (
    <>
        <tr className="month-nav">
            <td className="month-name" colSpan="7">
                {`${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}
            </td>
        </tr>
        <CalendarCells
            monthDate={currentDate}
            today={startOfDay(new Date())}
            range={range}
            hoveredDate={hoveredDate}
            onDateClick={onDateClick}
            onDateHover={onDateHover}
        />
    </>
)
