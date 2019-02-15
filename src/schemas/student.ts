import { schema } from 'normalizr';

export const studentSchema = new schema.Entity('users', {}, {
    idAttribute: '_id',
});
