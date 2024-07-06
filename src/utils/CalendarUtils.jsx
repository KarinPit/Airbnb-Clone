
export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

export function getStartDayOfMonth(year, month) {
    new Date(year, month, 1).getDay()
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
