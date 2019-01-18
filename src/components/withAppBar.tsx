import React from 'react';
import styled from 'styled-components'
import AppBar, { ToolBar } from './AppBar';

const Container = styled.div`
    display: flex;
`;

const Content = styled.div`
    flex-grow: 1;
    padding: 10px;
`;

export default function withAppBar<T>(Component: React.ComponentType<T>) {
    return (props: T) => (
        <Container>
            <AppBar />
            <Content>
                <ToolBar />
                <Component {...props} />
            </Content>
        </Container>
    )
}