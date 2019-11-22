import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import {getSystemString} from './utilities.js';
import TaskRelatedLogs from './TaskRelatedLogs.js';

export default class Task extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		let secondsSpent = this.props.data.TimeSpentOnTask / 1000;
		let systemString = getSystemString(this.props.data.TaskURL);
		let AnswersString = this.props.data.Answer.split('\n').map(answer => <><br />{answer}</>);
		console.log(AnswersString);
		
		return (
			<div className="task">
				<div className="taskInfo">
					<div className="Participantid">Participant ID: {this.props.data.participantID}</div>
					<div className="BelievesSuccess">Participant believed successful: {this.props.data.ParticipantBelievesSuccess.toString()}</div>
					<div className="Answer">Answers: {AnswersString}</div>
					<div className="System">System: {systemString}</div>
					<div className="TimeSpent">Time spent: {secondsSpent} seconds</div>
					<div className="Timestamp">Timestamp: {this.props.data.Timestamp}</div>
					<div className="Title">Task title: {this.props.data.Title}</div>
					<div className="databaseid">Database ID: {this.props.data.id}</div>
					<TaskRelatedLogs task={this.props.data} allLogs={global.Logs} />
				</div>
				<img src={"data:image/png;base64, " + this.props.data.ScreenshotPNG} />
			</div>
		);
	}
}