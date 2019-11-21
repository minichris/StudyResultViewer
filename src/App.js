import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Tasks from './Tasks.js';

export default class App extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<>
				<Tasks data={this.props.Tasks} />
			</>
		);
	}
}