import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const birthdays = {
  3: ['Mirko', 'Gianni'],
  8: ['Elena'],
  9: ['Irene'],
  12: ['Paolo', 'Giorgia'],
  18: ['Claudia'],
  22: ['Maria', 'Luigi'],
  25: ['Simone'],
  26: ['Marta'],
};

function renderDay(day: Date) {
  const date = day.getDate();
  const dateStyle = {
    position: 'absolute',
    color: 'lightgray',
    bottom: 0,
    right: 0,
    fontSize: 20,
  };
  const birthdayStyle = { fontSize: '0.8em', textAlign: 'left' };
  const cellStyle = {
    height: 50,
    width: 60,
    position: 'relative',
  };
  return (
    <div>{day.toDateString()}</div>
  );
}

export default function Example() {
  return (
    <DayPicker
        className="Birthdays"
        renderDay={renderDay}
        todayButton='Today'
        renderWeek={() => { return <div>Hello asdffd  </div>}}
    />
  );
}