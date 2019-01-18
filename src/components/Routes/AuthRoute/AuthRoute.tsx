import React, { Component } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, } from 'react-router-dom';

interface AuthRouteProps extends RouteProps {
    authenticated: boolean;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default class <T extends AuthRouteProps = AuthRouteProps> extends Component<T> {
    render() {
        const { authenticated, component, ...rest } = this.props;
        
        return (
            <Route
                {...rest}
                render={(props) => {
                    return (
                        !authenticated
                            ? React.createElement(component, props)
                            : <Redirect to="/" />
                    );
                }}
            />
        );  
    }
}