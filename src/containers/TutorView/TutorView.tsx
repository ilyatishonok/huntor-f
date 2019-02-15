import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { RootState } from '../../reducers';
import { withStyles } from '@material-ui/core';
import BookingModal from './BookingModal';
import { TutoringEntity } from '../../reducers/entities/tutoringEntity';
import { UserEntity } from '../../reducers/entities/userEntity';
import { fetchTutor, TutorsActions } from '../../actions/tutorsActions';

interface TutorViewProps {
    tutorId: string;
}

interface InjectableProps {
    isFetching: boolean;
    error: string;
    tutor: UserEntity;
    tutoring: TutoringEntity;
    fetchTutor: (id: string) => void;
}

const TutorHeader = styled.div`
    padding-bottom: 15;
`;

const TutorName = styled.h4`
    text-align: center;
`;

const BigAvatar = withStyles({
    root: {
        width: '100px',
        height: '100px',
        background: 'black',
    },
})(Avatar);

class TutorView extends Component<TutorViewProps & InjectableProps> {
    componentDidMount() {
        this.props.fetchTutor(this.props.tutorId);
    }

    render() {
        const { isFetching, tutor } = this.props;
        if (isFetching) {
            return <div>Loading...</div>;
        }

        if (tutor) {
            return (
                <React.Fragment>
                    <TutorHeader>
                        <Grid container justify="center" alignItems="center">
                            <BigAvatar>H</BigAvatar>
                            <Grid item xs={12}>
                                <TutorName>{tutor.firstname} {tutor.lastname}</TutorName>
                            </Grid>
                        </Grid>
                    </TutorHeader>
                    <BookingModal tutorId={this.props.tutorId} />
                </React.Fragment>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: RootState, ownProps: TutorViewProps) => ({
    isFetching: state.requests[`${ownProps.tutorId}/TUTOR`],
    error: state.tutors.error,
    tutor: state.entities.users[ownProps.tutorId],
    tutoring: state.entities.tutorings[ownProps.tutorId],
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, TutorsActions>) => ({
    fetchTutor: (id: string) => dispatch(fetchTutor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorView);