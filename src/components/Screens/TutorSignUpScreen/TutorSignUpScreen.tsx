import React from 'react';
import styled from 'styled-components';
import TutorSignUpForm from '../../../containers/Forms/SignUpForm';

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const Paper = styled.div`
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px black;
`;

const TutorSignUpScreen = () => (
    <SignUpContainer>
        <Paper>
            <TutorSignUpForm />
        </Paper>
    </SignUpContainer>
);

export default TutorSignUpScreen;