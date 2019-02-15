import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const allIdsSelector = (state: RootState) => state.entities.bookings;
const byIdBookingsSelector = () => [];

const getBookingsSelector = createSelector(
    allIdsSelector,
    byIdBookingsSelector,
    (allIds, byId) => {
        //return allIds.map(() => byId[id]);
        return [];
    }
);

export default getBookingsSelector;