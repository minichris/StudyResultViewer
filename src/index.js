import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery';

import './style.css';

import App from './App.js';

const BASEDIRECTORY = "/Data/";

global.Data = [];


getAllData().then(function(){
	console.log("Done loading");
	console.log("Data", global.Data);
	ReactDOM.render(<App Data={global.Data} />, document.getElementById("Content"));
});

//The common setup for loading JSON, including progress text system
function loadViaAjax(inputURL, datatypeInput = "json", dataFilterInput){
	var request = $.ajax({
		url: inputURL,
		dataType: datatypeInput,
		dataFilter: dataFilterInput,
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

function getFolderInformation(){
	var request = loadViaAjax(BASEDIRECTORY + "foldername.txt", "text", function(data, type){
		return data.split("\n").map(line => parseInt(line)).filter(line => !isNaN(line));
	});
	request.done(function(data) {
		data.forEach(dir => global.Data.push({
			id: dir,
			serverData: null,
			clientData: null
		}));
	});
	return request;
}

function getAllData(){
	function loadParticipantServerData(dir){
		var request = loadViaAjax(BASEDIRECTORY + dir + "/db.json");
		request.done(function(data) {
			global.Data.find(participant => participant.id == dir).serverData = data;
		});
		return request;
	}

	function loadParticipantClientData(dir){
		var request = loadViaAjax(BASEDIRECTORY + dir + "/TaskData/" + "tasks.json");
		request.done(function(data) {
			data.forEach(task => task.Participant = dir); //add the missing participant ids for later
			global.Data.find(participant => participant.id == dir).clientData = data;
		});
		return request;
	}

	return new Promise((resolve, reject) => {
		getFolderInformation().then(function() {
			let dataProcesses = [];
			global.Data.forEach(function(dir){
				dataProcesses.push(loadParticipantServerData(dir.id));
				dataProcesses.push(loadParticipantClientData(dir.id));
			});
			Promise.allSettled(dataProcesses).then(function() {
				resolve("done");
				console.log("done all dataProcesses");
			},function() {
				resolve("done, some failed");
				console.log("done all dataProcesses, some failed");
			});
		});
	});
}


