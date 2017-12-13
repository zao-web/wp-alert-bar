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

	//Update site link color in real time...
	wp.customize( 'wp_alert_link_color', function( value ) {
		value.bind( function( newval ) {
			$('.site-notice a').css('color', newval );
			$('.site-notice a').css('border-bottom', '1px solid ' + newval );
		} );
	} );

	//Update site link hover color in real time...
	wp.customize( 'wp_alert_link_hover_color', function( value ) {
        value.bind( function( newval ) {
            var style, el;
            style = '<style class="hover-styles">.site-notice a:hover { color: ' + newval + '!important; border-bottom: 1px solid ' + newval + '!important;}</style>'; // build the style element
            el =  $( '.hover-styles' ); // look for a matching style element that might already be there

            // add the style element into the DOM or replace the matching style element that is already there
            if ( el.length ) {
                el.replaceWith( style ); // style element already exists, so replace it
            } else {
                $( 'head' ).append( style ); // style element doesn't exist so add it
            }
        } );
    } );

} )( jQuery );
