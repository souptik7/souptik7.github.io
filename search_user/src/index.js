import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Main from "./scripts/components/route";
import Header from "./scripts/components/header";
import Footer from "./scripts/components/footer";
import { BrowserRouter as Router } from 'react-router-dom';

export default class Layout extends React.Component {
	render(){
		var base = '/';
		return (
			<Router basename={base}>   
				<div>
			    	<Header />
			    	<Main />
			    	<Footer />
			    </div>
			</Router>
		)
	}
}

ReactDOM.render(<Layout />, document.getElementById('root'));