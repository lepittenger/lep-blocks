import classnames from 'classnames';
import BackgroundOptions from '../../components/background-options';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
} = wp.blocks;

// Register block.
export default registerBlockType(
	'wds/editable-content-example-block-with-options',
	{
		title: __( 'Example Block with Options' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Options' ),
			__( 'Editable' ),
			__( 'Multiline' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block',
			},
			backgroundType: {
				type: 'string',
			},
		},
		edit: props => {
			// Change the Left message value as we type.
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			const onChangeBackgroundType = value => {
				props.setAttributes( { backgroundType: value } );
			};

			return [
				!! props.focus && (
					<BackgroundOptions
						{ ...{ onChangeBackgroundType, ...props } }
					/>
				),
				<section className={ props.className }>

					<header className="content-block-header">
						<h2>{ __( 'Example Block with Options' ) }</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						style={ { textAlign: props.attributes.alignmentLeft } }
						placeholder={ __( 'Enter your content here for the left Example Block with Options' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						focus={ props.focus }
						onFocus={ props.setFocus }
					/>
				</section>,
			];
		},
		save: props => {
			return (
				<section
					className={ classnames(
						'content-block grid-container two-column',
						{ 'image-as-background': 'image' === props.attributes.backgroundType },
						{ 'color-as-background': 'color' === props.attributes.backgroundType },
					) }
				>

					<header className="content-block-header">
						<h2>{ __( 'Example Block with Options' ) }</h2>
					</header>

					<div
						className="content-block-content content-block"
						style={ { backgroundType: props.attributes.backgroundType } }
					>
						{ props.attributes.message }
					</div>
				</section>
			);
		},
	},
);
