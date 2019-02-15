import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import moment from 'moment';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { CalendarActions, selectBooking } from '../../actions/calendarActions';
import { RootState } from '../../reducers';
import { UserEntity } from '../../reducers/entities/userEntity';
import { BookingEntity } from '../../reducers/entities/bookingEntity';

export interface ListedBookingProps {
    booking: BookingEntity;
}

export interface ListedBookingMappedProps {
    role: string;
    user: UserEntity;
    selectBooking: (bookingId: string) => void;
}

const Booking = styled.div`
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    background: rebeccapurple;
    color: white;
    cursor: pointer;

    &:hover {
        background: green;
    }
`;

class ListedBooking extends React.Component<ListedBookingProps & ListedBookingMappedProps> {
    onBookingClick = () => {
        const { booking, selectBooking } = this.props;

        selectBooking(booking._id);
    }
    
    renderActions() {
        const { booking, role } = this.props;

        if (role === 'student') {
            return (
                <Button>Pay</Button>
            );
        }

        if (role === 'tutor') {
            return booking.status === 'pending' && <div>
                <Button>Accept</Button>
                <Button>Decline</Button>
                </div>;
        }
    }

    render() {
        const { booking, user } = this.props;

        return (
            <Booking>
                <div>Time: {moment(booking.startDate).local().format('HH:mm')} - {moment(booking.endDate).local().format('HH:mm')}</div>
                <div>Price: {booking.price}$</div>
                <div>Debt: {booking.debt}$</div>
                <div>Status: {booking.status}</div>
                <div>{user.firstname} {user.lastname}</div>
                {this.renderActions()}
            </Booking>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: ListedBookingProps) => {
    const { role } = state.user;

    return {
        role: role,
        user: state.entities.users[ownProps.booking[role === 'student' ? 'tutor' : 'student']],
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, CalendarActions>) => ({
    selectBooking: (bookingId: string) => dispatch(selectBooking(bookingId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListedBooking);