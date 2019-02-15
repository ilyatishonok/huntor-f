import { FormikBag, FormikErrors } from 'formik';
import { SignInFormProps } from '../containers/Forms/SignInForm/SignInForm';
import { setUser } from './userActions';

interface SignInFormValues {
    email: string;
    password: string;
}

interface SignInResponse {
    success: boolean;
    errors: {
        email?: string;
        password?: string;
    }
    error?: string;
    token: string;
    refreshToken: string;
}

export const onFormSubmit = (values: SignInFormValues, bag: FormikBag<SignInFormProps, SignInFormValues>) => {
    bag.setError('');

    fetch('/api/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
        .then(res => res.json())
        .then((response: SignInResponse) => {
            if (!response.success) {
                const errors: FormikErrors<SignInFormValues> = response.errors;

                bag.setSubmitting(false);

                if (errors) {
                    bag.setErrors(errors);
                }

                return bag.setError(response.error);
            }

            localStorage.setItem('token', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
            bag.setSubmitting(false);
            bag.props.authenticateUser(response.token, response.refreshToken);
            bag.props.setAppState(false);
            bag.props.loadApp();
        }).catch(() => {
            bag.setSubmitting(false);
            bag.setError('Login failed.');
        })
}