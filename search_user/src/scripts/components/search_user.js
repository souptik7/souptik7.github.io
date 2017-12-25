import React, { Component } from 'react';
import search from '../../assets/search.png';
import '../../styles/search.css';
import axios from 'axios';
import baseURL from '../config';

export default class SearchUser extends Component {
    constructor(){
        super();
        this.state = {
            search_value:''
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    handleSearchChange(e){
        this.setState({
            search_value: e.target.value
        })
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.searchUser();
        }
    }
    searchUser = () => {
        const {update} = this.props;
        axios.get(baseURL.BASE_URL + baseURL.search_API + this.state.search_value)
        .then(function(response){
            update(response.data.items);
        }).catch(function(response){
            
        })
    }
    render() {
        return (
            <div className="search_div">
                <input type="text" placeholder="Search by User Name" onKeyPress={this.handleKeyPress} onChange={this.handleSearchChange} className="search_input" value={this.state.search_value}/>
                <img src={search} className="search_button" alt="search" onClick={this.searchUser} />
            </div>
        );
    }
}