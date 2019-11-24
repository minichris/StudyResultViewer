import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {getLogEntryDetails} from './utilities.js';

export default class LogChart extends PureComponent {
	createDataSet(logs){
		let dataset = [
			{name: "Document Viewer", opened: 0, closed: 0},
			{name: "Filter Panel", opened: 0, closed: 0},
			{name: "Searchbar", used: 0}
		];
		logs.forEach(function(log){
			const logDetails = getLogEntryDetails(log);
			let group = dataset.find(group => group.name == logDetails.component);
			if(logDetails.status == "opened"){
				group.opened++;
			}
			if(logDetails.status == "closed"){
				group.closed++;
			}
			if(group.name == "Searchbar"){
				group.used++;
			}
		});
		return dataset;
	}
	
  render() {
		if(!this.props.logData){
				<span>ERROR: No data was fed into LogChart.js .</span>
		}
		if(this.props.logData.length > 0){
			let data = this.createDataSet(this.props.logData);
			return (
				<div>
					<h3>Component usage</h3>
					<BarChart width={400} height={300} data={data} margin={{top: 5, right: 15, left: 15, bottom: 5}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="opened" fill="#6eff4b" />
						<Bar dataKey="closed" fill="#ff4b4b" />
						<Bar dataKey="used" fill="#4b71ff" />
					</BarChart>
				</div>
			);
		}
		else{
			return(
				<span>No GDPVis component usage data was collected for this task.</span>
			);
		}
  }
}