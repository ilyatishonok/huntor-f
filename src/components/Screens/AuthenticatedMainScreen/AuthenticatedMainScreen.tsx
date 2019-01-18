import React, { ReactNode } from 'react';
import withAppBar from '../../withAppBar';

const AuthenticatedMainScreen = () => (
    <div>Hello world</div>
);

export default withAppBar(AuthenticatedMainScreen);