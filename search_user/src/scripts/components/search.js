import React, { Component } from 'react';
import SearchUser from './search_user';
import ListUser from './list_user';

export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            data: ''
        }
    }

    updateData = (data)=>{
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <div>
                <div>
                   <SearchUser update={this.updateData}/>
                </div>
                <div className="main_div">
                    <ListUser data={this.state.data} updateUserDetails={this.props.updateUserDetails}/>
                </div>
            </div>
        );
    }
}