import { PREFIX } from '../../../utils/config';

const sitemapClass = `wp-block-${ PREFIX }-sitemaps`;

/**
 * Handle functionality related to the sitemaps block block.
 *
 * @author WebDevStudios
 * @since  2.0.0
 */
const wdsBlocksSitemap = {
	/**
	 * Initial sitemaps block setup.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 * @return {?boolean} Return false if no the sitemaps block found.
	 */
	init: () => {
		// Target sitemaps block elements.
		const sitemaps = document.querySelectorAll( `.${ sitemapClass }` );

		// Exit if no the sitemaps block found.
		if ( ! sitemaps.length ) {
			return false;
		}
	},
};

export default wdsBlocksSitemap;
