import { createSelector } from 'reselect';
import moment from 'moment';
import { RootState } from '../reducers';

export const bookingsByMonthSelector = (state: RootState) => {
    const { currentMonth, bookingsByMonth } = state.calendar; 

    const bookingsCurrentMonth = bookingsByMonth[currentMonth.getTime()];

    return bookingsCurrentMonth ? bookingsCurrentMonth.items : [];
}

export const selectedDateSelector = (state: RootState) => state.calendar.selectedDate;
export const bookingsByIdSelector = (state: RootState) => state.entities.bookings;
export const filtersSelector = (state: RootState) => state.calendar.filters;

export const bookingsByMonth = createSelector(
    bookingsByIdSelector,
    bookingsByMonthSelector,
    (bookingsById, bookingsByMonthItems) => {
        return bookingsByMonthItems.map(bookingId => {
            return bookingsById[bookingId];
        });
    }
);

export const bookingsSelector = createSelector(
    bookingsByIdSelector,
    (bookingsById) => {
        return Object.keys(bookingsById).map(bookingId => {
            return bookingsById[bookingId];
        })
    }
)

export const selectedDateBookings = createSelector(
    selectedDateSelector,
    bookingsSelector,
    (selectedDate, bookings) => {
        if (!selectedDate) {
            return [];
        }

        const momentSelectedDate = moment(selectedDate);

        return bookings.filter(booking => {
            const { startDate, endDate } = booking;

            return momentSelectedDate.isSame(startDate, 'day') 
                || momentSelectedDate.isSame(endDate, 'day');
        })
    }
);

export const filteredBookingBySelectedDate = createSelector(
    selectedDateBookings,
    filtersSelector,
    (bookingsBySelectedDate, filters) => {
        return bookingsBySelectedDate;
    }
);