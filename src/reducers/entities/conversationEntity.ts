import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface ConversationEntity {
    _id: string;
    users: string[];
}

const conversationEntityReducer = (state: NormalizedEntity<ConversationEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.reviews) {
                return merge(action.entities.reviews, state);
            }
            
            return state;
    }
}

export default conversationEntityReducer;