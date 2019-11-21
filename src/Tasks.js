import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Task from './Task.js';

export default class Tasks extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let elements = this.props.data.map(task =>
			 <Task data={task}/>
		);
		return (
			<>
				<h2>Tasks</h2>
				{elements}
			</>
		);
	}
}