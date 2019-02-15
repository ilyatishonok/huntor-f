import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import CalendarBookingsList from '../CalendarBookingsList';

export interface CalendarSideBarProps{
    selectedDate: Date | null;
    selectedBooking: {
        booking: string;
    };
}

class CalendarSideBar extends Component<CalendarSideBarProps> {
    render() {
        return (
            <div style={{
                width: '60%',
                margin: '20px',
            }}>
                {this.props.selectedDate ? <CalendarBookingsList /> : <div>Select a date</div>}
                {this.props.selectedBooking.booking && <div>Booking</div>}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    selectedDate: state.calendar.selectedDate,
    selectedBooking: state.calendar.selectedBooking,
});

export default connect(mapStateToProps)(CalendarSideBar);