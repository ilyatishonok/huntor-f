import { combineReducers } from 'redux';
import reviewEntityReducer, { ReviewEntity } from './reviewEntity';
import tutorEntityReducer, { TutoringEntity } from './tutoringEntity';
import bookingEntityReducer, { BookingEntity } from './bookingEntity';
import userEntityReducer, { UserEntity } from './userEntity';

export interface SubjectEntity {
    _id: string;
    questions: string[],
    price: number;
    value: string;
}

export interface NormalizedEntity<S> {
    [key: string]: S;
}

export interface EntitiesState {
    tutorings: NormalizedEntity<TutoringEntity>;
    reviews: NormalizedEntity<ReviewEntity>;
    bookings: NormalizedEntity<BookingEntity>;
    users: NormalizedEntity<UserEntity>
}


export default combineReducers<EntitiesState>({
    reviews: reviewEntityReducer,
    tutorings: tutorEntityReducer,
    users: userEntityReducer,
    bookings: bookingEntityReducer,
});