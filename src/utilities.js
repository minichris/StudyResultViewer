export function getSystemString(systemString){
	if(systemString.includes("SV_8JrKQnFk0jktjU1")){
		return "Wiki post use questionniare";
	}
	
	if(systemString.includes("SV_aUXwBVYTaC0wklL")){
		return "GDPVis post use questionniare";
	}
	
	if(systemString.includes("107.170.92.50")){
		return "GDPVis system";
	}
	
	if(systemString.includes("virt10")){
		return "Wiki system";
	}
	
	return "Unknown system";
}