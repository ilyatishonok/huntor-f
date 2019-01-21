import React, { Component } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';

interface AuthRouteProps extends RouteProps {
    isAuthenticated: boolean;
    component: React.ComponentType<RouteComponentProps<{}>>;
}

class PrivateRoute <T extends AuthRouteProps = AuthRouteProps> extends Component<T> {
    render() {
        const { 
            isAuthenticated,
            component,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={(props) => {
                    if (!isAuthenticated) {
                        return React.createElement(component, props);
                    }

                    return <Redirect to="/" />
                }}
            />
        );  
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: !!state.user.id,
});

export default connect(mapStateToProps)(PrivateRoute);