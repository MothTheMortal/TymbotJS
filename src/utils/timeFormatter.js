module.exports = async function formatTimeDuration(days, hours, seconds) {
    let totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + seconds;

    let result = '';

    if (totalSeconds >= 24 * 60 * 60) {
        let days = Math.floor(totalSeconds / (24 * 60 * 60));
        totalSeconds %= 24 * 60 * 60;
        result += days + (days === 1 ? ' day ' : ' days ');
    }

    if (totalSeconds >= 60 * 60) {
        let hours = Math.floor(totalSeconds / (60 * 60));
        totalSeconds %= 60 * 60;
        result += hours + (hours === 1 ? ' hour ' : ' hours ');
    }

    if (totalSeconds >= 60) {
        let minutes = Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
        result += minutes + (minutes === 1 ? ' minute ' : ' minutes ');
    }

    if (totalSeconds > 0) {
        result += totalSeconds + (totalSeconds === 1 ? ' second' : ' seconds');
    }

    return result;
}