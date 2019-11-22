import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';

export default class TaskRelatedLogs extends React.Component {
	constructor(props){
		super(props);
	}
	
	filterLogs(logData, startTime, endTime){
		return logData.filter(log => log.timestamp < endTime && log.timestamp > startTime);
	}
	
	render(){
		const logData = this.props.allLogs;
		const startTime = this.props.task.Timestamp - this.props.task.TimeSpent;
		const endTime = this.props.task.Timestamp;
		
		let releventLogs = this.filterLogs(logData, startTime, endTime);
		
		return (
			<div className="Logs">Relevent Logs: {releventLogs.length}</div>
		);
	}
}