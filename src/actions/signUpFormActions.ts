import { FormErrors, AsyncValidateCallback } from 'redux-form';
/*import { Dispatch } from 'redux';
import { ISignUpFormValues } from '../components/SignUpForm';
import { FirstPageSignUpFormProps } from '../components/SignUpForm/SignUpFormFirstPage';

export interface ValidateResponse {
    exist: boolean;
}

export interface FormSubmissionResponse {

}

export const validateFirstPage = (values: ISignUpFormValues) => {
    const errors: FormErrors<ISignUpFormValues> = {};

    if (!values.email) {
        errors.email = 'This field is required';
    }

    if (!values.password) {
        errors.password = 'This field is required';
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = 'This field is required';
    }

    if (!values.role) {
        errors.role = 'This field is required';
    }

    if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'This field have to be equal as password field';
    }
    
    return errors;
}

export const validateSecondPage = (values: ISignUpFormValues) => {
    const errors: FormErrors<ISignUpFormValues> = {};

    if (!values.firstname) {
        errors.firstname = 'This field is required';
    }

    if (!values.lastname) {
        errors.lastname = 'This field is required';
    }

    if (!values.birthday) {
        errors.birthday = 'This field is required';
    }

    return errors;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values: ISignUpFormValues, ...rest: [Dispatch<any>, FirstPageSignUpFormProps & AsyncValidateCallback<ISignUpFormValues, FormErrors>, string]) => {
    const [, props, blurredField] = rest;

    const previousErrors = props.asyncErrors;
    //Find a way to handle this
    if (blurredField) {
        if (blurredField === 'email') {
            return fetch(`/api/user/validate/email?value=${values.email}`).
                then(res => res.json()).catch(() => {
                    throw { ...previousErrors, email: 'Error with validating field' };
                }).
                then(({ exist }: ValidateResponse) => {
                    if (exist) {
                        throw { ...previousErrors, email: 'User with this email is already exist'};
                    }

                    if (previousErrors) {
                        throw { ...previousErrors };
                    }
                })
        }

        if (blurredField === 'nickname') {
            return fetch(`/api/user/validate/username?value=${values.nickname}`).
                then(res => res.json()).
                then(({ exist }: ValidateResponse) => {
                    if (exist) {
                        throw { ...previousErrors, nickname: 'User with this nickname is already exist'};
                    }

                    if (previousErrors) {
                        throw { ...previousErrors };
                    }
                });
        }
    }

    return Promise.resolve();
}

export const onFormSubmit = (values: ISignUpFormValues) => {
    console.log('i work');
    return fetch('/api/user/create', {

    }).then(res => res.json()).
        then((data: FormSubmissionResponse) => {
            console.log(data);
        });
}*/