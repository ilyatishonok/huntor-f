import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { Button, withStyles } from '@material-ui/core';

const Content = styled.div`
    background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url('homeimage.jpg');
    height: 100%;
    overflow: auto;
    background-size: cover;
    background-position: center;
    width: 100%;
`;

const SiteTitle = styled.h1`
    text-align: center;
    font-weight: 400;
    font-size: 100px;
    font-family: "Nunito","Source Sans Pro",sans-serif;
    color: white;
`;

const SiteDescription = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledButton = withStyles({
    root: {
        color: 'white',
    }
})(Button);

const MainScreen = () => {
    return (
        <Content>
            <SiteTitle>Huntor</SiteTitle>
            <SiteDescription>
                <NavLink to="/signup">
                    <StyledButton>Sign Up</StyledButton>
                </NavLink>
                <NavLink to="/login">
                    <StyledButton>Sign In</StyledButton>
                </NavLink>
            </SiteDescription>
        </Content>
    );
}

export default MainScreen;