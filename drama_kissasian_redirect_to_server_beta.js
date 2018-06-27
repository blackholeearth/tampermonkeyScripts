// ==UserScript==
// @name         drama - kissasian redirect to server=beta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  kissasian  server=beta  360p select
// @author       You
// @include     /^.*kissasian\.ch/.*$/
// @grant        none
// ==/UserScript==

(function() {

redirectToBeta();

select360p();

})();


function redirectToBeta()
{
	var input =document.location.href;
	var regex = "/Drama/(.*?)/(Episode-(.*?)|Movie)";
	var re = new RegExp(regex);
	if (re.test(input))
	{
		if (input.indexOf("&s=beta") === -1)
		{
	       window.location.replace(input +"&s=beta"  );
		}
	}

	console.log('redirectToBeta run.');
}

function select360p()
{
	var sel_id = "selectQuality";
	var sel = document.querySelector( "#"+sel_id );
	for (i = 0; i < sel.options.length; ++i){
	    if ( sel.options[i].text.indexOf("360") > -1 ){
	       sel.value =  sel.options[i].value;
           sel.dispatchEvent(new Event('change'));
	       console.log(sel.options[i].text);
	       return true;
	    }
	}
	console.log('select360p run.');
	return false;
}




document.addEventListener("DOMContentLoaded", function(event) {
    /**/console.log("DOM loaded - 360p selector");

	var interval = setInterval(function(){
		console.log("interval - 360p selector");
		try
		{
			var result = select360p();
      		if (result ===true)
			  clearInterval(interval);
		}
		catch(exx)
		{
			console.error(exx.message);
		}

	}, 3500);


	// after 15 sec delete interval
	setTimeout( function(){
		clearInterval(interval);
	},20000);

});
