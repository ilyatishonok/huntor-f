import moment from 'moment';

const WEEK_LENGTH = 6;

export default (month: Date) => {
    let startOfMonthInterval = moment(month);
    let endOfMonthInterval = moment(new Date(month.getFullYear(), month.getMonth() + 1, 0)).endOf('day')
    const startOfMonthIntervalDayNumber = endOfMonthInterval.day();
    const endOfMonthIntervalDayNumber = endOfMonthInterval.day();

    if (WEEK_LENGTH - startOfMonthIntervalDayNumber !== WEEK_LENGTH) {
        startOfMonthInterval.subtract(Math.abs(0 - startOfMonthIntervalDayNumber), 'd');
    }

    if (WEEK_LENGTH - endOfMonthIntervalDayNumber !== 0) {
        endOfMonthInterval.add(WEEK_LENGTH - endOfMonthIntervalDayNumber, 'd');
    }

    return {
        startDate: startOfMonthInterval.toDate(),
        endDate: endOfMonthInterval.toDate(),
    };
}