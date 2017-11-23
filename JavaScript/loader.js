{
function loadJquery() {
  var jquerySrc = document.createElement('script');
  jquerySrc.onload = function() {
    var jquerySrcMob = document.createElement('script');
    jquerySrcMob.src = "https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js";
    document.getElementsByTagName('head')[0].appendChild(jquerySrcMob);
  };

  jquerySrc.src = "https://code.jquery.com/jquery-1.11.1.min.js";
  document.getElementsByTagName('head')[0].appendChild(jquerySrc);
}

//Let's try using a lambda?
document.onreadystatechange = () => {
  if(document.readyState === "complete") {
    loadJquery();
  }
};
}