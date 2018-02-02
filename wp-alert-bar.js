window.WPAlertBar = window.WPAlertBar || {};

( function( window, document, $, app, Cookies, undefined ) {
	'use strict';

	app.cache = function() {
		app.$         = {};
		app.$.body    = $( document.body );
		app.$.alert   = $( '.site-notice' );
		app.$.dismiss = app.$.alert.find( '.dashicons-dismiss' );
		app.hash      = app.$.alert.length ? app.getHash( app.$.alert.html() ) : 0;
		app.cookies   = Cookies.getJSON( 'wp-alerts' ) || [];
	};

	app.getHash = function( str ) {
		var hash = 0, i, chr;

		for ( i = 0; i < str.length; i++ ) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	};

	app.maybeShowBar = function() {
		if ( app.$.alert.find( 'p' ).text().length === 0 ) {
			return;
		}

		var hasCookie = app.hasCookie();

		app.$.alert.toggleClass( 'hide-notice', hasCookie );
		app.$.body.toggleClass( 'wp-alerts-hidden', hasCookie );
		app.$.body.toggleClass( 'wp-alerts-visible', ! hasCookie );
	};

	app.hasCookie = function() {
		var has = -1 !== $.inArray( app.hash, app.cookies );

		// If they don't have THIS cookie, but the cookie object exists, delete it.
		if ( ! has && app.cookies.length ) {
			app.deleteCookies();
		}

		return has;
	};

	app.setCookies = function() {
		app.cookies.push( app.hash );
		Cookies.set( 'wp-alerts', app.cookies );
	};

	app.deleteCookies = function() {
		Cookies.remove( 'wp-alerts' );
	};

	app.dismissAlert = function() {
		app.setCookies();
		app.maybeShowBar();
	};

	app.init = function() {
		app.cache();
		app.maybeShowBar();
		app.$.dismiss.on( 'click', app.dismissAlert );
	};

	$( app.init );

}( window, document, jQuery, window.WPAlertBar, Cookies ) );
