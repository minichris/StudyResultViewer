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

	
	buttonClick(){
		function updateClipboard(newClip) {
			navigator.clipboard.writeText(newClip).then(function() {
				console.log("Writing to clipboard successful");
			}, function() {
				console.log("Writing to clipboard failed");
			});
		}

		const { selectedOption } = this.state;
		if(selectedOption){
			let taskData = this.props.Data.flatMap(participant => participant.clientData);
			const taskAname = "Task 2A".slice(0, -1).concat("A");
			const taskBname = "Task 2B".slice(0, -1).concat("B");
			const taskATimes = taskData.filter(task => task.DisplayTitle == taskAname).flatMap(task => task.TimeSpentOnTask / 1000);
			const taskBTimes = taskData.filter(task => task.DisplayTitle == taskBname).flatMap(task => task.TimeSpentOnTask / 1000);
			let copyString = "GDPWiki\tGDPVis\r\n";
			if(taskATimes.length != taskBTimes.length){
				updateClipboard("Lengths don't match!");
			}
			else{
				for(let i = 0; i < taskATimes.length; i++){
					copyString += taskATimes[i] + "\t" + taskBTimes[i] + "\r\n";
				
				}
				updateClipboard(copyString);
			}
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
				<button onClick={this.buttonClick.bind(this)}>Copy shown tasks timings</button>
				<Tasks tasks={tasks} />
			</>
		);
	}
}