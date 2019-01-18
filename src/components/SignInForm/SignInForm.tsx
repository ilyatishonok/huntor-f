import React from 'react';
import { withFormik, FormikProps, FormikErrors } from 'formik';



const validate = (values: LogInFormValues) => {
    const errors: FormikErrors<LogInFormValues> = {};

    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

interface LogInFormValues {
    email: string;
    password: string;
}

class SignInForm extends React.Component<FormikProps<LogInFormValues>> {
    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          } = this.props;
          return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                />
                {touched.email && errors.email && <div>{errors.email}</div>}
                <input 
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                />
                {touched.password && errors.password && <div>{errors.password}</div>}
                <button disabled={isSubmitting} type="submit">Submit</button>
            </form>
        );
    }
}

export default withFormik<{}, LogInFormValues>({
    mapPropsToValues: () => {
        return {
            email: '',
            password: '',
        };
    },
    validate: (values: LogInFormValues) => {
        const errors: FormikErrors<LogInFormValues> = {};

        if (!values.email) {
            errors.email = 'Required';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, bag) => {
        bag.setStatus({error: "error"});
        bag.setSubmitting(false);
    }
})(SignInForm);