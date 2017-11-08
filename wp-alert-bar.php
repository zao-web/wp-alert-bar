<?php
/**
 * Plugin name: WP Alert Bar
 * Description: Alert bar, driven by the Customizer.
 * Author: Justin Sainton, Zao
 * Plugin URL: https://zao.is
 *
 * @package Zao_Alert_Bar
 */
namespace Zao_Alert_Bar;

/**
 * Register selective refresh partial.
 *
 * @param \WP_Customize_Manager $wp_customize Manager.
 */
function register_selective_refresh_partial( \WP_Customize_Manager $wp_customize ) {

	if ( ! isset( $wp_customize->selective_refresh ) ) {
		return;
	}

	$wp_customize->add_section( 'zao_alert_bar', array(
		'title' => __( 'Alert Bar' ),
		'description' => __( 'Adjust your alert settings' ),
		'priority' => 10,
		'capability' => 'manage_options',
	) );

	$wp_customize->add_setting( 'zao_wp_alert_bar', array(
		'type' => 'option',
		'capability' => 'manage_options',
		'default' => '',
		'transport' => 'postMessage',
		'sanitize_callback' => 'wp_kses_post',
	) );

	$wp_customize->add_setting( 'wp_alert_bg_color', array(
		'type' => 'option',
		'capability' => 'manage_options',
		'default' => '#d8272d',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport' => 'postMessage',
	) );

	$wp_customize->add_setting( 'wp_alert_link', array(
		'type' => 'option',
		'capability' => 'manage_options',
		'default' => '',
		'sanitize_callback' => 'esc_url',
		'transport' => 'postMessage',
	) );

	$wp_customize->add_control(
        'zao_alert_bar',
        array(
            'label'    => __( 'Alert Message' ),
			'section'  => 'zao_alert_bar',
			'settings' => 'zao_wp_alert_bar',
			'type'     => 'textarea'
        )
	);

	$wp_customize->add_control(
        'wp_alert_link',
        array(
            'label'    => __( 'Alert Message Link' ),
			'description' => 'If set, text will link to page.',
			'section'  => 'zao_alert_bar',
			'settings' => 'wp_alert_link',
			'type'     => 'text'
        )
	);

	$wp_customize->add_control(
		new \WP_Customize_Color_Control(
		$wp_customize,
		'wp_alert_bg_color',
		array(
			'label'      => __( 'Alert Bar Background Color', 'mytheme' ),
			'section'    => 'zao_alert_bar',
			'settings'   => 'wp_alert_bg_color',
		) )
	);

	$partial = array(
	   'selector'            => '.site-notice',
	   'render_callback'     => function() { get_template_part( 'template-parts/header', 'alert' ); },
	   'container_inclusive' => true,
   );

	// Note that this would be changed to $wp_customize->add_partial() once the method is added to WP_Customize_Manager.
	$wp_customize->selective_refresh->add_partial( 'zao_wp_alert_bar', $partial );
	$wp_customize->selective_refresh->add_partial( 'wp_alert_bg_color', $partial );
	$wp_customize->selective_refresh->add_partial( 'wp_alert_link', $partial );

}

add_action( 'customize_register', __NAMESPACE__ . '\register_selective_refresh_partial', 100 );

function enqueue_customizer_script() {
	wp_enqueue_script(
		  'wp-alert-bar-customizer',			//Give the script an ID
		  plugin_dir_url( __FILE__ ).'/theme-customizer.js',//Point to file
		  array( 'jquery','customize-preview' ),	//Define dependencies
		  time(),						//Define a version (optional)
		  true						//Put script in footer?
	);
}

add_action( 'customize_preview_init', __NAMESPACE__ . '\enqueue_customizer_script' );

function enqueue_alert_script() {
	wp_register_script( 'cookies', 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js' );

	wp_enqueue_script(
		  'wp-alert-bar',			//Give the script an ID
		  plugin_dir_url( __FILE__ ).'/wp-alert-bar.js',//Point to file
		  array( 'jquery','cookies' ),	//Define dependencies
		  time(),						//Define a version (optional)
		  true						//Put script in footer?
	);
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_alert_script' );
