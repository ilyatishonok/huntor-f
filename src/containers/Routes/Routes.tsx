import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import Routes from '../../components/Routes/Routes';
import { RootState } from '../../reducers';
import { loadApp } from '../../actions/appActions';
import { Action } from 'redux';

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: !!state.auth.token,
    isAppLoaded: state.app.isAppLoaded, 
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
    loadApp: () => dispatch(loadApp()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));