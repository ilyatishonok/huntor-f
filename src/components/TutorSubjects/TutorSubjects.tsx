import React, { Component } from 'react';
import styled from 'styled-components';

export interface ITutorSubject {
    value: string;
    price: number;
    _id: string;
}

export interface TutorSubjectsProps {
    subjects: ITutorSubject[],   
}

export interface TutorsSubjectState {
    isVisible: boolean;
}

export default class TutorSubjects extends Component<TutorSubjectsProps, TutorsSubjectState> {
    state = {
        isVisible: false,
    }

    onSubjectsButtonClick = () => {
        this.setState(state => ({
            isVisible: !state.isVisible,
        }));
    }

    render() {
        const { isVisible } = this.state;
        const { subjects } = this.props;
        
        return (
            <div>
                { isVisible && subjects.map(subject => {
                    return <div key={subject._id}>{subject.value} - {subject.price}</div>;
                })}
                <button onClick={this.onSubjectsButtonClick}>{isVisible ? 'Hide' : 'Subjects'}</button>
            </div>
        )
    }
}