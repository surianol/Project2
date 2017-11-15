{
  document.addEventListener('DOMContentLoaded',poserDocLoad,false);
//Detect prior form submission
	function poserDocLoad(){
		setTimeout(function() {
			document.getElementById('login-and-info').addEventListener('onsubmit', processLogin);
		});
	}
	
	function processLogin(){
		window.open("welcome.html","_self");
	}
}