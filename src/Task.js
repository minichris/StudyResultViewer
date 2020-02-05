import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import {getSystemDetails, filterLogs, getReleventFilterLogs} from './utilities.js';
import TaskRelatedLogs from './TaskRelatedLogs.js';
import LogChart from './LogChart.js';
import Checkbox from 'react-three-state-checkbox';

export default class Task extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showImage: false
		}
	}

	checkboxChanged(status){
		console.log(status.target.checked);
	}

	imageTextClicked(){
		this.setState({showImage: true});
	}
	
	render(){
		let taskSystemDetails = getSystemDetails(this.props.task.TaskURL);
		let secondsSpent = this.props.task.TimeSpentOnTask / 1000;
		let answersString = this.props.task.Answer.split('\n').map((answer, i) => <li key={this.props.task.Participant + "_" + this.props.task.DisplayTitle + "_" + i}>{answer}</li>);
		
		let logChart;
		if(taskSystemDetails.ShouldHaveLogs){
			logChart = <LogChart logData={getReleventFilterLogs(this.props.task)} />;
		}
		else{
			logChart = <span>This task shouldn't have GDPVis component usage data.</span>;
		}

		let actuallyCompletedTaskCheckbox;
		if(taskSystemDetails.RequiresMarking){
			actuallyCompletedTaskCheckbox = (<Checkbox onChange={this.checkboxChanged.bind(this)} checked={false} indeterminate={true} />);
		}
		else{
			actuallyCompletedTaskCheckbox = (<Checkbox checked={true} indeterminate={false} disabled={true} />);
		}

		let imageComponent;

		if(this.state.showImage){
			imageComponent = (<img src={"data:image/png;base64, " + this.props.task.ScreenshotPNG} />);
		}
		else{
			imageComponent = (<span className="showImageText">Click here to show image</span>);
		}

		return (
			<tr className="task">
				<td className="taskInfo">
					<div className="Participantid">Participant ID: {this.props.task.Participant}</div>
					<div className="BelievesSuccess">Participant believed successful: {this.props.task.ParticipantBelievesSuccess.toString()}</div>
					<div className="Answer">Answers: <ul>{answersString}</ul></div>
					<div className="System">System: {taskSystemDetails.Type}</div>
					<div className="TimeSpent">Time spent: {secondsSpent} seconds</div>
					<div className="Timestamp">Timestamp: {this.props.task.Timestamp}</div>
					<div className="Title">Task title: {this.props.task.DisplayTitle}, {this.props.task.Title}</div>
					<TaskRelatedLogs task={this.props.task} />
				</td>
				<td className="imageContainer" onClick={this.imageTextClicked.bind(this)}>
					{imageComponent}
				</td>
				<td>
					{logChart}
				</td>
				<td>
					{actuallyCompletedTaskCheckbox}
				</td>
			</tr>
		);
	}
}