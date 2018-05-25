// resources/assets/js/components/UserRow.js

import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditGuest from './Guest/EditGuest'

class UserRow extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.formatNumber = this.formatNumber.bind(this)
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
    formatNumber (nStr, decSeperate, groupSeperate)   {
        nStr += '';
        let x = nStr.split(decSeperate);
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
        }
        return x1 + x2;
    }

    render() {
        let temp = this.formatNumber(this.props.obj.money,'.', ',');
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
                    <b>Loan</b>: {temp} VNĐ <br/>
                    <b>Type Of Loan </b> : {this.props.obj.type} <br/>
                    <b>More Info </b> : {this.props.obj.more} <br/>
                    <b>Company</b>: {this.props.obj.company} <br/>
                    <b>Created At</b>: {this.props.obj.created_at} <br/>
                </td>
                <td>
                    {this.props.obj.note}
                </td>
                <td>Đã vay thành công</td>
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