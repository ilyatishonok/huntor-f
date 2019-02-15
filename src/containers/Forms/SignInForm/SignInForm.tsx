import React from 'react';
import { withFormik, FormikProps, FormikErrors } from 'formik';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { onFormSubmit } from '../../../actions/loginFormActions';
import { authenticateUser } from '../../../actions/authActions';
import { setAppState, loadApp } from '../../../actions/appActions';
import { RootState } from '../../../reducers';

export const Error = styled.div`
    color: red;
`;

export interface SignInFormValues {
    email: string;
    password: string;
}

export interface SignInFormProps {
    authenticateUser: (token: string, refreshToken: string) => void;
    setAppState: (isLoaded: boolean) => void;
    redirect: (path: string) => void;
    loadApp: () => void;
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

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
    redirect: (path: string) => dispatch(push(path)),
    setAppState: (isLoaded: boolean) => dispatch(setAppState(isLoaded)),
    loadApp: () => dispatch(loadApp()),
    authenticateUser: (token: string, refreshToken: string) => dispatch(authenticateUser(token, refreshToken)),
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