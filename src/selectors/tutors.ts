import { createSelector } from 'reselect';
import { RootState } from '../reducers';

const listedTutorsSelector = (state: RootState) => state.tutors.items;
const usersSelector = (state: RootState) => state.entities.users;

export const getTutors = createSelector(
    usersSelector,
    listedTutorsSelector,
    (users, listedTutors) => {
        return listedTutors.map(tutorId => {
            return users[tutorId];
        });
    }
);