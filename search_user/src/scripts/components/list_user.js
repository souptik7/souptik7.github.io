import React, { Component } from 'react';
import '../../styles/user_list.css';
import { Link } from 'react-router-dom';

export default class ListUser extends Component {
    constructor(){
        super();
    }

    render() {
        return (
           	<div className="coverDivList">
           		<ul>{this.props.data?this.props.data.map(data=><li key={data.id}>
                    <Link to={''+data.login}>
                        <div className="coverDivList_div" onClick={()=>{this.props.updateUserDetails(data)}}>
                   			<div className="img_div">
                   				<img src={data.avatar_url} className="coverDivList_img" alt='user_image'/>
                   			</div>
                   			<div className="text_div">
                   				<span className="coverDivList_span">{data.login}</span><br />
                   				<span className="coverDivList_span">{data.score}</span>
                   			</div>
       		            </div>
                    </Link>
                </li>):null}</ul>
           	</div>
        );
    }
}