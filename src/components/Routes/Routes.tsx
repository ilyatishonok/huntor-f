import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
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
import TutorViewScreen from '../Screens/TutorViewScreen';
import CalendarScreen from '../Screens/CalendarScreen';
import BookingsScreen from '../Screens/BookingsScreen';

export interface RoutesProps extends RouteComponentProps {
    isAuthenticated: boolean;
    isAppLoaded: boolean;
    loadApp: () => void;
}

export default class Routes extends React.Component<RoutesProps> {
    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.loadApp();
        }
    }

    render() {
        console.log(this.props);
        if (!this.props.isAppLoaded) {
            return <div>Loading...</div>
        }

        return (
            <AppBarContainer>
                <Switch>
                    <ReverseRoute path="/login" component={LoginScreen} />
                    <PrivateRoute 
                        exact
                        path="/"
                        component={AuthenticatedMainScreen}
                        componentIfNotAuthenticated={MainScreen}
                    />
                    <PrivateRoute
                        path="/calendar"
                        component={CalendarScreen}
                    />
                    <PrivateRoute
                        path="/tutor/:id"
                        component={TutorViewScreen}
                        allowedRoles={['student']}
                    />
                    <PrivateRoute
                        path="/bookings"
                        component={BookingsScreen}
                    />
                    <Route path='/signup/tutor' component={TutorSignUpScreen} />
                    <AdminRoute path="/admin" component={AdminScreen} />
                    <Route path="*" component={() => <div>not found</div>} />
                </Switch>
            </AppBarContainer>
        )
    }
}