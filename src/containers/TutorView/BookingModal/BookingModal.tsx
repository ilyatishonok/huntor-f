import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core';
import CalendarBooking from '../../CalendarBooking';


export interface BookingModalProps {
    tutorId: string;
}

export interface BookingModalState {
    isOpen: boolean;
}

const Paper = styled.div`
    display: flex;
    width: 500px;
    padding: 30px;
    background: white;
    margin: auto;
`;

const FlexibaleModal = withStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
})(Modal);

class BookingModal extends Component<BookingModalProps, BookingModalState> {
    state = {
        isOpen: false,
    }

    handleOpen = () => {
        this.setState({
            isOpen: true,
        });
    }

    render() {
        return (
            <>
                <FlexibaleModal
                    open={this.state.isOpen}
                    onClose={() => this.setState((state) => ({
                        isOpen: !state.isOpen,
                    }))}
                >
                    <Paper>
                        <CalendarBooking tutorId={this.props.tutorId} />
                    </Paper>
                </FlexibaleModal>
                <button onClick={this.handleOpen}>Book Room</button>
            </>
        );
    }
}

export default BookingModal;