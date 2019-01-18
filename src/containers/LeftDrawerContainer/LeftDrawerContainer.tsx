import { connect } from 'react-redux';
import LeftDrawer from '../../components/AppBar/Drawer';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
    path: state.router.location.pathname,
});

export default connect(mapStateToProps)(LeftDrawer);