import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { FilterTypes } from '../../enums/calendar';
import { Dispatch } from 'redux';
import Filter from '../../components/Calendar/Filter';
import { FiltersState } from '../../reducers/calendar';
import { addFilter, removeFilter } from '../../actions/calendarActions';

export interface CalendarFilterMappedProps {
    filters: FiltersState
    addFilter: (filter: string) => void;
    removeFilter: (filter: string) => void; 
}

const Header = styled.ul`
    flex-direction: row;
    padding: 0px;
    margin-top: 0px;
    margin-bottom: 10px;
    list-style: none;
    display: flex;
`;

const initialFilters = [
    {
        type: FilterTypes.SHOW_COMPLETED,
        text: 'Completed',
    },
    {
        type: FilterTypes.SHOW_IN_PROCESS,
        text: 'In process',
    },
    {
        type: FilterTypes.SHOW_MOVING_REQUESTS,
        text: 'Moving Requests',
    },
    {
        type: FilterTypes.SHOW_PENDING,
        text: 'Pending',
    }
];

const CalendarFilters = ({ filters, addFilter, removeFilter }: CalendarFilterMappedProps) => (
    <Header>
        {initialFilters.map(filter => {
            return <Filter
                key={filter.type}
                filterType={filter.type}
                text={filter.text}
                isActive={filters[filter.type]}
                addFilter={addFilter}
                removeFilter={removeFilter}
            />
        })}
    </Header>
)

const mapStateToProps = (state: RootState) => ({
    filters: state.calendar.filters,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addFilter: (filter: string) => dispatch(addFilter(filter)),
    removeFilter: (filter: string) => dispatch(removeFilter(filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarFilters);