import React, { Component } from 'react';
import Search from './search';
import DetailUser from './detail_user';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            userDetailsData: ''
        }
    }

    updateUserDetailsData = (data) => {
        this.setState({
            userDetailsData: data
        })
    }


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={()=>{return <Search updateUserDetails={this.updateUserDetailsData}/>}}/>
                    <Route exact path="/:user" render={()=>{return <DetailUser userDetails={this.state.userDetailsData} />}}/>
                </Switch>
            </div>
        )
    }
}