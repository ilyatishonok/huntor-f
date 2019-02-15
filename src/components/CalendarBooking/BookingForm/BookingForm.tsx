import React, { Component } from 'react';
import debounce from 'debounce';
import { withFormik, FormikProps } from 'formik';
import { default as ReactSelect } from 'react-select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { LabeledTutorSubject } from '../../../actions/formsActions/bookingFormActions';
import { Subject } from '../../../reducers/entities/tutoringEntity';
import { ValueType, OptionsType } from 'react-select/lib/types';
import { InputLabel, FormControl } from '@material-ui/core';

export interface BookingFormProps {
    tutorId: string;
    subjects: Subject[];
    selectedDate: Date;
    afterFormSubmited?: (values: BookingFormValues) => void;
    onCancel?: () => void;
}

export interface SubjectsLoadCallback<OptionType> {
    (options: OptionsType<OptionType>): void 
}

export interface BookingFormValues {
    startTime: number;
    subject: {
        label: string;
        value: string;
        price: number;
    };
    endTime: number;
    message: string;
}

//Move to utils
const generateTimesArray = () => {
    const quarterHours = ["00", "15", "30", "45"];

    let times = [];

    for(let i = 0; i < 24; i++){
        for(let j = 0; j < 4; j++){
            let time = i + ":" + quarterHours[j];

            if(i < 10) {
                time = "0" + time;
            }

            times.push({
                value: i * 60 + j*15,
                label: time,
            });
        }
    }

    return times;
}

const timesArray = generateTimesArray();

class BookingForm extends Component<BookingFormProps & FormikProps<BookingFormValues>> {

    protected handleAsyncSelectChange = (value: ValueType<{
        label: string;
        value: string;
    }>) => {
        this.props.setFieldValue('subject', value);
    }

    protected handleAsyncSelectBlur = () => {
        this.props.setFieldTouched('subject', true);
    }

    protected convertSubjects = () => {
        return this.props.subjects.map(subject => {
            return {
                label: `${subject.value} + ${subject.price}$`,
                value: subject._id,
                price: subject.price,
            };
        })
    }

    public render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;
        return (
            <form noValidate onSubmit={handleSubmit}>
                <Typography variant="h4">Book a Session</Typography>
                <FormControl fullWidth margin="normal">
                    <TextField
                        fullWidth
                        label="Message to Tutor"
                        name="message"
                        multiline
                        placeholder="Type your message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth required>
                    <ReactSelect 
                        onChange={this.handleAsyncSelectChange}
                        onBlur={this.handleAsyncSelectBlur}
                        value={values.subject.value ? values.subject : null}
                        options={this.convertSubjects()}
                    />
                </FormControl>
                <InputLabel htmlFor={"startTime"}>StartTime</InputLabel>
                <Select
                    fullWidth
                    required
                    name="startTime"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.startTime}
                >
                    {timesArray.map(time => {
                        return (
                            <MenuItem key={time.value} value={time.value}>{time.label}</MenuItem>
                        );
                    })}
                </Select>
                <Select
                    fullWidth
                    required
                    name="endTime"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.endTime}
                >
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={45}>45 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={75}>1 hour 15 minutes</MenuItem>
                    <MenuItem value={90}>1 hour 30 minutes</MenuItem>
                    <MenuItem value={105}>1 hour 45 minutes</MenuItem>
                    <MenuItem value={120}>2 hours 45 minutes</MenuItem>
                </Select>
                {!!values.endTime && values.subject.value && `${(values.subject.price/60 * values.endTime)}$`}
                <Button type="submit">Create Book</Button>
                <Button onClick={this.props.onCancel}>Cancel</Button>
            </form>
        );
    }
}

export default withFormik<BookingFormProps, BookingFormValues>({
    mapPropsToValues: props => {
        return {
            startTime: 0,
            subject: {
                label: '',
                value: '',
                price: 0,
            },
            endTime: 0,
            message: '',
        }
    },
    handleSubmit: (values, bag) => {
        
    }
})(BookingForm);
