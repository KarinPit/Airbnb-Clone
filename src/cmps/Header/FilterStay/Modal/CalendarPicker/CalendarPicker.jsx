import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, startOfDay, isBefore, isAfter, isValid } from 'date-fns';
import { CalendarCells } from '../../../../../utils/CalendarCells';
import { getMonthName } from '../../../../../utils/CalendarUtils';


export default function CalendarPicker() {
    const screenWidth = 850;
    const [isMinimizedCalendar, setIsMinimizedCalendar] = useState(window.innerWidth < screenWidth);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [range, setRange] = useState({ start: null, end: null });
    const [hoveredDate, setHoveredDate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);

    const nextMonthDate = addMonths(currentDate, 1);

    useResize(() => {
        setIsMinimizedCalendar(window.innerWidth < screenWidth);
    });

    function handlePrevClick() {
        const newDate = subMonths(currentDate, 1);
        const beforeDate = subMonths(currentDate, 2);

        if (!isBefore(newDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 2));
        }

        setIsDisabled(isBefore(beforeDate, new Date()));
    }

    function handlePrevMinimizedClick() {
        const beforeDate = subMonths(currentDate, 1);

        if (!isBefore(currentDate, new Date())) {
            setCurrentDate(subMonths(currentDate, 1));
            setIsDisabled(false);
        }

        setIsDisabled(isBefore(beforeDate, new Date()));
    }

    function handleNextClick() {
        setCurrentDate(addMonths(currentDate, 2));
        setIsDisabled(false);
    }

    function handleNextMinimizedClick() {
        setCurrentDate(addMonths(currentDate, 1));
        setIsDisabled(false);
    }

    function handleDateClick(day) {
        if (!range.start || (range.start && range.end)) {
            if (isValid(day)) {
                setRange({ start: day, end: null });
                // onChange({ start: day, end: null })
            }
        } else {
            const newRange = {
                start: range.start,
                end: day < range.start ? null : day,
            };

            if (isValid(newRange.end)) {
                setRange(newRange);
                // onChange({ start: newRange.start, end: newRange.end })
            }
        }
    }

    function handleDateHover(day) {
        if (range.start && !range.end && isAfter(day, range.start)) {
            setHoveredDate(day);
        } else {
            setHoveredDate(null);
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
    );
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="left-arrow">
                                <path d="m8.5 12.8 5.7 5.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.9-5 4.9-5c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-5.7 5.6c-.4.5-.4 1.1 0 1.6 0-.1 0-.1 0 0z"></path>
                            </svg>
                        </th>
                        <th className="month-name">
                            {`${getMonthName(monthDate.getMonth())} ${monthDate.getFullYear()}`}
                        </th>
                        <th onClick={isMinimizedCalendar ? onNextMinimizedClick : onNextClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow">
                                <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="right-arrow">
                                <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"></path>
                            </svg>
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
    );
}

function useResize(callback) {
    useEffect(() => {
        window.addEventListener('resize', callback);
        return () => {
            window.removeEventListener('resize', callback);
        };
    }, [callback]);
}