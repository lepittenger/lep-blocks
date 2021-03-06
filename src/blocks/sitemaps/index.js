import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/config';
import './frontend/style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `${ PREFIX }/sitemaps`, {
	title: __( 'Sitemaps Block', 'wdsblocks' ),
	description: __(
		'A dynamic sitemap block.',
		'wdsblocks'
	),
	category: 'wds-blocks',
	keywords: [ __( 'sitemap block, richtext', 'wdsblocks' ) ],
	attributes: {
		showPreview: {
			type: 'boolean',
			default: true,
		},
		align: {
			type: 'string',
			default: 'full',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		contentStyle: {
			type: 'object',
			default: {
				color: '#000000',
				textAlign: 'left',
			},
		},
		backgroundStyle: {
			type: 'object',
			default: {
				backgroundColor: 'transparent',
			},
		},
	},
	supports: {
		align: [ 'full', 'wide', 'left', 'center', 'right' ],
		anchor: true,
		html: false,
	},
	edit,
	save,
} );
