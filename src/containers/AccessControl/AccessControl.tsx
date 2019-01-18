import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import AccessControl from '../../components/AccessControl';

const mapStateToProps = (state: RootState) => ({
    role: state.auth.role,
});

export default connect(mapStateToProps)(AccessControl);