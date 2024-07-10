import React, { useState } from 'react'
import { addMonths, subMonths, startOfDay, isSameDay, isBefore, isWithinInterval, endOfDay, isAfter, isValid } from 'date-fns'

import { CalendarCells } from '../utils/CalendarCells'
import { getMonthName } from '../utils/CalendarUtils'


export function CalendarPicker() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [range, setRange] = useState({ start: null, end: null })
    const [hoveredDate, setHoveredDate] = useState(null)
    const nextMonthDate = addMonths(currentDate, 1)

    function onDateClick(day) {
        if (!range.start || (range.start && range.end)) {
            if (isValid(day)) {
                setRange({ start: day, end: null })
                onChange({ start: day, end: null })
            }
        } else {
            const newRange = {
                start: range.start,
                end: day < range.start ? null : day,
            }

            if (isValid(newRange.end)) {
                setRange(newRange)
                onChange({ start: newRange.start, end: newRange.end })
            }
        }
    }

    function onDateHover(day) {
        if (range.start && !range.end && isAfter(day, range.start)) {
            setHoveredDate(day)
        } else {
            setHoveredDate(null)
        }
    }


    return (
        <>
            <div className="calendar-picker">
                <table className="current-month">
                    <thead>
                        <tr className="prev-month-nav">
                            <th
                                onClick={() => {
                                    const newDate = subMonths(currentDate, 1)
                                    if (!isBefore(newDate, new Date())) {
                                        setCurrentDate(subMonths(currentDate, 2))
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="arrow-left"><path fill="#200E32" d="M16.254 4.241c.298.292.325.75.081 1.072l-.08.092L9.526 12l6.727 6.595c.298.292.325.75.081 1.072l-.08.092a.852.852 0 0 1-1.094.08l-.094-.08-7.321-7.177a.811.811 0 0 1-.081-1.072l.08-.092 7.322-7.177a.852.852 0 0 1 1.187 0Z"></path></svg>                            </th>
                            <th className="month-name">{`${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}</th>
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
                    <CalendarCells
                        monthDate={currentDate}
                        today={startOfDay(new Date())}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={onDateClick}
                        onDateHover={onDateHover}
                    />
                </table>

                <table className="next-month">
                    <thead>
                        <tr className="next-month-nav">
                            <th className="month-name">{`${getMonthName(nextMonthDate.getMonth())} ${nextMonthDate.getFullYear()}`}</th>
                            <th onClick={() => setCurrentDate(addMonths(currentDate, 2))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="arrow-right"><path stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8.5 5 7 7-7 7"></path></svg>                            </th>
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
                    <CalendarCells
                        monthDate={nextMonthDate}
                        today={startOfDay(new Date())}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={onDateClick}
                        onDateHover={onDateHover}
                    />
                </table>
            </div>
        </>
    )
}
