import React, { Component, ComponentType } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';

interface PrivateRouteInjectProps {
    role: string;
    isAdmin: boolean;
}

interface AuthRouteProps extends RouteProps, PrivateRouteInjectProps {
    isAuthenticated: boolean;
    allowedRoles?: string[];
    componentIfNotAuthenticated?: React.ComponentType<RouteComponentProps<{}>>;
    isAdminRoute?: boolean;
    component: React.ComponentType<RouteComponentProps<{}> & PrivateRouteInjectProps>;
}

class PrivateRoute <T extends AuthRouteProps = AuthRouteProps> extends Component<T> {
    render() {
        const { 
            isAuthenticated,
            role,
            isAdmin,
            isAdminRoute,
            componentIfNotAuthenticated,
            allowedRoles,
            component,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={(props) => {
                    if (isAuthenticated) {
                        if (isAdminRoute && !isAdmin) {
                            return <div>You have no access to view this page.</div>
                        }

                        if (allowedRoles && allowedRoles.length) {
                            return allowedRoles.includes(role)
                                ? React.createElement(component, {
                                    ...props,
                                    role: role,
                                    isAdmin: isAdmin,
                                })
                                : <div>You have no access to view this page.</div>
                        }
                        
                        return React.createElement(component, {
                            ...props,
                            role: role,
                            isAdmin: isAdmin,
                        });
                    }
                    
                    if (componentIfNotAuthenticated) {
                        return React.createElement(componentIfNotAuthenticated as ComponentType<RouteComponentProps<{}>>, props);
                    }

                    return <Redirect to="/login" />
                }}
            />
        );  
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: !!state.auth.token,
    role: state.user.role,
    isAdmin: state.user.isAdmin,
});

export default connect(mapStateToProps)(PrivateRoute);