
	document.addEventListener('DOMContentLoaded', restore_options);
	document.getElementById('save').addEventListener('click',save_options);
		
	// Saves options to chrome.storage.sync.
	function save_options() {
		var channel_one = document.getElementById('channel_1').value;
		var channel_two = document.getElementById('channel_2').value;
		
		if(document.getElementById("channel_1").value == '' && document.getElementById("channel_2").value == '') { // No channe entered
			var status = document.getElementById("status");
			status.innerHTML = "<span style='color:red;'><B>Enter a channel name!</B></span>";
			setTimeout(function() {
				status.innerHTML = "";
			}, 1750);
		
		} else {
			chrome.storage.sync.set({
				channel_one: channel_one,
				channel_two: channel_two,
			}, function() {
	
				// Update status to let user know options were saved.
				var status = document.getElementById('status');
				status.textContent = 'Options saved.';
				setTimeout(function() {
					status.textContent = '';
				}, 1750);
			});
		}
	}

	// Restores select box and checkbox state using the preferences
	// stored in chrome.storage.
	function restore_options() {

		chrome.storage.sync.get({		
			// Use default values
			channel_one: '',
			channel_two: '',
		}, function(items) {
			
			console.log(items);
			
			document.getElementById('channel_1').value = items.channel_one;
			document.getElementById('channel_2').value = items.channel_two;
		});
	}