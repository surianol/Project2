{
  document.addEventListener('DOMContentLoaded',poserDocLoad,false);
//Detect prior form submission
	function poserDocLoad(){
		document.getElementById('login-and-info').addEventListener('onsubmit', processLogin,false);
		console.log("a");
	}
	
	function processLogin(){
		window.open("welcome.html","_self");
		console.log("b");
	}
}