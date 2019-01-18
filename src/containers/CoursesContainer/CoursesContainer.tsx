import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchCourses } from '../../actions/coursesActions';
import Courses from '../../components/Courses';
import { RootState } from '../../reducers';
import { CoursesActions } from '../../store/types/courses';

const mapStateToProps = (state: RootState) => ({
    courses: state.courses.data,
    isFetching: state.courses.isFetching,
    error: state.courses.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, CoursesActions>) => ({
    getCourses: () => dispatch(fetchCourses()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);