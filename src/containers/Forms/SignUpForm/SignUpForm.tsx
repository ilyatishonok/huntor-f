import React, { Component } from 'react';
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps } from 'redux-form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchEducations } from '../../../actions/educationsActions';
import { RootState } from '../../../reducers';
import { ISubject, SubjectsActions } from '../../../store/types/subjects';
import { IEducation, EducationActions } from '../../../store/types/education';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

export interface TutorSignUpFormValues {
    email: string;
    firstname: string;
    lastname: string;
    education: string;
    middlename: string;
    password: string;
}

interface MappedProps {
    educations: IEducation[],
    isEducationsFetching: boolean;
    educationsError: string;
}

interface SelectObject {
    _id: string;
    title: string;
}

interface MappedDispatchProps {
    fetchEducations: () => void;
}

export type TutorSignUpFormProps = MappedProps & MappedDispatchProps;

const Error = styled.div`
    color: red;
`;

class TutorSignUpForm extends Component<TutorSignUpFormProps & InjectedFormProps<TutorSignUpFormValues, TutorSignUpFormProps>> {
    componentDidMount() {
        this.props.fetchEducations();
    }

    renderField = (fieldProps: WrappedFieldProps & { 
        label: string;
        type: string;
        required: boolean;
        fullWidth?: boolean;
    }) => {
        const { input, label, fullWidth, type, required, meta: { touched, error }} = fieldProps;

        return (
            <FormControl margin="normal" fullWidth={fullWidth}>
                <TextField
                    {...input}
                    error={touched && !!error}
                    required={required}
                    type={type}
                    label={label}
                    placeholder={type !== 'date' ? label : ''}
                    variant="outlined"
                />
                {touched && error && <Error>{error}</Error>}
            </FormControl>
        )
    }

    renderSelectField = (fieldProps: WrappedFieldProps & {
        label: string;
        id: string;
        fullWidth?: boolean;
        required?: boolean;
        data: SelectObject[];
    }) => {
        const { input, label, fullWidth, required, data, id, meta: { touched, error }} = fieldProps;

        return (
            <FormControl margin="normal" fullWidth={fullWidth} required={required}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <Select
                    {...input}
                    variant="outlined"
                    inputProps={{
                        id,
                    }}
                >
                    {data.map((item) => {
                        return <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem> 
                    })}
                </Select>
                {touched && error && <Error>{error}</Error>}
            </FormControl>
        )
    }

    render() {
        const { handleSubmit, isEducationsFetching } = this.props;

        return (
            <form onSubmit={handleSubmit} noValidate>
                <Avatar>
                    <LockIcon />
                </Avatar>
                <Typography variant="headline">Tutor Sign Up</Typography>
                <Field
                    name="firstname"
                    type="text"
                    required
                    component={this.renderField}
                    label="Firstname"
                />
                <Field
                    name="lastname"
                    type="text"
                    required
                    component={this.renderField}
                    label="Lastname"
                />
                <Field
                    name="email"
                    type="text"
                    required
                    fullWidth
                    component={this.renderField}
                    label="Email"
                />
                <Field
                    name="birthday"
                    type="date"
                    required
                    fullWidth
                    component={this.renderField}
                    label="Birthday"
                />
                <Field
                    name="education"
                    label="Educations"
                    disabled={isEducationsFetching}
                    fullWidth
                    required
                    id="education"
                    data={this.props.educations}
                    component={this.renderSelectField}
                />
                <Field
                    name="password"
                    type="password"
                    required
                    fullWidth
                    component={this.renderField}
                    label="Password"
                />
                <Button fullWidth color="primary" type="submit">Sign Up</Button>
            </form>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    educations: state.educations.data,
    isEducationsFetching: state.educations.isFetching,
    educationsError: state.educations.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, SubjectsActions | EducationActions>) => ({
    fetchEducations: () => dispatch(fetchEducations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<TutorSignUpFormValues, TutorSignUpFormProps>({
        form: 'signUpForm',
    })(TutorSignUpForm)
);