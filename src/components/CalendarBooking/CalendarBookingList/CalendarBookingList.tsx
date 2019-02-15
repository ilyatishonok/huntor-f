import React from 'react';
import { ListedBooking } from '../../../reducers/calendarBooking';

export interface CalendarBookingListProps {
    bookings: ListedBooking[],
    isFetching: boolean;
}

export interface BookingListState {
    isAddBooking: boolean;
}

const CalendarBookingList = ({ isFetching, bookings }: CalendarBookingListProps) => {
    if (isFetching) {
        return (
            <div>Is fetching...</div>
        );
    }

    return (
        <div>
            <div>
                {bookings.map(booking => {
                    return <div>{booking.startDate}  { booking.endDate}</div>
                })}
            </div>
        </div>
    )
}

export default CalendarBookingList;
