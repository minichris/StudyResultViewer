export function getSystemDetails(systemString){
	if(systemString.includes("SV_8JrKQnFk0jktjU1")){
		return {Type: "Wiki post use questionniare", ShouldHaveLogs: false};
	}
	
	if(systemString.includes("SV_aUXwBVYTaC0wklL")){
		return {Type: "GDPVis post use questionniare", ShouldHaveLogs: false};
	}
	
	if(systemString.includes("107.170.92.50")){
		return {Type: "GDPVis system", ShouldHaveLogs: true};
	}
	
	if(systemString.includes("virt10")){
		return {Type: "Wiki system", ShouldHaveLogs: false};
	}
	
	return "Unknown system";
}

export function getLogEntryDetails(log){
	let returnObject = {component: null, status: null, manual: false};
	Object.seal(returnObject);
	
	if(log.message.toLowerCase().includes("manually")){
		returnObject.manual = true;
	}
	
	if(log.message.toLowerCase().includes("opened")){
		returnObject.status = "opened";
	}
	if(log.message.toLowerCase().includes("closed")){
		returnObject.status = "closed";
	}	
	
	//get the component
	if(log.message.toLowerCase().includes("document viewer")){
		returnObject.component = "Document Viewer";
	}
	else if(log.message.toLowerCase().includes("search bar")){
		returnObject.component = "Searchbar";
		returnObject.manual = true;
		
		let search = log.message;
		search.replace("User used search bar to search for ",""); //remove text at start
		search = search.split("@")[0].trim(); //remove text after search string
		returnObject.status = search;
	}
	else if(log.message.toLowerCase().includes("filter panel")){
		returnObject.component = "Filter Panel";
	}
	else if(log.message.toLowerCase().includes("clicked a link")){
		returnObject.component = "Hyperlink";
	}
	else{
		returnObject.component = null;
	}
	
	return returnObject;
}

export function getReleventFilterLogs(task){
	let allLogData = global.Data.filter(participant => participant.serverData).flatMap(participant => participant.serverData.logs);
	if(allLogData){
		let startTime = task.Timestamp - (task.TimeSpentOnTask / 1000);
		let endTime = task.Timestamp;
		let filteredLogs = allLogData.filter(item => parseInt(item?.timestamp) < endTime && startTime < parseInt(item?.timestamp));
		//console.log("Logs: ", dateTime.format(new Date(startTime*1000),'HH:mm:ss'), dateTime.format(new Date(endTime*1000),'HH:mm:ss'), filteredLogs);
		return filteredLogs;
	}
	else{
		return null;
	}
}