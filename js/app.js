var forEach = function(arr, func){
   for(var i = 0 ; i < arr.length; i++){
       func(arr[i], i, arr)
   }
}

var isNull = function(someStr){
  if(someStr === null){
  someStr = 'undefined';
  }
  return someStr;
}


var theEntireContainerEl = document.querySelector(".congress-members")
var searchBarEl = document.querySelector('.search-bar')

$.getJSON("https://congress.api.sunlightfoundation.com/legislators?callback=?").then(function(serverRes){
  console.log(serverRes)
  forEach(serverRes.results, function(congressObj, i, theArr){
    var finalBlock = ''
    var fullName = congressObj.first_name + ' ' + congressObj.last_name;
    var repInfo = congressObj.party + '-' + congressObj.state_name;
    var personalEmail = isNull(congressObj.oc_email);
    var personalWebsite = isNull(congressObj.website);
    var facebookFilePath = isNull(congressObj.facebook_id);
    var twitterYo = isNull(congressObj.twitter_id);
    var termEndDate = congressObj.term_end;
    var eachBlockEl = "<h2 class='rep_name'>" + fullName + "</h2>";
    eachBlockEl += "<p class='rep-party'><strong>Rep -- " + repInfo + "</strong></p>";
    eachBlockEl += "<ul class='social-media'>";
    eachBlockEl += "<li>email: " + personalEmail + "</li>";
    eachBlockEl += "<li>website: " + personalWebsite + "</li>";
    eachBlockEl += "<li>facebook: " + facebookFilePath + "</li>";
    eachBlockEl += "<li>twitter: " + twitterYo + "</li>";
    eachBlockEl += "</ul>";
    eachBlockEl += "<p class='term-information'>Term End" + termEndDate + "</p>";
    finalBlock = "<div class='representative'>" + eachBlockEl + "</div>";
    theEntireContainerEl.innerHTML += finalBlock;
  })
})



  searchBarEl.addEventListener('keypress', function(e){
  $.getJSON("https://congress.api.sunlightfoundation.com//districts/locate?zip=" + theTextInput).then(function(serverRes){
    console.log(serverRes)
  })
  var keyCode = e.keyCode;
  if(keyCode === 13){
    var theTextInput = document.getElementById("search-text").value;
  }
})
