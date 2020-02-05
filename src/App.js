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
	
	render(){
		let tasks = this.props.Data.flatMap(participant => participant.clientData);
		const { selectedOption } = this.state;
		if(selectedOption){
			tasks = tasks.filter(task => task.DisplayTitle == selectedOption.value);
		}
		return (
			<>
				<Select value={selectedOption} onChange={this.handleChange.bind(this)} options={this.options()} />
				<Tasks tasks={tasks} />
			</>
		);
	}
}