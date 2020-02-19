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
		let orderedTasks = [];
		orderedTasks = this.props.tasks.sort((a, b) => a.Timestamp - b.Timestamp);

		let elements = orderedTasks.map((task, i) =>
			 <Task key={"task_" + task.Participant + task.DisplayTitle} task={task}/>
		);

		global.RenderedTasks = orderedTasks;

		let taskCbData = {"true": 0, "false": 0};
		orderedTasks.forEach(task => {
			let cbdata = global.CheckboxData.find(d => d.participant == task.Participant && d.task == task.DisplayTitle);
			if(cbdata){
				taskCbData[cbdata.completed]++;
			}
		});
		

		return (
			<>
			<div>
				<div>Currently rendered tasks set to "global.RenderedTasks".</div>
				<div>Currently displayed tasks: {orderedTasks.length}</div>
				<div>Currently completed tasks (since last update of checkbox data): {taskCbData["true"]}</div>
				<div>Currently failed tasks (since last update of checkbox data): {taskCbData["false"]}</div>
			</div>
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
			</>
		);
	}
}