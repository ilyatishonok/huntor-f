import React, { ReactNode } from 'react';

interface AccessControlProps {
    role: string;
    allowedRoles: string[],
    children: (role: string) => ReactNode;
}

const AccessControl = ({ role, allowedRoles, children }: AccessControlProps) => {
    if (allowedRoles.includes(role)) {
        return <React.Fragment>{children(role)}</React.Fragment>;
    }

    return (<div>No access</div>);
};

export default AccessControl;
