{
  document.addEventListener('DOMContentLoaded',poserDocLoad,false);
//Detect prior form submission
	function poserDocLoad(){
		setTimeout(function() {
			var loginForm = document.getElementById('login-and-info');
			
			if(loginForm !== null) {
				loginForm.addEventListener('onsubmit', processLogin);
			}
		});
	}
	
	function processLogin(){
		window.open("welcome.html","_self");
	}
}