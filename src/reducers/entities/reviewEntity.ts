import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface ReviewEntity {
    rating: number;
    student: string;
    _id: string;
    comment: string;
}

const reviewEntityReducer = (state: NormalizedEntity<ReviewEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.reviews) {
                return merge(action.entities.reviews, state);
            }
            
            return state;
    }
}

export default reviewEntityReducer;