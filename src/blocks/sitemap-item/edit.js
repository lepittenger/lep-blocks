import ServerSideRender from '@wordpress/server-side-render';
import { RichText } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
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
export default function Edit( props, attributes, isSelected, contentTypes ) {
	const {
		attributes: { title },
		setAttributes,
		className,
		clientId,
	} = props;

	const posts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'post' );
	}, [] );

	const getPostTypeName = () => {
		const [ contentType ] = contentTypes.filter( ( contentType ) =>
			contentType.slug.includes( attributes.contentType )
		);
		return contentType.name;
	};
	return (
		<div className={ className }>
			<InputLabel
				label={ __( 'Section Title ', 'wdsblocks' ) }
				req="true"
			/>
			<RichText
				tagName="h3"
				role="button"
				tabIndex="0"
				className={ `${ className }__title` }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				value={ title ? title : '' }
				placeholder={ __( 'Section Title', 'wdsblocks' ) }
				aria-expanded="false"
				aria-controls={ `${ PREFIX }-${ clientId }` }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>
			<InputLabel
				label={ __( 'Section Content ', 'wdsblocks' ) }
				req="true"
			/>
			<div
				className={ `${ className }__content` }
				aria-hidden="true"
				tabIndex="-1"
				id={ `${ PREFIX }-${ clientId }` }
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
							<SelectControl
								className="lep-sitemap__content_type"
								label={ __( 'Data Type', 'wdsblocks' ) }
								value={ attributes.contentType }
								onChange={ ( contentType ) =>
									setAttributes( {
										contentType,
									} )
								}
								options={ [
									{
										value: '',
										label: __(
											'Select a data type',
											'wdsblocks'
										),
									},
								].concat(
									contentTypes.map( ( contentType ) => {
										return {
											label: contentType.name,
											value: contentType.slug,
										};
									} )
								)}
							/>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
}
