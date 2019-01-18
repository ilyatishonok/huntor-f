import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducers';

interface AuthorizationProps {
    role: string;
}

const mapStateToProps = (state: RootState) => ({
    role: state.auth.role,
}); 

const withAuthorization = function<T extends AuthorizationProps>(allowedRoles: string[]) {
    return (WrappedComponent: ComponentType<T>) => {
        return connect(mapStateToProps, class WithAuthorization extends Component<T> {
            render() {
                const { role } = this.props;

                if (allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <div>You have not permission to view this.</div>
                }
            }
        });
    }
}

export default withAuthorization;