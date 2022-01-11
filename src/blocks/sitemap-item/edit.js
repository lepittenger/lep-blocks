import ServerSideRender from '@wordpress/server-side-render';
import {
	RichText,
	InspectorControls
} from '@wordpress/block-editor';
import {
	SelectControl,
	PanelBody,
	PanelRow,
	ComboboxControl,
	BaseControl,
	ToggleControl,
 } from '@wordpress/components';
import {
	useSelect,
	withSelect
} from '@wordpress/data';
import { useState } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX } from '../../utils/config';
import InputLabel from '../sitemaps/components/InputLabel';
import './editor.scss';
import { Fragment } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * Editing interface in the admin
 *
 * @param {Object} [props]    Properties passed from the editor.
 * @param          attributes
 * @param          isSelected
 * @param          contentTypes
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { title },
		setAttributes,
		className,
		isSelected,
	} = props;

	// Post types
	let postTypes = [];
	postTypes = useSelect( ( select ) =>
		select( 'core' ).getPostTypes( {
			per_page: -1,
		} )
	);

	if ( postTypes ) {
		postTypes = postTypes.filter(
			( postType ) =>
				postType.viewable === true && postType.slug !== 'attachment'
		);
	}

	// Taxonomy types
	let taxonomyTypes = [];
	taxonomyTypes = useSelect( ( select ) =>
		select( 'core' ).getTaxonomies( {
			per_page: -1,
		} )
	);

	console.log( postTypes );
	console.log( taxonomyTypes );

	// if ( taxonomyTypes ) {
	// 	taxonomyTypes = taxonomyTypes.filter(
	// 		( taxonomyType ) =>
	// 			includes( taxonomyType.types, 'product' )
	// 	);
	// }

	// Category terms
	let categoryTerms = [];
	categoryTerms = useSelect( ( select ) =>
		select( 'core' ).getPostTypes( {
			per_page: -1,
		} )
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'wdsblocks' ) }>
					<PanelRow>
						<SelectControl
							label="Order"
							value={ props.attributes.order }
							options={ [
								{ label: 'None', value: '' },
								{ label: 'Ascending', value: 'ASC' },
								{ label: 'Descending', value: 'DESC' },
							] }
							onChange={ ( order ) =>
								setAttributes( {
									order,
								} )
							}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="Orderby"
							value={ props.attributes.orderby }
							options={ [
								{ label: 'ID', value: 'ID' },
								{ label: 'Author', value: 'author' },
								{ label: 'Title', value: 'title' },
								{ label: 'Name', value: 'name' },
								{ label: 'Date', value: 'post_date' },
								{
									label: 'Last modified date',
									value: 'modified',
								},
								{ label: 'Random', value: 'rand' },
								{
									label: 'Comment Count',
									value: 'comment_count',
								},
								{ label: 'Menu Order', value: 'menu_order' },
							] }
							onChange={ ( orderby ) =>
								setAttributes( {
									orderby,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
				{/* <PanelBody title={ __( 'Filters', 'wdsblocks' ) }>
					<PanelRow>
					<ComboboxControl
						label="Font Size"
						value={ fontSize }
						onChange={ setFontSize }
						options={ filteredOptions }
						onFilterValueChange={ ( inputValue ) =>
							setFilteredOptions(
								options.filter( ( option ) =>
									option.label
										.toLowerCase()
										.startsWith( inputValue.toLowerCase() )
								)
							)
						}
					/>
					</PanelRow>
				</PanelBody> */}
			</InspectorControls>
			<div className={ className }>
				<RichText
					tagName="h3"
					role="button"
					tabIndex="0"
					className={ `${ className }__title` }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					value={ title ? title : '' }
					placeholder={ __( 'Section Title', 'wdsblocks' ) }
					aria-expanded="false"
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
				<div
					className={ `${ className }__content` }
					aria-hidden="true"
					tabIndex="-1"
				>
					<div className={ `${ className }__content--inner` }>
						{ ! isSelected && (
							<ServerSideRender
								block="wdsblocks/sitemap-item"
								attributes={ props.attributes }
							/>
						) }
						{ isSelected && (
							<Fragment>
								{ postTypes && (
									<SelectControl
										className="lep-sitemap__content_type"
										label={ __( 'Post Type', 'wdsblocks' ) }
										value={ props.attributes.contentType }
										onChange={ ( contentType ) =>
											setAttributes( {
												contentType,
											} )
										}
										options={ [
											{
												value: '',
												label: __(
													'Select a post type',
													'wdsblocks'
												),
											},
										].concat(
											postTypes.map( ( postType ) => {
												return {
													label: postType.name,
													value: postType.slug,
												};
											} ),
											taxonomyTypes.map(
												( taxonomyType ) => {
													return {
														label:
															taxonomyType.name,
														value:
															taxonomyType.slug,
													};
												}
											)
										) }
									/>
								) }
							</Fragment>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
