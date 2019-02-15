import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TutorView from '../../../containers/TutorView';

export interface TutorViewMatchParams { 
    id: string;
}

export interface TutorViewScreenProps extends RouteComponentProps<TutorViewMatchParams> {
};

const TutorViewScreen = (props: TutorViewScreenProps) => {
    return (
        <TutorView tutorId={props.match.params.id} />
    )
}

export default TutorViewScreen;