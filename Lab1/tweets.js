/* 
Creator: Kathleen Flynn
Class: ITWS 4500 Web Science Systems Development
Instructor: Professor Plotka
File Name: tweets.js
Purpose: .js for Lab 1; reads in data from the JSON file. 
Last Modified: 11 February 2015
*/


$(document).ready(function() {

  /* AJAX call to read in data from JSON file.  */
  $.ajax({
        type: "GET",
        url: "tweets-clean.json",
        dataType: "json",
        success: function(tweets, status){ 
        var onetweet; 
        var i = 0; 
        for (var i = 0; i < 5; i++) {
          $('#tweetlist').append("<li id=tweetitems>" + "<p>" + "<strong>" + tweets[i].user.name + "</strong>" + " " + "@" + tweets[i].user.screen_name+ "</p>" + "<p id='text'>" + tweets[i].text + "</p>" + "</li>");   
        }
        
        /* Counts the first five hashtags. */
        var j = 0; 
         
        /* Loops through all tweets in the file.  */
        var k = 0; 
        
        /* Looks at the length of the hashtags array.  */
        var l = 0; 
        
        /* Add the first five hashtags to the list of tweets. */
        while  (j < 5) {
          /* Check to see if a hashtag exists.  */
          if (tweets[k].entities.hashtags.length > 0)  {
            /* Loop through the total number of hashtags associated with the tweet. */ 
            for (var l = 0; l < tweets[k].entities.hashtags.length; l++) {
              /* Add hashtag to list of first five hashtags. */ 
              $('#hashtaglist').append("<li id=hashitems>" + "#" + tweets[k].entities.hashtags[l].text + "</li>");  
              j++; 
            }
          }
          k++;
        } 
        
        /* Every three seconds, loop through tweets, find hashtags, and animate hashtags through the ticker. */
        setInterval(function(){   
          /* This variable tracks the loop to ensure that one tweet at a time is being analyzed. */ 
          /* This process can definitely be implemented in a more effective manner. */ 
          var j = 0; 
          while (j < 1) { 
            /* Checks to make sure that a hastag exists.  */
            if ( (tweets[k].entities.hashtags) && (tweets[k].entities.hashtags.length > 0) ) {
              for (var l = 0; l < tweets[k].entities.hashtags.length; l++) {
                  /* For each hashtag, add class that will allow animation that will mark the top hashtag to be removed. */ 
                  $('.removehash:first').remove();
                  $('#hashtaglist li:first').addClass('removehash');
                  $('#hashtaglist li:first').hide(400);
                  /* Add hashtag to the list of hashtags.  */
                  $('#hashtaglist').append("<li id=hashitems>" + "#" + tweets[k].entities.hashtags[l].text + "</li>");
                  j++;  
               }
            }
            /* Advance to the next tweet.  */
            k++; 
            /* Restart at beginning of file if the end has been reached.  */
            if (k == tweets.length) {
                 k = 0; 
            }
          }  
        }, 3000);  
        
        /* Loop is found in set interval itself.  */
        setInterval(function(){ 
          if (i == tweets.length) {
               i = 0; 
          }
          /* For each tweet, add class that enables animation that will mark the top hashtag to be removed. */ 
          $('.toberemove:first').remove();
          $('#tweetlist li:first').addClass('toberemove');
          
          /* Hide provides animation */
          $('#tweetlist li:first').hide(400);
          $('#tweetlist').append("<li id=tweetitems>" + "<p>" + "<strong>" + tweets[i].user.name + "</strong>" + " " + "@" + tweets[i].user.screen_name+ "</p>" + "<p id='text'>" + tweets[i].text + "</p>" + "</li>");   

          i++; 
          
        }, 3000);  
           
       },
   
        /* Error message in the case that the AJAX does not successfully execute. */ 
        error: function(msg, e) {
          alert("There was a problem: " + msg.status + " " + msg.statusText + e);
        }
  });
  
  
});
