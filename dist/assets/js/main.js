// Set to your domain
var website = 'asus.com';

// An array of href values you would like to skip to use the ID / Title / innerText instead
var skipHREF = ['bit.ly','javascript:void'];

// Function fired upon clicking event handler
function sendClick() {

  var label = getLabel(this) || null;
  label ? sendGAEvent('button','click',label) : console.log("error");
  
  // if the element has a class external, add a 100 millisecond delay so GA can catch up and capture the event
  if (this.classList.contains('external')) {
    var href = this.href;
    event.preventDefault();
    setTimeout(function() {
      document.location = href;
    },100);
  }
  
}

// Send target to this function to get a good label
function getLabel(context) {
  return isInArray( skipHREF, context.href.toLowerCase() ) ? context.id || context.title || context.innerText : context.href.toLowerCase();
}

/* 
Simple send event to GA
  type = the name of what is clicked
  action = what happened
  label = href / ID / title / innerText of what is clicked
*/
function sendGAEvent(type,action,label) {
  ga('send','event',type,action,label);
}

// Simple check if something is inside an array
function isInArray(array,value) {
  for (var i = array.length; i--;) {
    if (value.indexOf(array[i]) > -1) return true;
  }
  return false;
}

// send event once per 30 seconds to help bounce rates http://briancray.com/
// I've adjusted Brian's code to 30 seconds for my use
(function (tos) {
  window.setInterval(function () {
    tos = (function (t) {
      return t[0] == 30 ? (parseInt(t[1]) + 1) + ':00' : (t[1] || '0') + ':' + (parseInt(t[0]) + 30);
    })(tos.split(':').reverse());
    ga('send', 'event', 'Time', 'Log', tos);
  }, 30000);
})('00');

// GA Code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// Function to be called upon page load
function createAnalytics(UA) {
  ga('create', UA, website);
  ga('send', 'pageview');
}

// Get all <a> tags and create nodeList
var a = document.getElementsByTagName('a');
// Iterate through nodeList `a` and addEventListener to each
for (var i=a.length; i--;) {
  a[i].addEventListener('click', sendClick, false);
}