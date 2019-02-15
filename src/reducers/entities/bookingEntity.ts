import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface BookingEntity {
    _id: string;
    status: string;
    startDate: Date;
    endDate: Date;
    debt: number;
    price: number;
    tutor: string;
    student: string;
    tutorTime: Date[];
}

const bookingEntityReducer = (state: NormalizedEntity<BookingEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.bookings) {
                return merge(action.entities.bookings, state);
            }
            
            return state;
    }
}

export default bookingEntityReducer;