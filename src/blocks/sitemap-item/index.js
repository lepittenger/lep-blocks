import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { PREFIX } from '../../utils/config';
import './frontend/style.scss';

const BLOCKNAME = 'sitemap-item';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( `wdsblocks/${ BLOCKNAME }`, {
	title: __( 'Sitemap Block', 'wdsblocks' ),
	description: __(
		'An expand and collaspe editible content section.',
		'wdsblocks'
	),
	category: 'wds-blocks',
	keywords: [ __( 'sitemap', 'wdsblocks' ) ],
	supports: {
		html: false,
		anchor: true,
	},
	parent: [ 'wdsblocks/sitemap-group' ],
	attributes: {
		title: {
			type: 'string',
		},
		contentType: {
			type: 'string',
			default: 'post',
		},
		order: {
			type: 'string',
			default: 'DESC',
		},
	},
	edit,
	save,
} );
