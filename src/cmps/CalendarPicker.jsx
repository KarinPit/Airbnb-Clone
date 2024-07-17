import React, { useState, useEffect } from 'react'
import { addMonths, subMonths, startOfDay, isSameDay, isBefore, isWithinInterval, endOfDay, isAfter, isValid } from 'date-fns'

import { CalendarCells } from '../utils/CalendarCells'
import { getMonthName } from '../utils/CalendarUtils'


export function CalendarPicker() {
    const screenWidth = 850
    const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(window.innerWidth < screenWidth)
    const [currentDate, setCurrentDate] = useState(new Date())
    const nextMonthDate = addMonths(currentDate, 1)
    const [range, setRange] = useState({ start: null, end: null })
    const [hoveredDate, setHoveredDate] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)


    function onClickPrev() {
        const newDate = subMonths(currentDate, 1)
        const beforeDate = subMonths(currentDate, 2)

        if (!isBefore(newDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 2))
        }

        if (isBefore(beforeDate, new Date())) {
            setIsDisabled(true)
        }
    }

    function onClickPrevMinimized() {
        const beforeDate = subMonths(currentDate, 1)

        if (!isBefore(currentDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 1))
            setIsDisabled(false)
        }

        if (isBefore(beforeDate, new Date())) {
            setIsDisabled(true)
        }
    }

    function onClickNext() {
        setCurrentDate(addMonths(currentDate, 2))
        setIsDisabled(false)
    }

    function onClickNextMinimized() {
        setCurrentDate(addMonths(currentDate, 1))
        setIsDisabled(false)
    }

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

    useEffect(() => {
        function handleResize() {
            setIsMinimizedCalendar(window.innerWidth < screenWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [isMinimizedCalendar])

    return (
        <>
            <div className={`calendar-picker ${isMinimizedCalendar ? 'minimize-calendar' : ''}`}>
                <table className="current-month">
                    <thead>
                        <tr className="prev-month-nav">
                            <th
                                className={`${isDisabled ? 'disabled' : ''}`}
                                onClick={isMinimizedCalendar ? onClickPrevMinimized : onClickPrev}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="left-arrow"><path d="m8.5 12.8 5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6 0-.1 0-.1 0 0z"></path></svg>
                            </th>

                            <th className="month-name">
                                {`${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}
                            </th>

                            <th onClick={onClickNextMinimized}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
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
                            <th onClick={onClickNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow"><path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path></svg>
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

export function CalendarPickerMobile() {
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
            <div className="calendar-picker mobile">
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
            </div>
        </>
    )
}
