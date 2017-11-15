function iitRegistration(){
  //Establish debug mode
  var debugmode = false;
  function debugLog( debugOutput ){
    if(debugmode === true){
      console.log(debugOutput);
    }
  }
  debugLog("Debug Mode Active.");
  
  /*hide mobile loading*/
  $( "div.ui-loader").hide();
  

  //Define Variables
  debugLog("Defining Variables");
  
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
          debugLog("Term Data Fails Validation!");
          return;
        }
        debugLog("Term Data Passes Validation!");
        tempTermArray = termvalue;
      });

      debugLog("Iterate Through Term Data");
      $.each(tempTermArray, function(termindex, termdefinition){
        debugLog("Processing " + termdefinition.Name);
        //Start at the end points to determine ranges, this means less checks overall.
        if(Date.now() < Date.parse(termdefinition.RegistrationDate) ) {
          debugLog("Before Registration Date");
        } else if( Date.parse(termdefinition.EndDate) < Date.now() ) {
          debugLog("After End Date");
        } else if (Date.parse(termdefinition.StartDate) > Date.now()) {
          debugLog("Registration");
          termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'Registration'});
          debugLog(termArray);
        } else if (Date.parse(termdefinition.AddDropDate) > Date.now()) {
          debugLog("AddDrop");
          termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'AddDrop'});
          debugLog(termArray);
        } else if (Date.parse(termdefinition.WithdrawDate) > Date.now()) {
          debugLog("Withdraw");
          /*termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'Withdraw'});
          debugLog(termArray);*/
        } else if (Date.parse(termdefinition.EndDate) > Date.now()) {
          debugLog("No changes");
          /*termArray.push({name:termdefinition.Name,simplename:termdefinition.SimpleName,mode:'NoChange'});
          debugLog(termArray);*/
        }
      });
      debugLog("Term Iteration Done");
      
      debugLog( "Loading Courses!" );
      loadCourses();
    });
  }
  
  function loadCourses() {
    
    debugLog( "Loading Course Json" );
    $.each(termArray, function(termIndex,termdata) {

      debugLog( "Loading Course Json for " + termdata.name);
      $.getJSON( "json/" + termdata.simplename + ".json", function ( courseData ) {

        var tempCourses = [];
        
        debugLog("Validating Course Data");
        debugLog(courseData);
        $.each(courseData, function(courseTerm, courseBlock) {
          if(courseTerm !== termdata.simplename) {
            debugLog("Course Data Fails Validation!");
            return;
          }
          debugLog("Course Data Passes Validation!");
          tempCourses = courseBlock;
        });
        
        debugLog("Processing Courses");
        var courseTable = document.getElementById( "available_courses" );
        var courseFragment = document.createDocumentFragment();

        $.each(tempCourses, function(courseKey, courseDefinition) {
          debugLog("Processing Course: " + courseDefinition.name);
          processCourse(termdata,courseDefinition,courseFragment);
        });
        $( courseTable ).append(courseFragment);
        bindCourseEvents();
      });
    });
  }
  
  function processCourse(termObject, courseObject, courseTable) {
    var newRow = document.createElement('div');
    $( newRow ).data("term",termObject.simplename);
    $( newRow ).addClass("registration_option");
    $( newRow ).addClass("registration_event_unbound");
    $( newRow ).attr('id', termObject.simplename + "_" + courseObject.subjectcode + courseObject.coursenumber);
    
    $.each(courseObject, function(coursefield, courseValue) {
      var currentCell = document.createElement('span');
      $( currentCell ).addClass("coursedata_" + coursefield);
      
      var cellText;
      
      if(coursefield === "credits") {
        cellText = document.createTextNode(courseValue + " Credit Hours");
      } else if(coursefield === "subjectname"){
        cellText = document.createTextNode(courseValue);
      } else if(coursefield === "subjectcode"){
        cellText = document.createTextNode(courseValue + "-");
      } else {
        cellText = document.createTextNode(courseValue);
      }
      
      if(coursefield === "days") {
        $.each(courseValue, function( dayindex, dayname) {
          $( newRow ).data(dayname, true);
        });
      } else if(coursefield === "credits") {
        $( newRow ).data("credits",courseValue);
      } else if(coursefield === "subjectname") {
        $( newRow ).data("subject",courseValue);
      } else if(coursefield === "starttime") {
        $( newRow ).data("starttime",courseValue);
      } else if(coursefield === "endtime") {
        $( newRow ).data("endtime",courseValue);
      }
      
      currentCell.appendChild(cellText);
      newRow.appendChild(currentCell);

      if(coursefield === "description") {
        var descriptionButton = document.createElement('input');
        $(descriptionButton).addClass("coursedata_description_button");
        $(descriptionButton).addClass("coursedata_description_button_unbound");
        $(descriptionButton).attr("type","button");
        $(descriptionButton).attr("value","...");
        newRow.appendChild(descriptionButton);
        $( currentCell ).hide();
      }
    });
    
    courseTable.appendChild(newRow);
    debugLog("Course Processed");
  }
  
  function bindCourseEvents() {
    $("div.registration_event_unbound").each(function() {
      $(this).on("dblclick",{id: $(this).attr('id') }, toggleRegistration);
      $(this).on("swiperight",{id: $(this).attr('id') }, toggleRegistration);
      $(this).removeClass("registration_event_unbound");
    });
    $("input.coursedata_description_button_unbound").each(function() {
      $(this).on("click",{id: $(this).attr('id') }, toggleDescription);
      $(this).removeClass("coursedata_description_button_unbound");
    });
  }
  
  function toggleRegistration() {
    debugLog("firing registration event!");
    event.stopPropagation();
    if( $(this).hasClass("registration_option") ) {
      debugLog("Moved " + $(this).attr("id") + " to registered courses!");
      $(this).slideToggle(function(){
        $(this).addClass("registered_course");
        $(this).removeClass("registration_option");
        $(this).on("swipeleft",{id: $(this).attr('id') }, toggleRegistration);
        $(this).off("swiperight", toggleRegistration);
        $(this).detach().appendTo(document.getElementById( "registered_courses" ));
        $(this).slideToggle();
      });
    } else {
      debugLog("Moved " + $(this).attr("id") + " to available courses!");
      $(this).slideToggle(function(){
        $(this).addClass("registration_option");
        $(this).removeClass("registered_course");
        $(this).off("swipeleft", toggleRegistration);
        $(this).on("swiperight",{id: $(this).attr('id') }, toggleRegistration);
        $(this).detach().appendTo(document.getElementById( "available_courses" ));
        $(this).slideToggle();
      });
    }
  }
  
  function toggleDescription() {
    debugLog("firing description hide/show!");
    event.stopPropagation();
    var descriptionItem = $(this).parent().find('span.coursedata_description');
    if( $(descriptionItem).is(':hidden')) {
      $(this).attr("value","Less ...");
      $(descriptionItem).show();
    } else {
      $(this).attr("value","...");
      $(descriptionItem).hide();
    }
  }

  debugLog( "Ready!" );
  debugLog( "Performing Ajax!" );
  parseTerms();
};

// Handle document ready
$( document ).ready( iitRegistration );