function iitRegistration(){
	console.log("Defining Functions");
	//Term load and parsing
	function parseTerms() {
		console.log("Loading Term Json");
		$.getJSON( "json/terms.json", function ( termdata ) {
			console.log("Term Json Loaded.");
			var termArray = [];
			$.each(termdata, function( termkey, termvalue ) {
				if(termkey !== "terms") {
					console.log("Term Data Fails Validation!");
					return;
				}
				console.log("Term Data Passes Validation!");
				termArray = termvalue;
			});
		});
	}
	console.log( "Ready!" );
	console.log( "Loading Terms!" );
	parseTerms();
	console.log( "Loading Courses!" );
};

// Handle document ready
$( document ).ready( iitRegistration );