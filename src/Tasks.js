import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';
import Task from './Task.js';

export default class Tasks extends React.Component {
	constructor(props){
		super(props);
	}
	
	render(){
		//.filter(task => task.Completed)
		let orderedTasks = this.props.tasks.sort((a, b) => a.Timestamp - b.Timestamp);

		let elements = orderedTasks.map((task, i) =>
			 <Task key={"task_" + task.Participant + task.DisplayTitle} task={task}/>
		);
		return (
			<table>
				<thead>
					<tr>
						<th>Task Data</th>
						<th>Screenshot</th>
						<th>GDPVis Component Usage</th>
						<th>Actually Completed Task</th>
					</tr>
				</thead>
				<tbody>
					{elements}
				</tbody>
			</table>
		);
	}
}