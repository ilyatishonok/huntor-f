import { schema } from 'normalizr';

export const reviewSchema = new schema.Entity('reviews', {}, {
    idAttribute: '_id',
});

export const reviewsListSchema = new schema.Array(reviewSchema);