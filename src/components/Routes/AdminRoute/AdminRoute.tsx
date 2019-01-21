import React, { Component } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';

interface AuthRouteProps extends RouteProps {
    isAdmin: boolean;
    isAuthenticated: boolean;
    component: React.ComponentType<RouteComponentProps<{}>>;
}

class PrivateRoute <T extends AuthRouteProps = AuthRouteProps> extends Component<T> {
    render() {
        const { 
            isAuthenticated,
            isAdmin,
            component,
            ...rest
        } = this.props;

        return (
            <Route
                {...rest}
                render={(props) => {
                    if (isAuthenticated) {
                        if (!isAdmin) {
                            return <div>You have no access to view this page.</div>
                        }
                        
                        return React.createElement(component, props);
                    }

                    return <Redirect to="/login" />
                }}
            />
        );  
    }
}

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: !!state.user.role,
    isAdmin: state.user.isAdmin,
});

export default connect(mapStateToProps)(PrivateRoute);