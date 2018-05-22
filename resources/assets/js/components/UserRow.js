// resources/assets/js/components/UserRow.js

import React, {Component} from 'react';
import axios from 'axios';

class UserRow extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
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
     formatNumber(nStr, decSeperate, groupSeperate) {
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
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.phone}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.formatNumber(this.props.obj.money,'.', ',')} VNĐ
                </td>
                <td>
                    {this.props.obj.cmnd}
                </td>
                <td>
                    {this.props.obj.type}
                </td>
                <td>
                    {this.props.obj.type}
                </td>
                    <td style={{width:'20%'}}>
                    {this.props.obj.more}
                </td>
                <td>
                    {this.props.obj.created_at}
                </td>

                {/* <td>
          <Link className='btn btn-primary' to={'/users/edit/' + this.props.obj.id}>Edit</Link>
        </td>
        <td>
          <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
        </td> */}
            </tr>
        )
    }
}

export default UserRow