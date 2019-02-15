import React from 'react';
import styled from 'styled-components';
import Calendar from '../../../containers/Calendar';
import { ComponentInjectableProps } from '../../Routes/PrivateRoute/PrivateRoute';
import CalendarSideBar from '../../../containers/CalendarSideBar';
import CalendarFilters from '../../../containers/CalendarFilters';

const Wrapper = styled.div`
    display: flex;
`;

const Container = styled.div`
    border: 1px solid black;
    background: white;
    padding-top: 0px;
`;

const Header = styled.ul`
    flex-direction: row;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 10px;
    list-style: none;
    display: flex;
`;

const Tab = styled.li<{
    selected?: boolean;
}>`
    padding: 10px;
    font-family: monospace;
    user-select: none;
    border: 1px solid black;
    background: ${props => props.selected ? 'rebeccapurple' : 'black'};
    cursor: pointer;
    color: white;
    width: 33%;
    text-align: center;
    &:hover {
        background: green;
    }
`;

class CalendarScreen extends React.Component<ComponentInjectableProps<{}>> {

    render() {
        return (
            <Container>
                <CalendarFilters />
                <Wrapper>
                    <Calendar />
                    <CalendarSideBar />
                </Wrapper>
            </Container>
        )
    }
}

export default CalendarScreen;