import React, { Component } from 'react';
import styled from 'styled-components';
import moment, { months } from 'moment';
import DayPicker, { DayModifiers } from 'react-day-picker';
import styles from './Calendar.module.css';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { changeSelectedDate, CalendarActions, fetchCalendarBookingsIfNeeded, changeMonth } from '../../actions/calendarActions';
import { ThunkDispatch } from 'redux-thunk';

interface CalendarProps {
    selectedDate: Date | null;
    isFetching: boolean;
    selectDate: (newDay: Date) => void;
    changeMonth: (month: Date) => void;
    fetchBookings: () => void; 
}

const CalendarWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

const LoaderWrapper = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
`;

class Calendar extends Component<CalendarProps> {
    onDayClick = (day: Date, modifiers: DayModifiers) => {
        if (modifiers[styles.disabled]) {
            return;
        }

        const { selectedDate, selectDate } = this.props;

        if (!selectedDate || !moment(selectedDate).isSame(day, 'day')) {
            selectDate(day);  
        }
    }

    componentDidMount() {
        this.props.fetchBookings();
    }

    renderDay = (day: Date) => {
        const date = day.getDate();
    

        return (
            <div>
                <div>
                    {date}
                </div>
            </div>
        );
    }

    render() {
        return (
            <CalendarWrapper>
                <DayPicker
                    renderDay={this.renderDay}
                    showOutsideDays
                    onMonthChange={(day) => {
                        this.props.changeMonth(day);
                    }}
                    selectedDays={this.props.selectedDate}
                    onDayClick={this.onDayClick}
                    classNames={styles as any}
                    todayButton='Today'
                />
            </CalendarWrapper>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    const currentMonth = state.calendar.currentMonth;
    const bookingsByMonth = state.calendar.bookingsByMonth[currentMonth.getTime()]
        || {
            items: [],
            didInvalidate: false,
            error: '',
        };
    const selectedDate = state.calendar.selectedDate;
    const isFetching = state.requests[`${currentMonth.getTime()}/CALENDAR`];

    return {
        bookings: bookingsByMonth.items,
        selectedDate,
        isFetching,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, CalendarActions>) => ({
    selectDate: (date: Date) => dispatch(changeSelectedDate(date)),
    changeMonth: (month: Date) => dispatch(changeMonth(month)),
    fetchBookings: () => dispatch(fetchCalendarBookingsIfNeeded()),
})


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
