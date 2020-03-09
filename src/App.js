import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Tasks from './Tasks.js';
import Select from 'react-select';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			selectedOption: null
		}
	}

	options(){
		return(
			this.props.Data
				.flatMap(participant => participant.clientData)
				.map(task => task.DisplayTitle)
				.filter((v, i, a) => a.indexOf(v) === i)
				.map(taskID => ({value: taskID, label: taskID}))
	 	);
	}

	handleChange(selectedOption) {
		this.setState({selectedOption});
		this.forceUpdate();
	};

	getDifference(){
		const { selectedOption } = this.state;
		if(selectedOption){
			const currentTaskName = selectedOption.value.slice(0, -1); //get the task name without the letter
			let taskData = this.props.Data.flatMap(participant => participant.clientData); //get all the task data
			const allParticipants = new Set(taskData.flatMap(task => task.Participant)); //get an array of all the participant ids
			let allDiffs = [];
			allParticipants.forEach(function(paticpantID){ //for each participant
				const taskAData = taskData.find(task => task.DisplayTitle == currentTaskName.concat("A") && task.Participant == paticpantID);
				const taskBData = taskData.find(task => task.DisplayTitle == currentTaskName.concat("B") && task.Participant == paticpantID);
				const taskACompleted = global.CheckboxData.find(d => d.participant == paticpantID && d.task == currentTaskName.concat("A")).completed === "true";
				const taskBCompleted = global.CheckboxData.find(d => d.participant == paticpantID && d.task == currentTaskName.concat("B")).completed === "true";
				if(!(taskACompleted && taskBCompleted)){
					console.log(paticpantID + " failed to complete one or more of the two tasks being copied, ignoring.");
					return;
				}
				const taskATime = taskAData.TimeSpentOnTask / 1000; //get task A's time
				const taskBTime = taskBData.TimeSpentOnTask / 1000; //get task B's time
				var diff = Math.abs(taskATime - taskBTime);
				allDiffs.push(diff);
			});
			var total = 0;
			for(var i = 0; i < allDiffs.length; i++) {
				total += allDiffs[i];
			}
			this.updateClipboard( total / allDiffs.length );
		}
		else{
			this.updateClipboard( "No selected option" );
		}
	}

	updateClipboard(newClip) {
		navigator.clipboard.writeText(newClip).then(function() {
			console.log("Writing to clipboard successful");
		}, function() {
			console.log("Writing to clipboard failed");
		});
	}
	
	makeClipboard(onlyShowCompleted, onlyShowIfCompletedBoth = true){
		const { selectedOption } = this.state;
		if(selectedOption){
			const currentTaskName = selectedOption.value.slice(0, -1); //get the task name without the letter
			let taskData = this.props.Data.flatMap(participant => participant.clientData); //get all the task data
			const allParticipants = new Set(taskData.flatMap(task => task.Participant)); //get an array of all the participant ids
			let copyString = "GDPWiki" + " (" + currentTaskName + ")\tGDPVis (" + currentTaskName + ")\r\n"; //set up the heading on the copystring
			allParticipants.forEach(function(paticpantID){ //for each participant
				const taskAData = taskData.find(task => task.DisplayTitle == currentTaskName.concat("A") && task.Participant == paticpantID);
				const taskBData = taskData.find(task => task.DisplayTitle == currentTaskName.concat("B") && task.Participant == paticpantID);
				const taskACompleted = global.CheckboxData.find(d => d.participant == paticpantID && d.task == currentTaskName.concat("A")).completed === "true";
				const taskBCompleted = global.CheckboxData.find(d => d.participant == paticpantID && d.task == currentTaskName.concat("B")).completed === "true";
				if(onlyShowCompleted){
					if(!(taskACompleted && taskBCompleted) && onlyShowIfCompletedBoth){
						console.log(paticpantID + " failed to complete one or more of the two tasks being copied, ignoring.");
						return;
					}
				}
				const taskATime = taskAData.TimeSpentOnTask / 1000; //get task A's time
				const taskBTime = taskBData.TimeSpentOnTask / 1000; //get task B's time
				if(onlyShowIfCompletedBoth){
					copyString += taskATime + "\t" + taskBTime + "\r\n"; //add a newline
				}
				else{
					if(!onlyShowIfCompletedBoth){
						if(taskACompleted){
							copyString += taskATime;
						}
						else{
							copyString += "Failed";
						}
						copyString += "\t";
						if(taskBCompleted){
							copyString += taskBTime;
						}
						else{
							copyString += "Failed";
						}
						copyString += "\r\n";
					}
				}
			});
			this.updateClipboard(copyString);
		}
		else{
			console.log("No option selected");
		}
	}




	
	render(){
		let tasks = this.props.Data.flatMap(participant => participant.clientData);
		const { selectedOption } = this.state;
		if(selectedOption){
			tasks = tasks.filter(task => task.DisplayTitle == selectedOption.value);
		}
		return (
			<>
				<Select value={selectedOption} onChange={this.handleChange.bind(this)} options={this.options()} />
				<button onClick={() => {this.makeClipboard(false)}}>Copy all shown tasks timings</button>
				<button onClick={() => {this.makeClipboard(true, false)}}>Copy only shown tasks timings which completed (showing faileds)</button>
				<button onClick={() => {this.makeClipboard(true)}}>Copy only shown tasks timings which completed (ignore participants who failed at least one)</button>
				<button onClick={() => {this.getDifference()}}>Get interpair difference</button>
				<Tasks tasks={tasks} />
			</>
		);
	}
}