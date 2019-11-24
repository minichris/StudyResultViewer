import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';

import './style.css';

import App from './App.js';

const IP = "127.0.0.1";

global.Logs = [];
global.Tasks = [];

getAllData().then(function(){
	console.log("Done loading");
	console.log("Tasks", global.Tasks);
	console.log("Logs", global.Logs);
	ReactDOM.render(<App Tasks={global.Tasks} Logs={global.Logs} />, document.getElementById("Content"));
});


$( document ).ready(function() {
});


//The common setup for loading JSON, including progress text system
function loadViaAjax(inputURL){
	var request = $.ajax({
		url: inputURL,
		dataType: "json",
        xhr: function () {
			var xhr = new window.XMLHttpRequest();
			/*xhr.addEventListener("progress", function (evt) { //progress event
				if (evt.lengthComputable) {
					CurrentFileLoadPercentage = evt.loaded / evt.total; // load percentage
					loadMessageUpdater();
				}
			}, false);*/
			return xhr;
		}
	});
	return request;
}

function getAllData(){
	return new Promise((resolve, reject) => {
		Promise.all([loadLogs(), loadAllTasks()]).then(function() {
			resolve("done");
		});
	});
}

//Loads and transforms the patterns from the json format
function loadLogs(){
	var request = loadViaAjax("http://" + IP + ":25564/logs");
	request.done(function(data) {
		global.Logs = data;
	});
	return request;
}

function loadAllTasks(){
	function loadTask(task = 0){
		var request = loadViaAjax("http://" + IP + ":25562/tasks?_start=" + task + "&_limit=1");
		return request;
	}
	
	return new Promise((resolve, reject) => {
		let Tasks = [];
		let initialGet = loadTask(0);
		initialGet.then(function(data){
			let totalPages = initialGet.getResponseHeader("X-Total-Count");
			let taskPromises = [];
			for(let i = 1; i < totalPages; i++){
				taskPromises[i] = loadTask(i);
			}
			Promise.all(taskPromises).then(function(values){
				values.forEach(function(value, index) {
					if(value){
						Tasks[index] = value[0];
					}
				});
				Tasks[0] = data[0];
				global.Tasks = Tasks;
				resolve("done");
			});
		});
	});
}