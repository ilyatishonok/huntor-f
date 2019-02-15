import { schema } from 'normalizr';

export const tutoringSchema = new schema.Entity('tutorings', {}, {
    idAttribute: (value, parent) => {
        return parent._id;
    }
});