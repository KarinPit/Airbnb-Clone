import React from 'react'
import { startOfDay, isSameDay, isBefore, isWithinInterval, endOfDay } from 'date-fns'
import { getStartDayOfMonth, getDaysInMonth } from './CalendarUtils'


export function CalendarCells({ monthDate, today, range, hoveredDate, onDateClick, onDateHover }) {
    const rows = []
    let days = []
    let day = 1
    let date = 1

    const firstDay = getStartDayOfMonth(monthDate.getFullYear(), monthDate.getMonth())
    const monthDays = getDaysInMonth(monthDate.getFullYear(), monthDate.getMonth())

    for (let i = 0; i < 7; i++) {
        if (i < firstDay) {
            days.push(<td key={`${monthDate.getMonth()}-${i}`} className="blank-td"></td>)
        } else {
            const currentDateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), date)
            const isPassed = isBefore(startOfDay(currentDateObj), today)
            const isSelectedStart = isSameDay(currentDateObj, range.start)
            const isSelectedEnd = isSameDay(currentDateObj, range.end)
            const isInRange = range.start && range.end &&
                isWithinInterval(currentDateObj, {
                    start: startOfDay(range.start),
                    end: endOfDay(range.end),
                })

            days.push(
                <td
                    key={date}
                    className={`col cell ${isSelectedStart ? 'selected selected-start' : ''
                        } ${isSelectedEnd ? 'selected selected-end' : ''} ${isInRange ? 'in-range' : ''
                        } ${isPassed ? 'passed' : ''} ${isWithinInterval(currentDateObj, {
                            start: startOfDay(range.start),
                            end: endOfDay(hoveredDate),
                        })
                            ? 'hovered-date'
                            : ''
                        } ${isSameDay(currentDateObj, hoveredDate)
                            ? 'hover-selected-date'
                            : ''
                        }`.replace(/\s+/g, ' ').trim()}
                    onClick={() => onDateClick(currentDateObj)}
                    onMouseEnter={() => onDateHover(currentDateObj)}
                    onMouseLeave={() => onDateHover(null)}
                >
                    {date}
                </td>
            )
            date++
        }
    }
    rows.push(<tr key={`week-0`}>{days}</tr>)
    days = []

    while (date <= monthDays) {
        for (let i = 0; i < 7; i++) {
            if (date <= monthDays) {
                const currentDateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), date)
                const isPassed = isBefore(startOfDay(currentDateObj), today)
                const isSelectedStart = isSameDay(currentDateObj, range.start)
                const isSelectedEnd = isSameDay(currentDateObj, range.end)
                const isInRange = range.start && range.end &&
                    isWithinInterval(currentDateObj, {
                        start: startOfDay(range.start),
                        end: endOfDay(range.end),
                    })

                days.push(
                    <td
                        key={date}
                        className={`col cell ${[
                            isSelectedStart ? 'selected selected-start' : '',
                            isSelectedEnd ? 'selected selected-end' : '',
                            isInRange ? 'in-range' : '',
                            isPassed ? 'passed' : '',
                            isWithinInterval(currentDateObj, {
                                start: startOfDay(range.start),
                                end: endOfDay(hoveredDate),
                            }) ? 'hovered-date' : '',
                            isSameDay(currentDateObj, hoveredDate) ? 'hover-selected-date' : ''
                        ].join(' ')}`.replace(/\s+/g, ' ').trim()}
                        onClick={() => onDateClick(currentDateObj)}
                        onMouseEnter={() => onDateHover(currentDateObj)}
                        onMouseLeave={() => onDateHover(null)}
                    >
                        {date}
                    </td>
                )

                date++
            } else {
                days.push(<td key={Math.random()} className="blank-td"></td>)
            }
        }

        rows.push(<tr key={`week-${day}`}>{days}</tr>)
        days = []
        day++
    }
    return <tbody>{rows}</tbody>
}
