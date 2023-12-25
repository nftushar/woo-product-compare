<?php
/**
 * Plugin Name: Product Compare
 * Description: responsive Product Compare for wordpress and more..
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: woopc
 */ 

// // Constant
// define( 'B_BLOCKS_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.7.8' );
// define( 'B_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

// require_once plugin_dir_path( __FILE__ ) . 'inc/block.php';


// ABS PATH
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Check if constants are not defined
if ( ! defined( 'B_BLOCKS_VERSION' ) ) {
    define( 'B_BLOCKS_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.7.8' );
}

if ( ! defined( 'B_BLOCKS_DIR_URL' ) ) {
    define( 'B_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );
}

require_once plugin_dir_path( __FILE__ ) . 'inc/block.php';