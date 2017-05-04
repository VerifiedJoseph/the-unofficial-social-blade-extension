/*jslint node: true */
/*global chrome */
"use strict";

(function () {
	
	var status = document.getElementById("status");
	
	/* 
		Check api type (chrome (based. e.g: opera), Firefox or MS Edge)
	*/
	if (typeof chrome !== 'undefined' && typeof browser === 'undefined') {
		var browser = chrome;
	}
	
	/*
		Save option to storage
	*/
	function save_options() {
		var channel_one = document.getElementById('channel_1').value,
			channel_two = document.getElementById('channel_2').value;
		
		if (channel_one === '' && channel_two === '') { // No channels entered	
			status.textContent = "Enter a channel name or ID!";
			
			setTimeout(function () {
				status.textContent = "";
			}, 1750);
		
		} else {
			
			browser.storage.sync.set({
				channel_one: channel_one,
				channel_two: channel_two
			}, function () {
	
				// Update status to let user know options were saved.
				status.textContent = 'Options saved.';
				
				setTimeout(function () {
					status.textContent = '';
				}, 1750);
				
			});
			
		}
	}
	
	/*
		Load and display current options
	*/
	browser.storage.sync.get({
		// Use default values
		channel_one: '',
		channel_two: ''
	}, function (items) {

		document.getElementById('channel_1').value = items.channel_one;
		document.getElementById('channel_2').value = items.channel_two;
		
	});
	
	/* 
		Event listener for saving options
	*/
	document.getElementById('save').addEventListener('click', save_options);

}());