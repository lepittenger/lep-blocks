<?php
/**
 * Plugin Name: WDS Blocks
 * Plugin URI:  https://github.com/WebDevStudios/WDS-Blocks/
 * Description: WebDevStudios library of Gutenberg blocks.
 * Author: WebDevStudios
 * Author URI: https://webdevstudios.com
 * Version:     2.2.3
 * License:     GPLv2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: wdsblocks
 * Domain Path: /languages
 *
 * @package WebDevStudios\Blocks
 * @since 2.0.0
 */

namespace WebDevStudios\Blocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author WebDevStudios
 * @since 2.0.0
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/index.css';
	$frontend_style  = 'build/style-index.css';
	$frontend_script = 'build/frontend.js';

	// Verify we have an editor script.
	if ( ! file_exists( plugin_dir_path( __FILE__ ) . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the WDS Block Starter first.', 'wdsblocks' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'wdsblocks-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'wdsblocks-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'wdsblocks-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register blocks with WordPress.
	register_block_type(
		'wdsblocks/sitemaps',
		[
			'editor_script' => 'wdsblocks-editor-script',
			'editor_style'  => 'wdsblocks-editor-style',
			'style'         => 'wdsblocks-style',
		]
	);

	register_block_type(
		'wdsblocks/sitemap-item',
		[
			'render_callback' => __NAMESPACE__ . '\render_sitemap_item_block',
			'attributes'      => [
				'title'             => [
					'type'    => 'string',
					'default' => '',
				],
				'contentType' => [
					'type'    => 'string',
					'default' => 'post',
				],
				'order'       => [
					'type'    => 'string',
					'default' => 'DESC',
				],
				'orderby'     => [
					'type'    => 'string',
					'default' => 'post_date',
				],
				'categoriesFilter' => [
					'type'         => 'string',
					'default'      => '',
				],
				'tagsFilter' => [
					'type'         => 'string',
					'default'      => '',
				],
				'authorFilter' => [
					'type'         => 'string',
					'default'      => '',
				],
				'numberOfPosts' => [
					'type'         => 'number',
					'default'      => '-1',
				],
			],
		]
	);

	// Register frontend script.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'wdsblocks-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Adds a WDS Block category to the Gutenberg category list.
 *
 * @author WebDevStudios
 * @since 2.0.0
 *
 * @param array  $categories The existing categories.
 * @param object $post The current post.
 * @return array The updated array of categories.
 */
function register_block_category( $categories, $post ) {

	return array_merge(
		$categories,
		[
			[
				'slug'  => 'wds-blocks',
				'title' => esc_html__( 'WDS Blocks', 'wdsblocks' ),
			],
		]
	);
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\register_block_category', 10, 2 );

/**
 * Render the Product List block.
 *
 * @param array  $attributes Block instance attributes.
 * @param string $content    Block content, empty, as this is a dynamic block.
 * @return string Block HTML content.
 */
function render_sitemap_item_block( $attributes, $content ) {

	$post_type = '';
	$query_type = '';
	$output = '';
	$is_category_list = '';

	// set up the variables
	if ( ! empty( $attributes['contentType'] ) ) {
		$post_type = $attributes['contentType'];
	}

	// set up the arguments for WP_QUERY
	$wp_query_args = array(
		'post_type' => $post_type,
		'posts_per_page' => -1,
	);

	if ( ! empty( $attributes['order'] ) ) {
		$wp_query_args['order'] = $attributes['order'];
	}

	if ( ! empty( $attributes['orderby'] ) ) {
		$wp_query_args['orderby'] = $attributes['orderby'];
	}

	if ( ! empty( $attributes['categoriesFilter'] ) ) {
		$wp_query_args['category_name'] = $attributes['categoriesFilter'];
	}

	if ( ! empty( $attributes['tagsFilter'] ) ) {
		$wp_query_args['tag'] = $attributes['tagsFilter'];
	}

	if ( ! empty( $attributes['authorFilter'] ) ) {
		$wp_query_args['author_name'] = $attributes['authorFilter'];
	}

	if ( ! empty( $attributes['contentType'] ) ) {
		$category_list = wp_list_categories( array(
			'echo'     => 0,
			'taxonomy' => $attributes['contentType'],
			'order'    => $attributes['order'],
			'orderby'  => $attributes['orderby'],
			'title_li' => '',
		) );
	}

	// The Query
	$the_query = new \WP_Query( $wp_query_args );

	if ( ! empty( $attributes['title'] ) ) {
		$output .= '<h3>' . $attributes['title'] . '</h3>';
	}

	// The Loop
	if ( $the_query->have_posts() ) :
		$output .= '<ul>';
		while ( $the_query->have_posts() ) : $the_query->the_post();
			$output .= '<li><a href="' . get_the_permalink() . '">' . get_the_title() . '</a></li>';
		endwhile;
		$output .= '</ul>';

		wp_reset_postdata();

	elseif ( ! empty( $category_list ) ) :
		$output .= $category_list;
	else :
		$output .= '<p>Sorry, nothing found.</p>';
	endif;

	return $output;
}
