import React from 'react';

interface CourseProps {
    id?: string;
    title: string;
    description: string;
    tutor?: {
        id: string;
        email: string;
        name: string;
    }
}

const Course = (props: CourseProps) => {
    return (
        <div>
            <div>{props.id}</div>
            <div>{props.title}</div>
            <div>{props.description}</div>
        </div>
    )
}

export default Course;