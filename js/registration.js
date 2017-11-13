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
	debugLog("Defining Objects");
	
	var termArray = [];
	//Term load and parsing
	function parseTerms() {
		debugLog("Loading Term Json");
		$.getJSON( "json/terms.json", function ( termdata ) {
			debugLog("Term Json Loaded.");
			var tempTermArray = [];
			
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
					debugLog(termdefinition.Name);
					debugLog("Not in scope");
				} else if (Date.parse(termdefinition.StartDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("Registration");
					termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'Registration'});
					debugLog(termArray);
				} else if (Date.parse(termdefinition.AddDropDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("AddDrop");
					termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'AddDrop'});
					debugLog(termArray);
				} else if (Date.parse(termdefinition.WithdrawDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("Withdraw");
					termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'Withdraw'});
					debugLog(termArray);
				} else if (Date.parse(termdefinition.EndDate) < Date.now()) {
					debugLog(termdefinition.Name);
					debugLog("No changes");
					termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'NoChange'});
					debugLog(termArray);
				}
			});
			debugLog("Term Iteration Done");
		});
	}
	debugLog( "Ready!" );
	debugLog( "Loading Terms!" );
	parseTerms();
	debugLog( "Loading Courses!" );
};

// Handle document ready
$( document ).ready( iitRegistration );