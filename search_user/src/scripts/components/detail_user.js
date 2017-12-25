import React, { Component } from 'react';
import '../../styles/user_detail.css';
import { Link } from 'react-router-dom';

export default class DetailUser extends Component {
    render() {
        // console.log(this.props.userDetails)
        return (
           	<div> {this.props.userDetails.login} Welcome to Fucked Up World</div>
        );
    }
}