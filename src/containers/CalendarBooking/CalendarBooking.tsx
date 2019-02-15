import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import BookingCalendar from '../../components/CalendarBooking/BookingCalendar';
import { RootState } from '../../reducers';
import { clearData, fetchBookingsIfNeeded, selectDate, fetchBookings } from '../../actions/calendarBookingActions';
import { ListedBooking } from '../../reducers/calendarBooking';
import { Subject } from '../../reducers/entities/tutoringEntity';
import CalendarBookingList from '../../components/CalendarBooking/CalendarBookingList';
import BookingForm from '../../components/CalendarBooking/BookingForm';

export interface CalendarBookingProps {
    tutorId: string;
}

export interface InjectableProps {
    selectedDate: Date;
    bookings: ListedBooking[],
    isFetching: boolean;
    subjects: Subject[];
    clearData: (tutorId: string) => void;
    fetchBookingsIfNeeded: (selectedDate: Date, tutorId: string) => void;
    selectDate: (selectedDate: Date, tutorId: string) => void;
}

export interface CalendarBookingState {
    isDisplayBookingForm: boolean;
    isBooked: boolean;
}

class CalendarBooking extends Component<CalendarBookingProps & InjectableProps, CalendarBookingState> {
    state = {
        isDisplayBookingForm: false,
        isBooked: false,
    }

    handleDayChange = (selectedDate: Date) => {
        const { tutorId, selectDate } = this.props;

        selectDate(selectedDate, tutorId);
        this.props.fetchBookingsIfNeeded(selectedDate, tutorId);
    }

    onAddBookingBtnClick = () => {
        this.setState({
            isDisplayBookingForm: true,
        });
    }

    onBookingFormCancel = () => {
        this.setState({
            isDisplayBookingForm: false,
        });
    }

    componentDidMount = () => {
        this.props.fetchBookingsIfNeeded(this.props.selectedDate, this.props.tutorId);
    }

    componentWillUnmount = () => {
        this.props.clearData(this.props.tutorId);
    }

    render() {
        const { isDisplayBookingForm, isBooked } = this.state;
        const { selectedDate, bookings, isFetching } = this.props;

        if (isBooked) {
            return (
                <div>
                    You successfuly booked a session.
                </div>
            )
        }

        if (isDisplayBookingForm) {
            return (
                <BookingForm
                    selectedDate={this.props.selectedDate}
                    tutorId={this.props.tutorId}
                    onCancel={this.onBookingFormCancel} 
                    subjects={this.props.subjects}
                />
            );
        }

        return (
            <React.Fragment>
                <BookingCalendar
                    selectedDate={selectedDate}
                    onDayChangeHandler={this.handleDayChange}
                />
                <div>
                    {selectedDate 
                        ? 
                            <>
                                <button disabled={isFetching} onClick={this.onAddBookingBtnClick}>Add booking</button>
                                <CalendarBookingList bookings={bookings} isFetching={isFetching} />
                            </>
                        : <div>No booking selected</div> 
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: CalendarBookingProps) => {
    const { selectedDate, items: bookings } = state.calendarBooking[ownProps.tutorId] || {
        selectedDate: new Date(),
        items: [],
    };
    const isFetching = state.requests[`${ownProps.tutorId}/CALENDAR_BOOKINGS`];

    return {
        selectedDate,
        bookings,
        isFetching,
        subjects: state.entities.tutorings[ownProps.tutorId].subjects,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
    fetchBookingsIfNeeded: (selectedDay: Date, tutorId: string) => dispatch(fetchBookingsIfNeeded(selectedDay, tutorId)),
    selectDate: (selectedDate: Date, tutorId: string) => dispatch(selectDate(tutorId, selectedDate)),
    clearData: (tutorId: string) => dispatch(clearData(tutorId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBooking);