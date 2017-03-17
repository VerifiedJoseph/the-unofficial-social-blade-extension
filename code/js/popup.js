window.onload = function() {
	
	// Event listener for opening options page
	document.getElementById('options').addEventListener('click', function() {
		
		window.open(chrome.runtime.getURL('options_tab.html'));
		
	});
		
	chrome.storage.sync.get({
		// Use default values
		channel_one: '',
		channel_two: '',
	}, function(items) {
			
		if (localStorage.getItem("Name") != null && items.channel_one == '') { // See if a localStorage item is set 

			var channel = localStorage.getItem("Name");
	
			 // Update chrome.storage with the localStorage item
			chrome.storage.sync.set({channel_one: channel}, function() {
				console.log('Added localStorage name to chrome sync storage');
	
				items.channel_one = channel;
	
				display(items);
	
			});
			
		} else {
	
			display(items);
	
		}

	});	
	
	
	function display(items) { // Display the iframes
		
		if(items.channel_one == "" && items.channel_two == "") {
			document.getElementById('error').style.display = 'block';
			
			document.getElementById('options-e').addEventListener('click', function() {

				window.open(chrome.runtime.getURL('options_tab.html'));
		
			});
			
		} else {
			var iframeOne = "";
			var iframeTwo = "";
			
			if(items.channel_one != "") {
				iframeOne = '<div id="iframe">'+
				'<a class="iframe-title-a" target="_blank" href="http://socialblade.com/youtube/user/' + items.channel_one +'">'+
				'<div class="iframe-title"></div></a>'+
				'<div class="iframe-show"><iframe id="fr" src="http://widget.socialblade.com/widget.php?u=' + items.channel_one +'" style="overflow: hidden; height: 116px; width: 220px; border: 0;" scrolling="no" frameBorder="0"></iframe>'+
				'</div></div>';
				
			}
			
			if(items.channel_two != "") {
				iframeTwo = '<div id="iframe">'+
				'<a class="iframe-title-a" target="_blank" href="http://socialblade.com/youtube/user/' + items.channel_two +'">'+
				'<div class="iframe-title"></div></a>'+
				'<div class="iframe-show"><iframe id="fr" src="http://widget.socialblade.com/widget.php?u=' + items.channel_two +'" style="overflow: hidden; height: 116px; width: 220px; border: 0;" scrolling="no" frameBorder="0"></iframe>'+
				'</div></div>';
			}
			
			//$('.iframe-title-a').attr('href', 'http://socialblade.com/youtube/user/' + items.channel);
			document.getElementById('iframe-wrap').innerHTML = iframeOne + iframeTwo;
	
		}
		
	}
	
}
