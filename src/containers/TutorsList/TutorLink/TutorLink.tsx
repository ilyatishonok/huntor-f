import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import StarRate from '@material-ui/icons/StarRate';
import styled from 'styled-components';
import { RootState } from '../../../reducers';
import { UserEntity } from '../../../reducers/entities/userEntity';
import { TutoringEntity } from '../../../reducers/entities/tutoringEntity';

export interface ListedTutorProps {
    tutorId: string;
    user: UserEntity;
}

export interface ListedTutorMappedProps {
    tutoring: TutoringEntity;
}

const TutorCard = styled.div`
    width: 200px;
    height: 100%;
    background: white;
    margin: 15px;
    margin-top: 30px;
    border-radius: 10px;
    text-align: center;
`;

const AnchorTop = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    top: -20px;
`;

const TutorFullName = styled.div`
    font-size: 20px;
    font-family: sans-serif;
`;

const TutorRating = styled.div`
    position: absolute;
    right: 5px;
    top: 20px;
`;

const TutorEducation = styled.div`
    font-size: 12px;
    padding-botton: 5px;
`;

const TutorSubjects = styled.div`
    margin-top: 5px;
    font-size: 15px;
`;

const TutorSubject = styled.div`
    color: green;
`;

const BigAvatar = withStyles({
    root: {
        height: '100px',
        width: '100px',
        background: 'black',
        margin: 'auto',
    },
})(Avatar);

const TutorLink = ({ tutoring, user, tutorId }: ListedTutorProps & ListedTutorMappedProps) => {
    return (
        <TutorCard>
            <AnchorTop>
                <BigAvatar>{user.firstname.charAt(0)}{user.lastname.charAt(0)}</BigAvatar>
                <TutorRating>
                    5 <StarRate fontSize={"small"} />
                </TutorRating>
            </AnchorTop>
           <TutorFullName>{user.firstname} {user.lastname}</TutorFullName>
           <TutorEducation>Life Sciences @ Massachusetts of Technology</TutorEducation>
           <Divider />
           <TutorSubjects>
               I can tutor: {tutoring.subjects.slice(0, 3).map((subject, index) => {
                   return (
                       <>
                            <TutorSubject>{subject.value}</TutorSubject>
                            {index !== 3 && ','}
                       </>
                   );
               })} {tutoring.subjects.length > 3 && `and ${tutoring.subjects.length - 3} others`}
           </TutorSubjects>
           <NavLink to={`/tutor/${tutorId}`}>
                <Button fullWidth>Start now</Button>
           </NavLink>
        </TutorCard>
    );
}


const mapStateToProps = (state: RootState, ownProps: ListedTutorProps) => ({
    tutoring: state.entities.tutorings[ownProps.tutorId],
});

export default connect(mapStateToProps)(TutorLink);