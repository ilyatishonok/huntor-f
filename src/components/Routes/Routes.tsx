import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import MainScreen from '../Screens/MainScreen';
import TutorSignUpScreen from '../Screens/TutorSignUpScreen';
import AuthenticatedMainScreen from '../Screens/AuthenticatedMainScreen';
import PrivateRoute from './PrivateRoute';
import ReverseRoute from './ReverseRoute';
import AppBarContainer from '../../containers/AppBar';
import AdminRoute from './AdminRoute';
import LoginScreen from '../Screens/LoginScreen';
import AdminScreen from '../Screens/AdminScreen';

export interface RoutesProps {
    isAuthenticated: boolean;
    isAppLoaded: boolean;
    loadApp: () => void;
}

/*
<PrivateRoute path="/courses" allowedRoles={['student', 'tutor']} component={CoursesScreen} />
            <PrivateRoute 
                exact
                path="/"
                allowedRoles={['student, tutor']}
                component={AuthenticatedMainScreen}
                componentIfNotAuthenticated={MainScreen}
            />*/

export default class Routes extends React.Component<RoutesProps> {
    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.loadApp();
        }
    }

    render() {
        if (!this.props.isAppLoaded) {
            return <div>loading...</div>
        }

        return (
            <React.Fragment>
                <AppBarContainer />
                <Switch>
                    <ReverseRoute path="/login" component={LoginScreen} />
                    <PrivateRoute 
                        exact
                        path="/"
                        allowedRoles={['student, tutor']}
                        component={AuthenticatedMainScreen}
                        componentIfNotAuthenticated={MainScreen}
                    />
                    <Route path='/signup/tutor' component={TutorSignUpScreen} />
                    <AdminRoute path="/admin" component={AdminScreen} />
                    <Route path="*" component={() => <div>not found</div>} />
                </Switch>
            </React.Fragment>
        )
    }
}