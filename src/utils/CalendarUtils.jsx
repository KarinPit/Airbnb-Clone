import { format, intervalToDuration } from 'date-fns'

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

export function getStartDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay()
}

export function getMonthName(monthNum) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    if (monthNum >= 0 && monthNum < 12) {
        return monthNames[monthNum]
    } else {
        throw new Error('Invalid month number. Please provide a number between 0 and 11.')
    }
}

export function getDateName(checkIn, checkOut) {
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const checkInMonth = getMonthName(checkInDate.getMonth())
    const checkOutMonth = getMonthName(checkOutDate.getMonth())
    const checkInDay = format(checkInDate, 'd')
    const checkOutDay = format(checkOutDate, 'd')
    return `${checkInMonth} ${checkInDay} - ${checkOutMonth} ${checkOutDay}`
}

export function calcDaysBetweenDates(checkIn, checkOut) {
    return intervalToDuration({
        start: new Date(checkIn),
        end: new Date(checkOut)
    }).days
}