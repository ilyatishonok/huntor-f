import React, { Component } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import styles from './BookingCalendar.module.css';

interface BookingCalendarProps {
    selectedDate?: Date,
    onDayChangeHandler: (newDay: Date) => void; 
}

export default class BookingCalendar extends Component<BookingCalendarProps> {
    onDayClick = (day: Date, modifiers: DayModifiers) => {
        if (modifiers[styles.disabled]) {
            return;
        }

        const { selectedDate, onDayChangeHandler } = this.props;

        const time = selectedDate ? selectedDate.getTime() : null;

        if (day.getTime() !== time) {
            onDayChangeHandler(day);  
        }
    }

    render() {
        return (
            <DayPicker
                fromMonth={new Date()}
                selectedDays={this.props.selectedDate}
                disabledDays={[{
                    before: new Date(),
                }]}
                onDayClick={this.onDayClick}
                classNames={styles as any}
                todayButton='Today'
            />
        );
    }
}
