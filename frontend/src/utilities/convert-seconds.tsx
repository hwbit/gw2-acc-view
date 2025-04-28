
function formatDuration(d: { years: number; months: number; days: number; hours: number; minutes: number; seconds: number }): string {
    const parts = [];
    if (d.years) parts.push(`${d.years} year${d.years !== 1 ? 's' : ''}`);
    if (d.months) parts.push(`${d.months} month${d.months !== 1 ? 's' : ''}`);
    if (d.days) parts.push(`${d.days} day${d.days !== 1 ? 's' : ''}`);
    if (d.hours) parts.push(`${d.hours} hour${d.hours !== 1 ? 's' : ''}`);
    if (d.minutes) parts.push(`${d.minutes} minute${d.minutes !== 1 ? 's' : ''}`);
    if (d.seconds) parts.push(`${d.seconds} second${d.seconds !== 1 ? 's' : ''}`);

    return parts.join(', ');
}

function convertSeconds(totalSeconds: number): string {
    const secondsInMinute = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay; // Approximate month
    const secondsInYear = 365 * secondsInDay; // Approximate year

    const years = Math.floor(totalSeconds / secondsInYear);
    totalSeconds %= secondsInYear;

    const months = Math.floor(totalSeconds / secondsInMonth);
    totalSeconds %= secondsInMonth;

    const days = Math.floor(totalSeconds / secondsInDay);
    totalSeconds %= secondsInDay;

    const hours = Math.floor(totalSeconds / secondsInHour);
    totalSeconds %= secondsInHour;

    const minutes = Math.floor(totalSeconds / secondsInMinute);
    totalSeconds %= secondsInMinute;

    const seconds = totalSeconds;

    const time = {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    }

    return formatDuration(time);
}

export default convertSeconds;