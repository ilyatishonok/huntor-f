import React, { Component, ComponentType } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';

interface PrivateRouteInjectProps {
    role: string;
}

export type ComponentInjectableProps<T> = PrivateRouteInjectProps & RouteComponentProps<T>;

interface AuthRouteProps extends RouteProps, PrivateRouteInjectProps {
    isAuthenticated: boolean;
    allowedRoles?: string[];
    componentIfNotAuthenticated?: React.ComponentType<RouteComponentProps<{}>>;
    component: React.ComponentType<ComponentInjectableProps<any>>;
}

class PrivateRoute <T extends AuthRouteProps = AuthRouteProps> extends Component<T> {
    render() {
        const { 
            isAuthenticated,
            role,
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
                        if (allowedRoles && allowedRoles.length) {
                            return allowedRoles.includes(role)
                                ? React.createElement(component, {
                                    ...props,
                                    role: role,
                                })
                                : <Redirect to="/" />
                        }
                        
                        return React.createElement(component, {
                            ...props,
                            role: role,
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
});

export default connect(mapStateToProps)(PrivateRoute);