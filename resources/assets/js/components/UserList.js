// resources/assets/js/components/UserList.js

import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import App from './App'
import UserRow from './UserRow'
import EditGuest from "./Guest/EditGuest";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: '',
            dataPopup:''
        }
    }

    componentDidMount() {
        axios.get(window.Laravel.baseUrl + '/api/guest')
            .then(response => {
                // console.log(response);

                this.setState({users: response.data.data})
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    deleteRow(key) {
        var users = [...this.state.users];
        users.splice(key, 1);
        this.setState({users});
    }
    clickOnRow(obj){
        this.setState({
            dataPopup:obj
        });
    }

    reloadList(obj){
        let guestId = obj.guestId;
        let listTemp = this.state.users;
        listTemp.map((object, key) => {
            if (guestId === object.id) {
                object.note = obj.guestNote;
                object.status = obj.guestStatus;
            }
        });
        this.setState({
            users:listTemp
        });
    }

    fetchRows() {
        if (this.state.users instanceof Array) {
            return this.state.users.map((object, i) => {
                return <UserRow clickOnRow={(data)=>this.clickOnRow(data)} obj={object} key={i} index={i} deleteRow={this.deleteRow.bind(this)}/>
            })
        }
    }

    render() {
        // console.log('{this.state.dataPopup ',this.state.dataPopup);
        return (
            <App>
                <h1>List guests register</h1>
                <div className='clearfix'>
                    <Link className='btn btn-success pull-right' to='/users/create'>Add User</Link>
                </div>
                <br/>
                <div className='table-responsive'>
                    <table className='table  table-hover '>
                        <thead>
                        <tr>
                            <th>Guest Info</th>
                            <th>Loan Info</th>
                            <th>Note</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.fetchRows()}
                        </tbody>
                    </table>
                    <EditGuest reloadList={(obj) => this.reloadList(obj)} obj={this.state.dataPopup} />
                </div>
            </App>
        )
    }
}

export default UserList

