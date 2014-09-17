// forked from rotsuya's "RSS Reader with jQuery Mobile" http://jsdo.it/rotsuya/411c
/* configuration */
var maxLength = 20;
/* writing HTML */
document.write(
  '<div data-role="page" id="list">' +
  '<div data-role="header" data-position="fixed" data-tap-toggle="false" >' +
  '<div data-role="fieldcontain" >' +
  '<select name="select-choice-1" id="select-choice">' +
     '<option value="it">IT</option>' +
     '<option value="politics">Politics</option>' +
     '<option value="economy">Economy</option>' +
     '<option value="sports">Sports</option>' +
     '<option value="world">World</option>' +
     '<option value="entertainment">Entertainment</option>' +
     '<option value="w3">W3 Feed</option>' +
  '</select></div>'+
  '<img id="nameBorder" src="./image/nameBorder.png"></div>' +
  '  <div data-role="content">' +
  '    <ul data-role="listview" data-filter="true" class="list" id="articleList">'
  
);
for(var i=1; i<=maxLength; i++){
	  document.write(
			  '<li class="ui-icon-alt" id="list' + i + '"><a style="border-color:#333333; border-width:1px; color:#B6B6B6" href="#article' + i + '" id="link' + i + '">&nbsp;</a>' +
			  	'<div class="newsLink">sample.com</div>' +
			  '</li>' 
	  );
	}
	document.write(
	  '    </ul>' +
	  '  </div>' +
	  '</div>'
	);
	for(i=1; i<=maxLength; i++){
	  document.write(
	    '<div data-role="page" id="article' + i + '">' +
	    '  <div data-role="header" data-position="inline">' +
	    '<a href="#list" data-role="button" data-icon="home" data-back="true">Home</a>' +
	    '    <h1 id="articleHeader' + i + '">&nbsp;</h1>' +
	    
	    '  <div data-role="content">' +
	    '    <div id="articleContent' + i + '" class="articleContent"></div>' +
	    
	    '    <a href="#" id="openButton' + i + '" data-role="button" data-icon="plus"' +
	    '      class="ui-btn-right" rel="external">Open</a>' +
	    '  </div>' +
	    '    <div data-role="controlgroup" data-type="horizontal">' +
	    '      <a href="#article' + String(i-1) + '" data-role="button" data-icon="arrow-l"' +
	    '        data-inline="true" class="prevButton">Prev</a>' +
	    '      <a href="#article' + String(i+1) + '" data-role="button" data-icon="arrow-r"' +
	    '        data-inline="true" class="nextButton" data-iconpos="right">Next</a>' +
	    '		<img style="margin-left:180px; width: 30px; height:30px; float:right" id="bookmark" src="./image/star.png">' +
	    '    </div>' +
	    '  </div>' +
	    
	    '</div>'
	  );
	}
	/* JSONP */
	$(function(){
	  // getOnlineFeed('http://www4.lehigh.edu/news/rss/LUnews_rss.xml');
		
		// IT
	  getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=f92c03209775e92514ecd72a3348786f&_render=rss');
	  
	});
	/* functions */
	var listEntries = function(json) {
		console.log('hihihi')
	  if (!json.responseData.feed.entries) return false;
	  $('#widgetTitle').text(json.responseData.feed.title);
	  var articleLength =json.responseData.feed.entries.length;
	  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
	  for (var i = 1; i <= articleLength ; i++) {
	    var entry = json.responseData.feed.entries[i-1];
	    $('#list' + i + ' .newsTitle').text(entry.title);
	    $('#link' + i).text(entry.title);
	    $('#list' + i + ' .newsLink').text(entry.link);
	    $('#articleHeader' + i).text(entry.title);
	    $('#openButton' + i).attr('href', entry.link);
	    $('#articleContent' + i).append(entry.content);
	  }
	  $('#article1 .prevButton').remove();
	  $('#article' + articleLength + ' .nextButton').remove();
	  if (articleLength < maxLength) {
	    for (i = articleLength + 1; i <= maxLength; i++) {
	      $('#list' + i).remove();
	      $('#article' + i).remove();
	    }
	  }
	};
	var getOnlineFeed = function(url) {
		 var script = document.createElement('script');
		  script.setAttribute('src', 'http://ajax.googleapis.com/ajax/services/feed/load?callback=listEntries&hl=ja&output=json-in-script&q='
		                      + encodeURIComponent(url)
		                      + '&v=1.0&num=' + maxLength);
		  document.documentElement.firstChild.appendChild(script);
	};
	var getOfflineFeed = function(url) {
	  var script = document.createElement('script');
	  script.setAttribute('src', url);
	  script.setAttribute('type', 'text/javascript');
	  document.documentElement.firstChild.appendChild(script);
	};
	
	
	$('#backButton').click(function(e){
    	window.history.back();
    })
	
	var init = function () {
		$('#backButton').click(function(e){
	    	window.history.back();
	    })
	}
	
	window.onload = init;
	
	$(document).delegate('#select-choice', 'change', function(e) {
		var selected = $("#select-choice option:selected").val();
		
		if(selected == 'politics'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=1a64c4c5fee89fc691a7e080aae0b09f&_render=rss');
				$('#articleList').html($('#articleList').html());
		}
		else if(selected == 'economy'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=9e83d5868ca4927d78ab6864c6b4faa4&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
		else if(selected == 'sports'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=0b156bca1cc1054584450002a33b940b&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
		else if(selected == 'world'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=73ed191c0dc18c5a5cd8f88ccacdf33b&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
		else if(selected == 'entertainment'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=03854acc2e7661dd8efd2cda00a212ef&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
		else if(selected == 'w3'){
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=bd5db8e871a21ad53efb9584a4f25245&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
		else if(selected == 'it'){
			
			getOnlineFeed('https://pipes.yahoo.com/pipes/pipe.run?_id=f92c03209775e92514ecd72a3348786f&_render=rss');
			$('#articleList').html($('#articleList').html());
			var listEntries = function(json) {
				  if (!json.responseData.feed.entries) return false;
				  $('#widgetTitle').text(json.responseData.feed.title);
				  var articleLength =json.responseData.feed.entries.length;
				  articleLength = (articleLength > maxLength) ? maxLength : articleLength;
				  for (var i = 1; i <= articleLength ; i++) {
				    var entry = json.responseData.feed.entries[i-1];
				    $('#list' + i + ' .newsTitle').text(entry.title);
				    $('#link' + i).text(entry.title);
				    $('#list' + i + ' .newsLink').text(entry.link);
				    $('#articleHeader' + i).text(entry.title);
				    $('#openButton' + i).attr('href', entry.link);
				    $('#articleContent' + i).append(entry.content);
				  }
				  $('#article1 .prevButton').remove();
				  $('#article' + articleLength + ' .nextButton').remove();
				  if (articleLength < maxLength) {
				    for (i = articleLength + 1; i <= maxLength; i++) {
				      $('#list' + i).remove();
				      $('#article' + i).remove();
				    }
				  }
				};
		}
			
	});