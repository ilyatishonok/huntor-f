import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface UserEntity {
    firstname: string;
    lastname: string;
    middlename: string;
    tutoring?: string;
    _id: string;
}

const userEntityReducer = (state: NormalizedEntity<UserEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.users) {
                return merge(action.entities.users, state);
            }
            
            return state;
    }
}

export default userEntityReducer;