import { schema } from 'normalizr';
import { tutorSchema } from './tutor';
import { studentSchema } from './student';

export const bookingSchema = new schema.Entity('bookings', {
    tutor: tutorSchema,
    student: studentSchema,
}, {
    idAttribute: '_id',
});

export const bookingListSchema = new schema.Array(bookingSchema);