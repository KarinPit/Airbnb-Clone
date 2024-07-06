import React, { useState } from 'react'
import { addMonths, subMonths, startOfDay, isSameDay, isBefore, isWithinInterval, endOfDay, isAfter, isValid } from 'date-fns'

import { CalendarCells } from '../utils/CalendarCells'
import { getMonthName } from '../utils/CalendarUtils'

import RightArrowIcon from '../../public/svg/arrow-right.svg'
import leftArrowIcon from '../../public/svg/arrow-left.svg'


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
            <div>
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
                                <img src={leftArrowIcon}></img>
                            </th>
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
                                <img src={RightArrowIcon}></img>
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
