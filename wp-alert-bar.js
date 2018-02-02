window.WPAlertBar = window.WPAlertBar || {};

( function( window, document, $, app, Cookie, undefined ) {
	'use strict';

	app.cache = function() {
		app.$         = {};
		app.$.body   = $( document.body );
		app.$.alert   = $( '.site-notice' );
		app.$.dismiss = app.$.alert.find( '.dashicons-dismiss' );
		app.$.hash    = app.$.alert.length ? app.hash( app.$.alert.html() ) : 0;
		app.$.cookies = Cookie.getJSON( 'wp-alerts' ) || [];
	};

	app.hash = function( str ) {
		var hash = 0, i, chr;

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

		var hasCookie = -1 !== $.inArray( app.$.hash, app.$.cookies );

		app.$.alert.toggleClass( 'hide-notice', hasCookie );
		app.$.body.toggleClass( 'wp-alerts-hidden', hasCookie );
		app.$.body.toggleClass( 'wp-alerts-visible', ! hasCookie );
	};

	app.setCookies = function() {
		app.$.cookies.push( app.$.hash );
		Cookies.set( 'wp-alerts', app.$.cookies );
	};

	app.dismiss_alert = function() {
		app.setCookies();
		app.maybe_show_bar();
	};

	app.init = function() {
		app.cache();
		app.maybe_show_bar();
		app.$.dismiss.on( 'click', app.dismiss_alert );
	};

	$( app.init );

}( window, document, jQuery, window.WPAlertBar, Cookies ) );
