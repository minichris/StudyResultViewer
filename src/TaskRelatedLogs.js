import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import dateTime from 'date-and-time';
import {getSystemDetails, getReleventFilterLogs} from './utilities.js';

export default class TaskRelatedLogs extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let releventLogs = getReleventFilterLogs(this.props.allLogs, this.props.task);
		let divClasses = "Logs";
		let additionalText = "";
		if(getSystemDetails(this.props.task.TaskURL).ShouldHaveLogs != (releventLogs.length > 0)){
			divClasses += " concerningLog";
			additionalText = "This is too many logs for this type of system.";
		}
		return (
			<div className="Logs">Relevent Logs: {releventLogs.length} {additionalText}</div>
		);
	}
}