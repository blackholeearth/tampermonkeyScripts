// ==UserScript==
// @name        drama - title clean
// @namespace   html5 speed changer
// @include     /^.*fastdrama\.co/.*$/
// @include     /^.*drama3s\.com/.*$/
// @include     /^.*kissasian\.ch/.*$/
// @include     /^.*ondramanice\.io/.*$/
// @version     1
// @grant       none
// ==/UserScript==


try {
   replaceltitle();
 }
catch(err) {
    document.getElementsByClassName("page")[0].innerHTML = err.message;
  }


function replaceltitle () {
  //alert( document.title);
  var doctit = document.title ;

  var NonlatinPtrn = "[^|\\- a-zA-Z0-9]";
  var regex1 = new RegExp(NonlatinPtrn,  "ig");
  doctit = doctit.replace(regex1, '');

  var fastDrmPtrn = "Episode|English|Subbed|Korea(n)?|Drama(nice)?|2017|Watch|online| at |and Download free on FastDrama";
  var regex2= new RegExp(fastDrmPtrn,  "ig" );
  doctit = doctit.replace(regex2, '');

  var drm3sPtrn = "( eng)|( sub)|vip [0-9]|high quality";
  var regex3= new RegExp(drm3sPtrn,  "ig" );
  doctit = doctit.replace(regex3, '');

  if(  document.URL.indexOf("kissasian.ch") !== -1){

     doctit = doctit.split('-')[0];
  }

  document.title =doctit;
}


