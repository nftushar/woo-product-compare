/* eslint-disable no-undef */
import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, TextControl, __experimentalBoxControl as BoxControl, ToggleControl, SelectControl } from "@wordpress/components";

import { BtnGroup, MultiSelectControl } from "../../Components";
import { useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

const wcpcAlignments = [
	{ label: __('left', 'wcpc'), value: 'left', icon: 'editor-alignleft' },
	{ label: __('center', 'wcpc'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('right', 'wcpc'), value: 'right', icon: 'editor-alignright' }
];

// const options = [
// 	{ label: 'Option 1', value: 'option1' },
// 	{ label: 'Option 2', value: 'option2' },
// 	{ label: 'Option 3', value: 'option3' },
// ];


const Settings = ({ attributes, setAttributes, products }) => {
	const { productIds, padding, alignment, btnType, fbUrl, layout, clrScheme, size, shareOffOn, showFaces } = attributes;
	const [ids, setIds] = useState([]);

	useEffect(() => {
		if (products?.length) {
			setIds(products.map(p => ({ label: p.title, value: p.id })))
		}
	}, [products])
 

	return (
		<InspectorControls>
			<TabPanel
				className="bPlTabPanel"
				tabs={[
					{ name: "general", title: __("General") },
					{ name: "style", title: __("Style") }
				]}>

				{(tab) => <>
					{tab.name === "general" && <PanelBody
						className="bPlPanelBody"
						title={__("FaceBook Button", "wcpc")}>

						{ids?.length ? <MultiSelectControl value={productIds} onChange={val => setAttributes({ productIds: val })} options={ids} /> : <Spinner />}

						<TextControl
							className="mt20"
							label={__("FaceBook", "wcpc")}
							value={fbUrl}
							onChange={(val) => setAttributes({ fbUrl: val })}
						/>
						<ToggleControl
							className="mt20"
							label={__("Share Button", "wcpc")}
							value={shareOffOn}
							checked={shareOffOn}
							onChange={(val) => setAttributes({ shareOffOn: val })}
						/>
						<ToggleControl
							className="mt20"
							label={__("Show Faces", "wcpc")}
							value={showFaces}
							checked={showFaces}
							onChange={(val) => setAttributes({ showFaces: val })}
						/>
						<SelectControl
							className="mt20"
							label="Layout"
							value={layout}
							options={[
								{ label: 'Button', value: 'button' },
								{ label: 'Standard', value: 'standard' },
								{ label: 'Box Count', value: 'box_count' },
								{ label: 'Button Count', value: 'button_count' },
							]}
							onChange={(val) => setAttributes({ layout: val })}
							isIcon={true} />
						<SelectControl
							className="mt20"
							label="Button Type"
							value={btnType}
							options={[
								{ label: "Like", value: "like" },
								{ label: "Recommend", value: "recommend" },
							]}
							onChange={(val) => setAttributes({ btnType: val })}
							isIcon={true} />
						<SelectControl
							className="mt20"
							label="Color Scheme"
							value={clrScheme}
							options={[
								{ label: 'Dark', value: 'dark' },
								{ label: 'Light', value: 'light' },
							]}
							onChange={(val) => setAttributes({ clrScheme: val })}
							isIcon={true} />
						<SelectControl
							className="mt20"
							label="Size"
							value={size}
							options={[
								{ label: 'Large', value: 'large' },
								{ label: 'Small', value: 'small' },
							]}
							onChange={(val) => setAttributes({ size: val })}
							isIcon={true} />
					</PanelBody>}


					{tab.name === "style" && <>
						<PanelBody
							className="bPlPanelBody"
							title={__("Button Control", "wcpc")}>

							<BtnGroup
								className="mb20"
								label={__("Alignment", "wcpc")}
								value={alignment}
								onChange={val => setAttributes({ alignment: val })}
								options={wcpcAlignments} isIcon={true} />
							<BoxControl
								label={__("Padding", "wcpc")}
								values={padding}
								resetValues={{
									"top": "0px",
									"right": "0px",
									"bottom": "0px",
									"left": "0px"
								}}
								onChange={(value) => setAttributes({ padding: value })}
							/>
						</PanelBody>
					</>}
				</>}
			</TabPanel>
		</InspectorControls>
	);
};

export default Settings;