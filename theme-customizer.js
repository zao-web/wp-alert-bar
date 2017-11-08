/**
 * This file adds some LIVE to the Theme Customizer live preview. To leverage
 * this, set your custom settings to 'postMessage' and then add your handling
 * here. Your javascript should grab settings from customizer controls, and
 * then make any necessary changes to the page using jQuery.
 */
( function( $ ) {

	//Update site title color in real time...
	wp.customize( 'zao_wp_alert_bar', function( value ) {
		value.bind( function( newval ) {
			$('.site-notice .text').html( newval );
		} );
	} );

	//Update alert bar background color...
	wp.customize( 'wp_alert_bg_color', function( value ) {
		value.bind( function( newval ) {
			$('.site-notice').css('background-color', newval );
		} );
	} );

	//Update site link color in real time...
	wp.customize( 'wp_alert_link', function( value ) {
		value.bind( function( newval ) {
			$('.site-notice a').attr('href', newval );
		} );
	} );

} )( jQuery );
