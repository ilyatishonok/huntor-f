import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import MainScreen from '../Screens/MainScreen';
import AuthenticatedMainScreen from '../Screens/AuthenticatedMainScreen';
import AuthRoute from './AuthRoute';
import LoginScreen from '../Screens/LoginScreen';
import CoursesScreen from '../Screens/CoursesScreen';

interface RoutesProps {
    authenticated: boolean;
    role: string;
}

const hasRole = (role: string, roles: string[]) => {
    return roles.includes(role);
}

const Routes = ({ authenticated }: RoutesProps) => (
    <React.Fragment>
        <Switch>
            <AuthRoute path="/login" authenticated={authenticated} component={LoginScreen} />
            <Route path="/courses" component={CoursesScreen} />
            <Route exact path="/" component={authenticated ? AuthenticatedMainScreen : MainScreen} />
            <Route path="*" component={() => <div>not found</div>} />
        </Switch>
    </React.Fragment>
);

export default Routes;