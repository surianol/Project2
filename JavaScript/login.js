{
  //Solve asynch load issues.
  if ( document.readyState === "complete" ) {
    console.log("a1");
    setTimeout(poserDocLoad,1);
  } else {
    console.log("a2");
    setTimeout(poserDocLoad,1);
    document.addEventListener('DOMContentLoaded',poserDocLoad,false);
  }
//Detect prior form submission
  function poserDocLoad(){
    console.log("a");
    document.getElementById('login-and-info').addEventListener('onsubmit',processLogin,false);
  }
	
  function processLogin(){
    window.open("welcome.html","_self");
	alert("argh");
	return false;
  }
}