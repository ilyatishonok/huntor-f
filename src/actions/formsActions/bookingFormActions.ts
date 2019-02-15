import axios, { AxiosResponse } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { FormikBag } from 'formik';
import { RootState } from '../../reducers';
import { BookingFormValues, BookingFormProps, SubjectsLoadCallback } from '../../components/CalendarBooking/BookingForm/BookingForm';
import { CalendarBookingActionTypes } from '../../enums/calendarBooking';

export interface GetTutorSubjectResponse {
    success: boolean;
    message?: string;
    subjects: [{
        value: string;
        _id: string;
    }]
}

export interface BookSessionResponse {
    success: boolean;
}

export interface LabeledTutorSubject {
    label: string;
    value: string;
}

export interface FetchTutorSubjectsRequestAction {
    type: CalendarBookingActionTypes.FETCH_TUTOR_SUBJECTS_REQUEST;
}

export interface FetchTutorSubjectsSuccessAction {
    type: CalendarBookingActionTypes.FETCH_TUTOR_SUBJECTS_SUCCESS;
    payload: LabeledTutorSubject[];
}

export const getFilteredTutorSubjects = (filter: string, tutorId: string, callback: SubjectsLoadCallback<LabeledTutorSubject>): ThunkAction<void, RootState, void, Action> => {
    return async () => {
        const response: AxiosResponse<GetTutorSubjectResponse> = await axios.get(`/api/tutors/${tutorId}/subjects`, {
            params: {
                filter,
            },
        });

        callback(response.data.subjects.map(subject => {
            return {
                label: subject.value,
                value: subject._id, 
                price: 10,
            };
        }));
    }
}

export const bookSession = async (values: BookingFormValues, bag: FormikBag<BookingFormValues, BookingFormProps>) => {
    //const response: AxiosResponse<BookSessionResponse> = await axios.post(`/api/book/${bag.props.`)
}