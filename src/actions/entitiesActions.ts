import { EntitiesActionTypes } from '../enums/entities';
import { EntitiesState } from '../reducers/entities/entities';

export interface MergeEntitiesAction {
    type: EntitiesActionTypes.MERGE_ENTITIES;
    entities: Partial<EntitiesState>;
}

export const mergeEntites = (entities: Partial<EntitiesState>): MergeEntitiesAction => ({
    type: EntitiesActionTypes.MERGE_ENTITIES,
    entities,
});

export type EntitesActions = MergeEntitiesAction;