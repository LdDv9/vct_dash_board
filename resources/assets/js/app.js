// resources\assets\js\app.js

import React from 'react'
import {render} from 'react-dom'
import {
    Router,
    Route,
    Switch
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import CreateUser from './components/CreateUser'
import EditUser from './components/EditUser'
import UserList from './components/UserList'
import UserLogin from './components/Auth/UserLogin'

const history = createBrowserHistory();
// render(<UserLogin />, document.getElementById('auth'));
render(
    <Router history={history}>
        <Switch>
            <Route path='/dash-board/users/create' component={CreateUser}/>
            <Route path='/dash-board' component={UserList}/>
            <Route path='/users/edit/:id' component={EditUser}/>
            <Route path='/' component={UserLogin}/>

        </Switch>
    </Router>, document.getElementById('app'));
