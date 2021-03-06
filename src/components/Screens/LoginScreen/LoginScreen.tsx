import React from 'react';
import styled from 'styled-components';
import LoginForm from '../../../containers/Forms/SignInForm';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export const Paper = styled.div`
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px black;
`;

const LoginScreen = () => (
    <LoginContainer>
        <Paper>
            <LoginForm />
        </Paper>
    </LoginContainer>
);

export default LoginScreen;