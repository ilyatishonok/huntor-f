import { schema } from 'normalizr';
import _ from 'underscore';
import { tutoringSchema } from './tutoring';

export const tutorSchema = new schema.Entity('users', {
    tutoring: tutoringSchema,
}, {
    idAttribute: '_id',
});

export const tutorListSchema = new schema.Array(tutorSchema);