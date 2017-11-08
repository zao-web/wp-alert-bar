window.WPAlertBar = window.WPAlertBar || {};

( function( window, document, $, app, Cookie, undefined ) {
	'use strict';

	app.cache = function() {
		app.$         = {};
		app.$.alert   = $( '.site-notice' );
		app.$.dismiss = app.$.alert.find( '.dashicons-dismiss' );
		app.$.hash    = app.hash( app.$.alert.html() );

		console.log( app.$.hash );

		app.$.cookies = Cookie.getJSON( 'wp-alerts' ) || [];

		console.log( app.$.cookies );
	};

	app.hash = function( str ) {
		var hash = 0, i, chr;

		if ( str.length === 0 ) {
			return hash;
		}

		for ( i = 0; i < str.length; i++ ) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	};

	app.maybe_show_bar = function() {

		if ( app.$.alert.find( 'p' ).text().length === 0 ) {
			return;
		}

		app.$.alert.toggle( -1 === $.inArray( app.$.hash, app.$.cookies ) );
	};

	app.dismiss_alert = function() {
		app.$.cookies.push( app.$.hash );
		Cookies.set( 'wp-alerts', app.$.cookies );
		app.maybe_show_bar();
	};

	app.init = function() {
		app.cache();
		app.maybe_show_bar();
		app.$.dismiss.on( 'click', app.dismiss_alert );
	};

	$( app.init );

}( window, document, jQuery, window.WPAlertBar, Cookies ) );
