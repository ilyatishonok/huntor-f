import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { selectedDateBookings, bookingsByIdSelector } from '../../selectors/calendar';
import { BookingEntity } from '../../reducers/entities/bookingEntity';
import ListedBooking from '../ListedBooking';

export interface CalendarBookingsListProps {
    bookings: BookingEntity[];
}

class CalendarBookingsList extends Component<CalendarBookingsListProps> {
    render() {
        return (
            <div>
                {this.props.bookings.map(booking => {
                    return <ListedBooking key={booking._id} booking={booking} />
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    bookings: selectedDateBookings(state),
});

export default connect(mapStateToProps)(CalendarBookingsList);