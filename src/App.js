import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Tasks from './Tasks.js';

export default class App extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let tasks = this.props.Data.flatMap(participant => participant.clientData);
		return (
			<>
				<Tasks tasks={tasks} />
			</>
		);
	}
}