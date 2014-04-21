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

function dummyDivPopulator(){
	var $content = $("#content");
	var trips = [{name:"Jonathan"},{name:"Nadav"},{name:"Mike"}];
	for(var i=0; i<trips.length; i++)
	{
		$content.append("<div id='userDivNum" + i+"' class='userDiv'></div>");
		$("<div class='tripHeader'><h1>"+trips[i].name+"'s Trip Log</h1></div>").appendTo("#userDivNum"+i);
		$("<div class='tripButtonDiv'><a class='myButton' href='' onclick=''>Add a trip</a></div>").appendTo("#userDivNum"+i);
		$("<table class='tripLog'><tr><th>Date</th><th>Description</th><th>Price</th><th>Miles</th></tr></table>").appendTo("#userDivNum"+i);
		$("<div class='infoDiv'><p>Total owed to "+trips[i].name+": $(need to add functionality)</p><p>Paid (add checkbox + js)</p></div></div>").appendTo("#userDivNum"+i);
	}
}