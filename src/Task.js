import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import {getSystemDetails, filterLogs, getReleventFilterLogs} from './utilities.js';
import TaskRelatedLogs from './TaskRelatedLogs.js';
import LogChart from './LogChart.js';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let secondsSpent = this.props.task.TimeSpentOnTask / 1000;
		let systemString = getSystemDetails(this.props.task.TaskURL).Type;
		let answersString = this.props.task.Answer.split('\n').map(answer => <><br />{answer}</>);
		
		let logChart;
		if(getSystemDetails(this.props.task.TaskURL).ShouldHaveLogs){
			logChart = <LogChart logData={getReleventFilterLogs(this.props.task)} />;
		}
		else{
			logChart = <span>This task shouldn't have GDPVis component usage data.</span>;
		}

		return (
			<tr className="task">
				<td className="taskInfo">
					<div className="Participantid">Participant ID: {this.props.task.Participant}</div>
					<div className="BelievesSuccess">Participant believed successful: {this.props.task.ParticipantBelievesSuccess.toString()}</div>
					<div className="Answer">Answers: {answersString}</div>
					<div className="System">System: {systemString}</div>
					<div className="TimeSpent">Time spent: {secondsSpent} seconds</div>
					<div className="Timestamp">Timestamp: {this.props.task.Timestamp}</div>
					<div className="Title">Task title: {this.props.task.DisplayTitle}, {this.props.task.Title}</div>
					<TaskRelatedLogs task={this.props.task} />
				</td>
				<td>
					<img src={"data:image/png;base64, " + this.props.task.ScreenshotPNG} />
				</td>
				<td>
					<LogChart logData={getReleventFilterLogs(this.props.task)} />
				</td>
			</tr>
		);
	}
}