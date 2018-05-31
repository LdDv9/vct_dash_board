// resources/assets/js/components/App.js

import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import 'jquery'
// import {toast} from "react-toastify/index";

class App extends Component {

    handlerLogout(){
        let url = window.Laravel.baseUrl + "/api/dash-board/user-logout";
        axios({
            method: 'post',
            url: url,
            // data: ,
            config: { headers: {'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }}
        }).then(response=> {
            window.location.href = window.Laravel.baseUrl;
        }).catch(error => {
            console.log(error)
        });
    }q

    render() {
        return (
            <div>
                <nav className='navbar navbar-default navbar-static-top'>
                    <div className='container-fluid'>
                        <div className='navbar-header'>
                            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
                                    data-target='#app-navbar-collapse' aria-expanded='false'>
                                <span className='sr-only'>Toggle Navigation</span>
                                <span className='icon-bar'/>
                                <span className='icon-bar'/>
                                <span className='icon-bar'/>
                            </button>
                            <a className='navbar-brand' href='/'>
                                VayCapToc-DashBoard
                            </a>
                        </div>
                        <div className='collapse navbar-collapse' id='app-navbar-collapse'>
                            <ul className='nav navbar-nav'>
                                {/*<li><Link to='/users'>Users</Link></li>*/}
                                <li><Link to='/dash-board/users/create'>Add User</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="javascript:void(0)" onClick={this.handlerLogout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container-fluid'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App
