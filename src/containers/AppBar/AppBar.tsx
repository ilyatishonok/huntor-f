import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import AppBar from '../../components/AppBar';

const mapStateToProps = (state: RootState) => ({
    path: state.router.location.pathname,
    isAuthenticated: !!state.auth.token,
    wallet: state.user.wallet,
});

export default connect(mapStateToProps)(AppBar);