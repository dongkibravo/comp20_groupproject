function toggleDivVisibility(divName){

	var $div = $("#"+divName);

	if(!$div)
	{
		alert("Passed in non-existant divName");
		return;
	}

	console.log("About to toggle");
	$div.toggle('slow');

	
}