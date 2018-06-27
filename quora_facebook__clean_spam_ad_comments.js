// ==UserScript==
// @version      0.1
// @description
// @author       You
// @name        quora ,facebook - clean spam,ad comments
// @namespace   quora -  text ad clean

// @include     /^.*quora\.com/.*$/
// @include    /^.*facebook\.com/.*$/
// @include     /^.*fbcdn\.net/.*$/

// @include-diss     /^.*$/

// @grant        none
// ==/UserScript==


(function(){
  "use strict";


function ContainsAll(text , substrArr){
    var containsAll = true;
    for (var j = substrArr.length - 1; j >= 0; j--)
    {
        var indx = text.indexOf( substrArr[j] );
        if(  indx <0)
        {
            containsAll = false;
            break;
        }
    }
    return  containsAll;
}


function HideAdv (nodelist ,spamWords){
	//  syncronized loop
	for (var i = nodelist.length - 1; i >= 0; i--)
	{
		var itm = nodelist[i];
		//console.log(ContainsAll( itm.outerHTML, spamWords) );
		if(  ContainsAll( itm.outerHTML, spamWords)  )
	    {
	        console.log( "hidden-item", itm);
	        /*
	        itm.style.display = 'none';
	        itm.style.overflow = 'hidden'	 ;
	       */

	        itm.innerHTML = '.........Spam Deleted.......';
	    }
	}
}

function ProcessSpamDefs(objs){
	//debugger;
    for(var i =0; i<objs.length; i++)
    {
        var items =  document.querySelectorAll( objs[i].cssSelector );
        if(items == null)
        	return;
        HideAdv(items ,objs[i].spamWords);
    }
}

var objs =
[
    {
        "cssSelector":".pagedlist_item",
        "spamWords":[ "promoted" , "by"],
    },
     {
        "cssSelector":".PromptsList",
        "spamWords":[  "by"],
    },
     {
        "cssSelector":".top_slot",
        "spamWords":[  "by"],
    },
    {
        "cssSelector":"._3-8y._5nz1",  /* .class1.class2 : connected means they are on the same element*/
        "spamWords":[ "reading" , "parents" ,"die", "curse"],
    },
    {
        "cssSelector":"[id*=_content_box]",  /* id contantains substring*/
        "spamWords":[ "by"],
    },

];




ProcessSpamDefs(objs);

var repeatNtimes = 6;
var  myInterval = setInterval(function(){

	var ifs = document.getElementsByTagName('iframe');
	for (var i = ifs.length - 1; i >= 0; i--) {
		if(ifs[i].src.indexOf("comments.php") )
			console.log("iframes:"+ifs.length, ifs[i].src , ifs[i] ) ;
	}


    try{

    //facebook  curse clean at manga sites
    ProcessSpamDefs(objs);

    var url = document.location.href.substring(0, document.location.href.indexOf('?'));
    console.log(url,"spam cleaner -interval-end:"+repeatNtimes);

    //items.length > 0 ||
    if(repeatNtimes--<=0 )
        window.clearInterval(myInterval);

    } catch(err){ console.log("exc:", err);}


},2500);




})();

