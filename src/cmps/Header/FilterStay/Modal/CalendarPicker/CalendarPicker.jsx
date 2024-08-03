import React, { useState, useEffect, useContext } from 'react'
import { addMonths, subMonths, startOfDay, isBefore, isAfter, isValid } from 'date-fns'

import FilterModalContext from '../../../../../context/FilterContext'
import { CalendarCells } from '../../../../../utils/CalendarCells'
import { getMonthName } from '../../../../../utils/CalendarUtils'

import { LeftArrow, RightArrow } from '../../../../SVG/HeaderSvg'


export default function CalendarPicker() {
    const { filterBy, setFilterBy } = useContext(FilterModalContext)
    const screenWidth = 850
    const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(window.innerWidth < screenWidth)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [range, setRange] = useState({ start: null, end: null })
    const [hoveredDate, setHoveredDate] = useState(null)
    const [isDisabled, setIsDisabled] = useState(true)
    const nextMonthDate = addMonths(currentDate, 1)


    useEffect(() => {
        console.log(filterBy)
    }, [filterBy])

    useResize(() => {
        setIsMinimizedCalendar(window.innerWidth < screenWidth)
    })


    function handlePrevClick() {
        const newDate = subMonths(currentDate, 1)
        const beforeDate = subMonths(currentDate, 2)

        if (!isBefore(newDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 2))
        }

        setIsDisabled(isBefore(beforeDate, new Date()))
    }

    function handlePrevMinimizedClick() {
        const beforeDate = subMonths(currentDate, 1)

        if (!isBefore(currentDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 1))
            setIsDisabled(false)
        }

        setIsDisabled(isBefore(beforeDate, new Date()))
    }

    function handleNextClick() {
        setCurrentDate(addMonths(currentDate, 2))
        setIsDisabled(false)
    }

    function handleNextMinimizedClick() {
        setCurrentDate(addMonths(currentDate, 1))
        setIsDisabled(false)
    }

    function handleDateClick(day) {
        if (!range.start || (range.start && range.end)) {
            if (isValid(day)) {
                setRange({ start: day, end: null })
                setFilterBy(prev => ({ ...prev, 'checkIn': day, 'checkOut': null }))
            }
        } else {
            const newRange = {
                start: range.start,
                end: day < range.start ? null : day,
            }

            if (isValid(newRange.end)) {
                setRange(newRange)
                setFilterBy(prev => ({ ...prev, 'checkOut': day }))
            }
        }
    }

    function handleDateHover(day) {
        if (range.start && !range.end && isAfter(day, range.start)) {
            setHoveredDate(day)
        } else {
            setHoveredDate(null)
        }
    }

    return (
        <div className={`calendar-picker ${isMinimizedCalendar ? 'minimize-calendar' : ''}`}>
            <MonthTable
                monthDate={currentDate}
                nextMonthDate={nextMonthDate}
                isDisabled={isDisabled}
                isMinimizedCalendar={isMinimizedCalendar}
                onPrevClick={handlePrevClick}
                onPrevMinimizedClick={handlePrevMinimizedClick}
                onNextClick={handleNextClick}
                onNextMinimizedClick={handleNextMinimizedClick}
                range={range}
                hoveredDate={hoveredDate}
                onDateClick={handleDateClick}
                onDateHover={handleDateHover}
            />
        </div>
    )
}

function MonthTable({
    monthDate, nextMonthDate, isDisabled, isMinimizedCalendar, onPrevClick, onPrevMinimizedClick, onNextClick, onNextMinimizedClick, range, hoveredDate, onDateClick, onDateHover
}) {
    return (
        <>
            <table className="current-month">
                <thead>
                    <tr className="prev-month-nav">
                        <th
                            className={`${isDisabled ? 'disabled' : ''}`}
                            onClick={isMinimizedCalendar ? onPrevMinimizedClick : onPrevClick}
                        >
                            <LeftArrow />
                        </th>
                        <th className="month-name">
                            {`${getMonthName(monthDate.getMonth())} ${monthDate.getFullYear()}`}
                        </th>
                        <th onClick={isMinimizedCalendar ? onNextMinimizedClick : onNextClick}>
                            <RightArrow />
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
                    <CalendarCells
                        monthDate={monthDate}
                        today={startOfDay(new Date())}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={onDateClick}
                        onDateHover={onDateHover}
                    />
                </tbody>
            </table>
            <table className="next-month">
                <thead>
                    <tr className="next-month-nav">
                        <th className="month-name">
                            {`${getMonthName(nextMonthDate.getMonth())} ${nextMonthDate.getFullYear()}`}
                        </th>
                        <th onClick={onNextClick}>
                            <RightArrow />
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
                    <CalendarCells
                        monthDate={nextMonthDate}
                        today={startOfDay(new Date())}
                        range={range}
                        hoveredDate={hoveredDate}
                        onDateClick={onDateClick}
                        onDateHover={onDateHover}
                    />
                </tbody>
            </table>
        </>
    )
}

function useResize(callback) {
    useEffect(() => {
        window.addEventListener('resize', callback)
        return () => {
            window.removeEventListener('resize', callback)
        }
    }, [callback])
}