// resources/assets/js/components/UserRow.js

import React, {Component} from 'react';
import axios from 'axios';
import {formatNumber} from './Library/FormatNumber'
import {Link} from 'react-router-dom';
import EditGuest from './Guest/EditGuest'

class UserRow extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault()
        if (!confirm('Are your sure you want to delete this item?')) {
            return false
        }
        let url = window.Laravel.baseUrl + '/api/users/' + this.props.obj.id
        axios.delete(url)
            .then(response => {
                this.props.deleteRow(this.props.index)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        let money = formatNumber(this.props.obj.money,'.', ',');
        let status = this.props.obj.status ? this.props.obj.status : 'none_contact';
        return (
            <tr>
                <td>
                    <b>ID</b>: {this.props.obj.id} <br/>
                    <b>Name</b>: {this.props.obj.name} <br/>
                    <b>Phone</b>:  {this.props.obj.phone} <br/>
                    <b>Email</b>:  {this.props.obj.email} <br/>
                    <b>ID Card</b>:  {this.props.obj.cmnd} <br/>

                </td>
                <td>
                    <b>Loan</b>: {money} VNĐ <br/>
                    <b>Type Of Loan </b> : {this.props.obj.type} <br/>
                    <b>More Info </b> : {this.props.obj.more} <br/>
                    <b>Company</b>: {this.props.obj.company} <br/>
                    <b>Created At</b>: {this.props.obj.created_at} <br/>
                </td>
                <td>
                    {this.props.obj.note}
                </td>
                <td>
                    {status === 'success' ? <label className="label label-success">Thành công</label>: ''}
                    {status === 'fail' ? <label className="label label-danger">Thất Bại</label>: ''}
                    {status === 'none_contact' ? <label className="label label-info">Chưa Liên Lạc</label>: ''}
                </td>
                {/*<td>sửa</td>*/}

                <td>
                    <a className="btn btn-primary" onClick={ () =>{this.props.clickOnRow(this.props.obj)}} href="javascript:void(0)">Edit</a>
                </td>
                {/*<td>*/}
                  {/*<button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>*/}
                {/*</td>*/}
            </tr>
        )
    }
}

export default UserRow