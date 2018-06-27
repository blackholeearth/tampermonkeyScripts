// ==UserScript==
// @name        html5 speed changer
// @namespace   erety
// @include     /^.*$/
// @version     1
// @grant CSP
// @run-at document-start
// ==/UserScript==

console.log("html5 video speed changer");


document.addEventListener("DOMContentLoaded", function(event) {
    /**/console.log("DOM loaded");


	var interval = setInterval(function(){
		console.log("interval");
		try  {
			var vidCount = Main();
      if (vidCount >0)
			  clearInterval(interval);
		}
		catch(exx) {
			console.error(exx.message);
		}


	}, 3500);


	// after 15 sec delete interval
	setTimeout( function(){
		clearInterval(interval);
	},20000);

});


function newSliderControl (args) {
	var args_example=
	{
		'id':'value1',
		'label':'value1',
		'min':'0.6',
		'max':'1.4',
		'step':'0.05',
		'value':'1',
		'oninput':function(){;},
	};


	var idPre =  args['id'];

	var x = document.createElement("INPUT");
	x.setAttribute("type", "range");
	x.id = idPre;
	x.setAttribute("min"  ,args["min"] );
	x.setAttribute("max"  ,args["max"] );
	x.setAttribute("step" ,args["step"] );
	x.setAttribute("value",args["value"] );
	x.style.verticalAlign = 'bottom';
	x.style.width = '80px';
	x.style.display = 'inline';


	x.oninput =  args["oninput"] ;
	x.onchange = args["oninput"] ;

    var x2 = document.createElement("label");
	x2.id =idPre +"_lb_val";
	x2.style.verticalAlign = 'top';
	x2.style.color = 'white';
    x2.style.display = 'inline';

	var x3 = document.createElement("label");
	x3.id =idPre +"_lb";
	x3.innerHTML = args["label"]+":";
	x3.style.verticalAlign = 'top';
	x3.style.color = 'white';
    x3.style.display = 'inline';

    var wrp1 = document.createElement('div');
	wrp1.id = args['id']+'_wrap';
	wrp1.style.whiteSpace = 'nowrap!important';
	wrp1.style.background =  'rgba(34, 41, 47, 0.6)';

	wrp1.appendChild(x3);
	wrp1.appendChild(x);
	wrp1.appendChild(x2);

    return wrp1;
}


function initHtml5AspectRatioY() {

	var args=
	{
		'id':'erg_scY',
		'label':'scaleY',
		'min':'0.6',
		'max':'1.4',
		'step':'0.05',
		'value':'1',
		'oninput': rg_scOnChange,
	};

    return newSliderControl(args);
}

function initHtml5AspectRatioX() {

	var args=
	{
		'id':'erg_scX',
		'label':'scaleX',
		'min':'0.6',
		'max':'1.4',
		'step':'0.05',
		'value':'1',
		'oninput': rg_scOnChange,
	};

    return newSliderControl(args);
}

function initHtml5PlaybackSpeed() {

	var args=
	{
		'id':'erg_pbs',
		'label':'playbackSpeed',
		'min':'0.7',
		'max':'2.0',
		'step':'0.05',
		'value':'1',
		'oninput': rgOnChange,
	};

    return newSliderControl(args);
}




function rg_scOnChange () {
	var lblX =document.getElementById("erg_scX_lb_val");
	var rgX = document.getElementById("erg_scX");

    var lblY =document.getElementById("erg_scY_lb_val");
	var rgY = document.getElementById("erg_scY");

	lblX.innerHTML  = parseFloat(rgX.value).toFixed(2) ;
	lblY.innerHTML  = parseFloat(rgY.value).toFixed(2) ;

	var vids = document.getElementsByTagName('video');
	for (var i = vids.length - 1; i >= 0; i--) {
		scale(vids[i],rgX.value, rgY.value );
	}
}

function scale(elm , x ,y ) {
	var str = "scale("+x+","+y+")";
     elm.style.msTransform = str;      /*IE9*/
    elm.style.transform = str;
}

function rgOnChange () {
	var lbl =document.getElementById("erg_pbs_lb_val");
	var rg = document.getElementById("erg_pbs");
	lbl.innerHTML  = parseFloat(rg.value).toFixed(2) ;

	var vids = document.getElementsByTagName('video');
	for (var i = vids.length - 1; i >= 0; i--) {
		vids[i].playbackRate  = rg.value;
	}
}

function Main(){

	var eDiv = document.createElement('div');
	eDiv.id = 'ediv';
	eDiv.style.zIndex = '99999' ;
	eDiv.style.position = 'relative';
	eDiv.style.height = '0px';
	eDiv.style.width = '0px';

	var eDivin = document.createElement('div');
	eDivin.id = 'edivin';
	eDivin.style.whiteSpace = 'nowrap!important';
	eDivin.style.background =  'rgba(34, 41, 47, 0.6)';
	eDivin.style.position = 'fixed';
	eDivin.style.bottom = '25%';
	//eDivin.style.bottom = '150px';
	eDivin.style.left = '0px';


	var ediv_timeout;
	document.onmousemove = function(){
		var ediv =document.getElementById("ediv");
		ediv.style.display = 'inline';

		clearTimeout(ediv_timeout);
		ediv_timeout = setTimeout(function(){
			var ediv =document.getElementById("ediv");
			ediv.style.display = 'none';
		;}, 2000);
	};


	var speedWrap   =  initHtml5PlaybackSpeed();
	var aspectXWrap =  initHtml5AspectRatioX();
	var aspectYWrap =  initHtml5AspectRatioY();

	eDivin.appendChild(speedWrap);
	eDivin.appendChild(aspectXWrap);
	eDivin.appendChild(aspectYWrap);

	eDiv.appendChild(eDivin);

	var vids = document.getElementsByTagName('video');

  console.log('vids.length:'+vids.length);

	for (var i = vids.length - 1; i >= 0; i--) {
		  vids[i].parentNode.insertBefore(eDiv ,vids[i] );
      console.log(i,eDiv ,eDivin);
	};


	try {
		if (vids.length > 0  )
		{
			document.getElementById('erg_pbs').onchange();
			document.getElementById('erg_scY').onchange();
			document.getElementById('erg_scX').onchange();
		}
	} catch(e) {
		console.log("@ Main - onchange: " +e);
	}

	console.log('html5 video Enchancer - Main - executed.');
	return vids.length;
}


