import React from 'react';
import { withFormik, FormikProps, FormikErrors } from 'formik';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { onFormSubmit } from '../../../actions/loginFormActions';
import { setUser } from '../../../actions/userActions';
import { UserState } from '../../../store/types/user';

export const Error = styled.div`
    color: red;
`;

export interface SignInFormValues {
    email: string;
    password: string;
}

export interface SignInFormProps {
    setUser: (user: UserState) => void;
    redirect: (path: string) => void;
}

class SignInForm extends React.Component<FormikProps<SignInFormValues> & SignInFormProps> {
    render() {
        const {
            values,
            touched,
            error,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          } = this.props;
          console.log(this.props);

          return (
                <form onSubmit={handleSubmit}>
                    <Typography>Sign In</Typography>
                    <TextField
                        required
                        label="Email"
                        margin="normal"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        name="email"
                        fullWidth
                    />
                    {touched.email && errors.email && <Error>{errors.email}</Error>}
                    <TextField
                        required
                        label="Password"
                        margin="normal"
                        type="password"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        name="password"
                        fullWidth
                    />
                    {touched.password && errors.password && <Error>{errors.password}</Error>}
                    {error && <Error>{error}</Error>}
                    <Button fullWidth color="primary" disabled={isSubmitting} type="submit">Sign In</Button>
                </form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    redirect: (path: string) => dispatch(push(path)),
    setUser: (user: UserState) => dispatch(setUser(user)),
})

export default connect(
    null,
    mapDispatchToProps
)(
    withFormik<SignInFormProps, SignInFormValues>({
        mapPropsToValues: () => {
            return {
                email: '',
                password: '',
            };
        },
        validate: (values: SignInFormValues) => {
            const errors: FormikErrors<SignInFormValues> = {};
    
            if (!values.email) {
                errors.email = 'Required';
            }
    
            if (!values.password) {
                errors.password = 'Required';
            }
    
            return errors;
        },
        handleSubmit: onFormSubmit,
    })(SignInForm)
);