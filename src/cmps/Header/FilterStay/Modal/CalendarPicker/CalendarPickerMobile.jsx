import React, { useState, useEffect } from 'react'
import { addMonths, startOfDay, isValid, isAfter } from 'date-fns'
import { CalendarCells } from '../../../../../utils/CalendarCells'
import { getMonthName } from '../../../../../utils/CalendarUtils'

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
    const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(window.innerWidth < screenWidth)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [range, setRange] = useState({ start: null, end: null })
    const [hoveredDate, setHoveredDate] = useState(null)

    const nextMonthDate = addMonths(currentDate, 1)

    useResize(() => {
        setIsMinimizedCalendar(window.innerWidth < screenWidth)
    })

    const handleNextClick = () => {
        setCurrentDate(addMonths(currentDate, 2))
    }

    const handleDateClick = (day) => {
        if (!range.start || (range.start && range.end)) {
            if (isValid(day)) {
                setRange({ start: day, end: null })
                // onChange({ start: day, end: null })
            }
        } else {
            const newRange = {
                start: range.start,
                end: day < range.start ? null : day,
            }

            if (isValid(newRange.end)) {
                setRange(newRange)
                // onChange({ start: newRange.start, end: newRange.end })
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

            <div className='load-dates'>
                <button onClick={handleNextClick}>Load more dates</button>
            </div>

            <div className='control-buttons'>
                <button className='skip-button'>Skip</button>
                <button className='next-button'>Next</button>
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
