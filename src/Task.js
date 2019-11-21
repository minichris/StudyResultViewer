import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import {getSystemString} from './utilities.js';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let secondsSpent = this.props.data.TimeSpent / 1000;
		let systemString = getSystemString(this.props.data.System);
		
		
		return (
			<div className="task">
				<div className="taskInfo">
					<div className="id">ID: {this.props.data.id}</div>
					<div className="BelievesSuccess">Participant believed successful: {this.props.data.BelievesSuccess}</div>
					<div className="Answer">Answers: {this.props.data.Answer}</div>
					<div className="System">System: {systemString}</div>
					<div className="TimeSpent">Time spent: {secondsSpent} seconds</div>
					<div className="Timestamp">Timestamp: {this.props.data.Timestamp}</div>
					<div className="Title">Task title: {this.props.data.Title}</div>
				</div>
				<img src={"data:image/png;base64, " + this.props.data.Screenshot} />
			</div>
		);
	}
}