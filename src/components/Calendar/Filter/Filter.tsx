import React from 'react';
import styled from 'styled-components';

export interface FilterProps {
    isActive: boolean;
    text: string;
    filterType: string;
    addFilter: (filter: string) => void;
    removeFilter: (filter: string) => void;
}

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

const Filter = ({ isActive, addFilter, removeFilter, text, filterType }: FilterProps) => (
    <Tab selected={isActive} onClick={() => {
        isActive ? removeFilter(filterType) : addFilter(filterType);
    }}>
        {text}
    </Tab>
);

export default Filter;