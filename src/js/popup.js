/*jslint node: true */
/*global chrome */
"use strict";

(function () {
	
	/* 
		Check api type (chrome (based. e.g: opera), Firefox or MS Edge)
	*/
	if (typeof chrome !== 'undefined' && typeof browser === 'undefined') {
		var browser = chrome;
	}
	
	/*
		Create a Iframe
	*/
	function createIframe(channel) {
		
		var div = document.createElement('div'),
			divShow = document.createElement('div'),
			iframe = document.createElement('iframe'),
			img = document.createElement('img'),
			a = document.createElement('a');
		
		// Img 1px
		img.className = 'iframe-link';
		img.setAttribute('src', '../images/1px.png');
		img.setAttribute('title', 'Click to go to stats page');
		a.appendChild(img);

		// a href
		a.href = 'http://socialblade.com/youtube/user/' + channel;
		a.setAttribute('target', '_blank');
		a.className = 'iframe-title-a';
		div.appendChild(a);
		
		// Div Show
		divShow.className = 'iframe-show';
		div.appendChild(divShow);
		
		// Div
		div.className = 'iframe';
		
		// Iframe
		iframe.setAttribute('src', 'http://widget.socialblade.com/widget.php?u=' + channel);
		iframe.setAttribute('sandbox', '');
		iframe.style.width = '220px';

		 // Set diferent iframe height for Firefox (http://stackoverflow.com/a/26358856)
		if (navigator.userAgent.indexOf("Firefox") !== -1) {
			iframe.style.height = '130px';
			
		} else { // All other browsers
			iframe.style.height = '116px';
		}
		
		iframe.style.border = '0';
		iframe.style.overflow = 'hidden';
		iframe.scrolling = 'no';
		divShow.appendChild(iframe);
		
		// Add iframe to iframe-wrap
		document.getElementById('iframe-wrap').appendChild(div);
 
	}
	
	/*
		Display iframes
	*/
	function display(items) {
		
		if (items.channel_one === '' && items.channel_two === '') {
			document.getElementById('error').style.display = 'block';
			
			document.getElementById('options-e').addEventListener('click', function () {

				window.open(chrome.runtime.getURL('html/options.html'));
		
			});
			
		} else {
			
			if (items.channel_one !== '') {
				createIframe(items.channel_one);
			}
			
			if (items.channel_two !== '') {
				createIframe(items.channel_two);
			}

		}
		
	}
	
	/*
		Fetch channels from storage
	*/
	browser.storage.sync.get({
		// Use default values
		channel_one: '',
		channel_two: ''
	}, function (items) {

		display(items);
	
		if (browser.runtime.lastError) {
			console.log(browser.runtime.lastError);
		}
		
	});
	
	/* 
		Event listener for opening options page
	*/
	document.getElementById('options').addEventListener('click', function () {

		window.open(browser.runtime.getURL('html/options.html'));

	});

}());