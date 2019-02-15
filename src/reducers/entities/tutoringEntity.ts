import merge from 'lodash/fp/merge';
import { NormalizedEntity } from './entities';
import { EntitesActions } from '../../actions/entitiesActions';

export interface Question {
    _id: string;
    answer: string;
    question: string;
}

export interface Subject {
    _id: string;
    value: string;
    price: number;
    questions: Question[];
}

export interface TutoringEntity {
    subjects: Subject[];
    completedLessons: number;
    rating: number;
    aboutMe: string;
    aboutMySessions: string;
    education: string;
    birthday: string; 
    _id: string;
}

const tutoringEntityReducer = (state: NormalizedEntity<TutoringEntity> = {}, action: EntitesActions) => {
    switch (action.type) {
        default:
            if (action.entities && action.entities.tutorings) {
                return merge(action.entities.tutorings, state);
            }
            
            return state;
    }
}

export default tutoringEntityReducer;