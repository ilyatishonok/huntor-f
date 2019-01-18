import React, { Component } from 'react';
import { ICourse } from '../../store/types/courses';
import Course from './Course/Course';
import CoursesContainer from '../../containers/CoursesContainer';

interface CoursesProps {
    role: string;
    isFetching: boolean;
    error: string;
    courses: ICourse[];
    getCourses: () => void;
}

class Courses extends Component<CoursesProps> {
    componentWillMount() {
        this.props.getCourses();
    }

    render() {

        if (this.props.isFetching) {
            return <div>Loading</div>;
        }

        if (!this.props.courses.length) {
            return <div>No courses</div>
        }

        return (
            <div>
                {this.props.courses.map(course => {
                    return <Course
                        title={course.title}
                        description={course.description}
                    />
                })}
            </div>

        )
    }
}

export default Courses;