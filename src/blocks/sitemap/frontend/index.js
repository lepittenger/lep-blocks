import { PREFIX } from '../../../utils/config';

const sitemapClass = `wp-block-${ PREFIX }-sitemap`;

/**
 * Handle functionality related to the sitemap block block.
 *
 * @author WebDevStudios
 * @since  2.0.0
 */
const wdsBlocksSitemap = {
	/**
	 * Initial sitemap block setup.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 * @return {?boolean} Return false if no the sitemap block found.
	 */
	init: () => {
		// Target sitemap block elements.
		const sitemap = document.querySelectorAll( `.${ sitemapClass }` );

		// Exit if no the sitemap block found.
		if ( ! sitemap.length ) {
			return false;
		}
	},
};

export default wdsBlocksSitemap;
