import React from 'react';
import withAppBar from '../../withAppBar';
import AccessControl from '../../../containers/AccessControl';
import CoursesContainer from '../../../containers/CoursesContainer';

interface CoursesScreenProps  {
    role: string;
}

const CoursesScreen = ({ role }: CoursesScreenProps) => (
    <CoursesContainer role={role} />
);

const CoursesScreenWithAppBar = withAppBar(CoursesScreen);

const CoursesWithAuthorization = () => (
    <AccessControl allowedRoles={['tutor', 'student']}>
        {(role) => {
            return <CoursesScreenWithAppBar role={role} />
        }}
    </AccessControl>
);

export default CoursesWithAuthorization;