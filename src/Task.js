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
		let AnswersString = this.props.task.Answer.split('\n').map(answer => <><br />{answer}</>);
		
		return (
			<div className="task">
				<div className="taskInfo">
					<div className="Participantid">Participant ID: {this.props.task.participantID}</div>
					<div className="BelievesSuccess">Participant believed successful: {this.props.task.ParticipantBelievesSuccess.toString()}</div>
					<div className="Answer">Answers: {AnswersString}</div>
					<div className="System">System: {systemString}</div>
					<div className="TimeSpent">Time spent: {secondsSpent} seconds</div>
					<div className="Timestamp">Timestamp: {this.props.task.Timestamp}</div>
					<div className="Title">Task title: {this.props.task.Title}</div>
					<div className="databaseid">Database ID: {this.props.task.id}</div>
					<TaskRelatedLogs task={this.props.task} />
				</div>
				<img src={"data:image/png;base64, " + this.props.task.ScreenshotPNG} />
				<LogChart logData={getReleventFilterLogs(this.props.task)} />
			</div>
		);
	}
}