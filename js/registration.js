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
			var tempTermArray = [];
			var termArray = [];
			debugLog("Capture Term Data");
			$.each(termdata, function( termkey, termvalue ) {
				if(termkey !== "terms") {
					tempTermArray("Term Data Fails Validation!");
					return;
				}
				debugLog("Term Data Passes Validation!");
				tempTermArray = termvalue;
			});

			debugLog("Iterate Through Term Data");
			$.each(tempTermArray, function(termindex, termdefinition){
				//Start at the end points to determine ranges, this means less checks overall.
				if(Date.parse(termdefinition.RegistrationDate) < Date.now() || Date.parse(termdefinition.EndDate) > Date.now() ) {
				} else if (Date.parse(termdefinition.StartDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("Registration");
				} else if (Date.parse(termdefinition.AddDropDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("Add Drop");
				} else if (Date.parse(termdefinition.WithdrawDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("Withdraw");
				} else if (Date.parse(termdefinition.EndDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("No changes");
				}
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