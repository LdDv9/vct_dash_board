// resources/assets/js/components/EditUser.js

import React, { Component } from 'react'
import UserList from '../UserList'
import axios from 'axios'
import 'popper.js'
import 'bootstrap'

class EditGuest extends Component {
    constructor (props) {
        super(props);
        this.state = {
            guestNote: '',
            guestStatus: 'none_contact'
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeGuestNote = this.handleChangeGuestNote.bind(this);
        this.handleChangeGuestStatus = this.handleChangeGuestStatus.bind(this);
    }

    componentDidMount () {
        this.setState({
            guestNote:this.props.obj.note
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            guestNote:nextProps.obj.note
        });
    }

    handleChangeName (e) {
        this.setState({
            name: e.target.value
        })
    }

    handleChangeEmail (e) {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword (e) {
        this.setState({
            password: e.target.value
        })
    }

    handleChangeGuestNote (e)  {
        this.setState({
            guestNote:e.target.value
        });
    };

    handleChangeGuestStatus (e)  {
        // console.log(e.target.value);
        this.setState({
            guestStatus : e.target.value
        });
    };

    handleSubmitDataForm(e){
        e.preventDefault();
        let dataSend = new FormData();
        let guestId= this.props.obj.id;
        let guestNote = this.state.guestNote;
        let guestStatus = this.state.guestStatus;
        let url = apiVCT +'/edit-guest/';
        dataSend.append('guestId',guestId);
        dataSend.append('guestNote',guestNote);
        dataSend.append('guestStatus',guestStatus);
        axios({
            method: 'post',
            url: url,
            data: dataSend,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response=> {
            let resultElement = $('#result');
            resultElement.show();
            if (response.data.status == 'success') {
                resultElement.text('Success: ' + response.data.message).removeClass('label-danger').addClass('label-success');
            } else {
                resultElement.text('Error: '+ response.data.message).removeClass('label-success').addClass('label-danger');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    handleSubmit (e) {
        e.preventDefault();
        let url = window.Laravel.baseUrl + '/api/users/' + this.props.match.params.id
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        axios.patch(url, data)
            .then(response => {
                this.props.history.push('/users')
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render () {
        if (this.props.obj) {
            $('#result').hide();
            $('#myModal').modal('show');
        }
        let guestStatus = this.state.guestStatus ? this.state.guestStatus : 'none_contact';
        return (
            <div className="container">
                <div className="modal  fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content modal-lg">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Guest Info </h4>
                                <span className="label" id="result" style={{display: 'block', textAlign: 'center', fontSize: '1.2em'}}> </span>
                            </div>
                            <div className="modal-body">
                                <div className="col-md-12" style={{marginBottom: '20px'}}>
                                    <div className="col-md-6">
                                        <label htmlFor="guest-name">Name:  </label><span> {this.props.obj.name}</span><br/>
                                        <label htmlFor="guest-name">Phone:  </label><span> {this.props.obj.phone}</span><br/>
                                        <label htmlFor="guest-name">Email:  </label><span> {this.props.obj.email}</span><br/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="guest-name">Loan:  </label><span> {this.props.obj.money}</span><br/>
                                        <label htmlFor="guest-name">Type of Loan:  </label><span> {this.props.obj.type}</span><br/>
                                        <label htmlFor="guest-name">Company:  </label><span> {this.props.obj.company}</span><br/>
                                    </div>
                                </div>
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="guest-status" >Guest Status</label>
                                        <select value={guestStatus} onChange={this.handleChangeGuestStatus} name="guest-status" id="guest-status" className="form-control">
                                            <option value="none_contact" >Chưa Liên Lạc</option>
                                            <option value="success" >Vay Thành Công</option>
                                            <option value="fail" >Thất Bại</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="guest-note">Guest Note</label>
                                        <textarea onChange={this.handleChangeGuestNote} value={this.state.guestNote ? this.state.guestNote : ''} className="form-control" name="guest-note" id="guest-note" cols="30" rows="6" style={{resize:'none'}} placeholder="Some text"> </textarea>
                                    </div>
                                    <div className="form-group text-center">
                                        <button onClick={(e) => this.handleSubmitDataForm(e) } type="submit" className="btn btn-primary " style={{width:'20%'}}>Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        )
    }
}
export default EditGuest