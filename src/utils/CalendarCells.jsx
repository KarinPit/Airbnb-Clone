import React from 'react'
import { startOfDay, isSameDay, isBefore, isWithinInterval, endOfDay } from 'date-fns'
import { getStartDayOfMonth, getDaysInMonth } from './CalendarUtils'

const getClassName = (currentDateObj, range, hoveredDate, today) => {
    const isPassed = isBefore(startOfDay(currentDateObj), today)
    const isSelectedStart = isSameDay(currentDateObj, range.start)
    const isSelectedEnd = isSameDay(currentDateObj, range.end)
    const isInRange = range.start && range.end &&
        isWithinInterval(currentDateObj, {
            start: startOfDay(range.start),
            end: endOfDay(range.end),
        })
    const isHoveredDate = isWithinInterval(currentDateObj, {
        start: startOfDay(range.start),
        end: endOfDay(hoveredDate),
    })
    const isHoverSelectedDate = isSameDay(currentDateObj, hoveredDate)

    return [
        isSelectedStart ? 'selected-start' : '',
        isSelectedEnd ? 'selected-end' : '',
        isInRange ? 'in-range' : '',
        isPassed ? 'passed' : '',
        isHoveredDate ? 'hovered-date' : '',
        isHoverSelectedDate ? 'hover-selected-date' : ''
    ].join(' ').replace(/\s+/g, ' ').trim()
}

const renderDay = (date, monthDate, range, hoveredDate, today, onDateClick, onDateHover) => {
    const currentDateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), date)
    const className = getClassName(currentDateObj, range, hoveredDate, today)

    return (
        <td key={date} className={className}>
            <div
                className={className}
                onClick={() => onDateClick(currentDateObj)}
                onMouseEnter={() => onDateHover(currentDateObj)}
                onMouseLeave={() => onDateHover(null)}>
                {date}
            </div>
        </td>
    )
}

export function CalendarCells({ monthDate, today, range, hoveredDate, onDateClick, onDateHover }) {
    const rows = []
    let days = []
    let date = 1

    const firstDay = getStartDayOfMonth(monthDate.getFullYear(), monthDate.getMonth())
    const monthDays = getDaysInMonth(monthDate.getFullYear(), monthDate.getMonth())

    for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
            days.push(<td key={`${monthDate.getMonth()}-${i}`} className="blank-td"></td>)
        } else {
            days.push(renderDay(date++, monthDate, range, hoveredDate, today, onDateClick, onDateHover))
        }
    }
    rows.push(<tr key={`week-0`}>{days}</tr>)
    days = []

    while (date <= monthDays) {
        for (let i = 0; i < 7; i++) {
            if (date <= monthDays) {
                days.push(renderDay(date++, monthDate, range, hoveredDate, today, onDateClick, onDateHover))
            } else {
                days.push(<td key={Math.random()} className="blank-td"></td>)
            }
        }

        rows.push(<tr key={`week-${rows.length}`}>{days}</tr>)
        days = []
    }
    return <tbody>{rows}</tbody>
}