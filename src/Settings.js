/* eslint-disable no-undef */
import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, __experimentalBoxControl as BoxControl, SelectControl } from "@wordpress/components";
// import { produce } from 'immer';

import { BtnGroup, MultiSelectControl, Background, BorderControl, Typography } from "../../Components";
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
	const { size, background, productIds, padding, alignment, border, btnStyle } = attributes;
	const { typography } = btnStyle;

	const [ids, setIds] = useState([]);


	// console.log(typography);

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
				]}
			>
				{(tab) => (
					<>
						{tab.name === "general" && (
							<PanelBody
								className="bPlPanelBody"
								title={__("Product Compare", "wcpc")} >

								<Typography
									label={__("Typography", "wcpc")}
									value={typography}
									onChange={(val) => setAttributes({ btnStyle: { typography: val } })}
								/>

								{ids?.length ? (
									<MultiSelectControl
										label={__("MultiSelect Control", "wcpc")}
										value={productIds}
										onChange={(val) => setAttributes({ productIds: val })}
										options={ids} />
								) : (
									<Spinner />
								)}


							</PanelBody>
						)}

						{tab.name === "style" && (
							<PanelBody
								className="bPlPanelBody"
								title={__("Button Control", "wcpc")}
							>
								<BtnGroup
									className="mb20"
									label={__("Alignment", "wcpc")}
									value={alignment}
									onChange={(val) => setAttributes({ alignment: val })}
									options={wcpcAlignments}
									isIcon={true}
								/>

								<BoxControl
									label={__("Padding", "wcpc")}
									values={padding}
									resetValues={{
										top: "0px",
										right: "0px",
										bottom: "0px",
										left: "0px",
									}}
									onChange={(value) => setAttributes({ padding: value })}
								/>
								<PanelBody title={__("Product Compare", "wcpc")} className="mt20 bPlPanelBody">
									<Background
										label={__("Background Color", "text-domain")}
										value={background}
										onChange={(val) => setAttributes({ background: val })}
										defaults={{ color: "#000" }} />

									<BorderControl
										label={__("Border:", "text-domain")}
										value={border}
										onChange={(val) => setAttributes({ border: val })}
										defaults={{ radius: "5px" }}
									/>

									<SelectControl
										className="mt20"
										label="Size"
										value={size}
										options={[
											{ label: "Large", value: "large" },
											{ label: "Small", value: "small" },
										]}
										onChange={(val) => setAttributes({ size: val })}
										isIcon={true}
									/>
								</PanelBody>
							</PanelBody>
						)}
					</>
				)}
			</TabPanel>
		</InspectorControls>
	);

};

export default Settings;