import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const TutoringDashboardScreen = () => {
    return (
        <div>
            <ul>
                <li>Schedule</li>
                <li>Tasks</li>
                <li>Book Sessions</li>
                <li>Messages</li>
            </ul>
            <Switch>
                <Route path="/tutor/:id/dashboard/schedule" render={() => <div>Schedule</div>} />
                <Route path="/tasks" render={() => <div>tasks</div>} />
                <Route path="/booking" render={() => <div>booking</div>} />
                <Route path="/messages" render={() => <div>Messages</div>} />
            </Switch>
        </div>
    );
}

export default TutoringDashboardScreen;