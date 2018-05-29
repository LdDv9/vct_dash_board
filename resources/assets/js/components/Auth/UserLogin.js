// resources/assets/js/components/UserList.js

import React, {Component} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass:''
        };
        this.onHandlerEmail = this.onHandlerEmail.bind(this);
        this.onHandlerPass = this.onHandlerPass.bind(this);
    }

    componentDidMount() {
        var _this = this;
        $('#js-form-login').validate({

            rules: {
                pass: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                pass: 'Please input password.',
                email: {
                    required: 'Please input email.',
                    email: 'Email Invalid.'
                }
            },
            focusInvalid: false,
            errorPlacement: function (error, element) {
                element.css({
                    'border':'1px solid #a94442'
                });
                element.attr('data-original-title', error.text())
                        .attr('data-toggle', 'tooltip')
                        .attr('data-placement', 'top');
                $(element).tooltip('show');
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).tooltip('show');
            },
            unhighlight: function (element) {
                $(element).css({
                    'border':'none'
                });
                $(element)
                    .removeAttr('data-toggle')
                    .removeAttr('data-original-title')
                    .removeAttr('data-placement')
                    .removeClass('error');
                $(element).unbind("tooltip");
            },
            submitHandler: function (form) {
                // return false;
                // event.preventDefault();
                let userMail = _this.state.email;
                let userPassword = _this.state.pass;
                let url = window.Laravel.baseUrl + "/api/user-login";

                let dataSend = new FormData();
                dataSend.append('userMail',userMail);
                dataSend.append('userPassword',userPassword);
                axios({
                    method: 'post',
                    url: url,
                    data: dataSend,
                    config: { headers: {'Content-Type': 'multipart/form-data','X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }}
                }).then(response=> {
                    if (response.data.status === 'not_valid') {
                        let errors = response.data.error;
                        let htmlError = '';
                        $.each(errors, function (index, value) {
                            $.each(errors[index], function (index, value) {
                                htmlError += "<span> "+value+"</span> <br/>";
                            });
                        });
                        $('.js-list-error').html(htmlError);
                    }
                    if (response.data.status === 'error') {
                        let errors = response.data.mess;
                        // let htmlError = '';
                        $('.js-list-error').html(errors);
                    }
                }).catch(error => {
                    console.log(error)
                });
                return false;

            }
        });
    }
    onHandlerEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onHandlerPass(e){
        this.setState({
            pass: e.target.value
        });
    }

    render() {
        // console.log('{this.state.dataPopup ',this.state.dataPopup);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <h1>Authentication User</h1>

                        <form  action="" id="js-form-login">
                            <div className="form-group">
                                <label htmlFor="user_email">Email</label>
                                <input onChange={this.onHandlerEmail} value={this.state.email} name="email" id="user_mail" type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="user_pass">Password</label>
                                <input onChange={this.onHandlerPass} value={this.state.pass} name="pass" id="user_pass" type="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary " style={{width:'100%'}}  >Login</button>
                            </div>
                        </form>
                        <div className="js-list-error text-danger"> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList

