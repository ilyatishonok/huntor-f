import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { fetchTutors, TutorsActions } from '../../actions/tutorsActions';
import { RootState } from '../../reducers';
import TutorLink from './TutorLink';
import { UserEntity } from '../../reducers/entities/userEntity';
import { getTutors } from '../../selectors/tutors';

export interface TutorsListMappedProps {
    isFetching: boolean;
    tutors: UserEntity[];
    loadTutors: () => void;
}

class TutorsList extends Component<TutorsListMappedProps> {
    componentDidMount() {
        this.props.loadTutors();
    }

    render() {
        const { tutors, isFetching } = this.props;

        if (isFetching) {
            return <div>Is fetching...</div>
        }
        return (
            <>
                <GridList cellHeight={180} >
                    {tutors.map(tutor => {
                        return (
                            <React.Fragment>
                                <GridListTile key={tutor._id}>
                                    <TutorLink user={tutor} tutorId={tutor._id} />
                                </GridListTile>
                            </React.Fragment>
                        );
                    })}
                </GridList>
                {isFetching && <div>...Loading</div>}
            </>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    isFetching: state.requests['TUTORS'],
    tutors: getTutors(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, TutorsActions>) => ({
    loadTutors: () => dispatch(fetchTutors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorsList);