function iitRegistration(){
	//Establish debug mode
	var debugmode = true;
	function debugLog( debugOutput ){
		if(debugmode === true){
			console.log(debugOutput);
		}
	}
	debugLog("Debug Mode Active.");

	//Define Functions
	debugLog("Defining Functions.");

	//Term load and parsing
	function parseTerms() {
		debugLog("Loading Term Json");
		$.getJSON( "json/terms.json", function ( termdata ) {
			debugLog("Term Json Loaded.");

			var termArray = [];

			debugLog("Capture Term Data");
			$.each(termdata, function( termkey, termvalue ) {
				if(termkey !== "terms") {
					termArray("Term Data Fails Validation!");
					return;
				}
				debugLog("Term Data Passes Validation!");
				termArray = termvalue;
			});

			debugLog("Iterate Through Term Data");
			$.each(termArray, function(termindex, termvalue){
				debugLog(termindex);
				debugLog(termvalue);
				debugLog(termvalue.Name);
			});
		});
	}
	debugLog( "Ready!" );
	debugLog( "Loading Terms!" );
	parseTerms();
	debugLog( "Loading Courses!" );
};

// Handle document ready
$( document ).ready( iitRegistration );