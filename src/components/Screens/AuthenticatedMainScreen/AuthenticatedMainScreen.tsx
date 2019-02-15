import React, { ReactNode } from 'react';
import TutorsList from '../../../containers/TutorsList';

interface AuthenticatedMainScreenProps {
    role: string;
}

const AuthenticatedMainScreen = ({ role }: AuthenticatedMainScreenProps) => {
    if (role === 'student') {
        return <TutorsList />
    }

    return null;
}

export default AuthenticatedMainScreen;