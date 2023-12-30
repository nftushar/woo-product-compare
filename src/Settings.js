/* eslint-disable no-undef */
import { useState } from 'react';
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, __experimentalBoxControl as BoxControl } from "@wordpress/components";
import { BtnGroup, MultiSelectControl, Background, BorderControl, Typography, ColorsControl } from "../../Components";
import { useEffect } from '@wordpress/element';
import { Spinner } from '@wordpress/components';

const wcpcAlignments = [
	{ label: __('left', 'wcpc'), value: 'left', icon: 'editor-alignleft' },
	{ label: __('center', 'wcpc'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('right', 'wcpc'), value: 'right', icon: 'editor-alignright' }
];


const Settings = ({ attributes, setAttributes, products }) => {
	const { background, productIds, padding, alignment, border, btnStyle } = attributes;
	const { typography, colors, hvrColors, border: btnBorder } = btnStyle;

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
								title={__("Product Controls", "wcpc")}
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
								<PanelBody title={__("Product Styles", "wcpc")} className="mt20 bPlPanelBody" initialOpen={false}>
									<Background
										label={__("Background Color", "wcpc")}
										value={background}
										onChange={(val) => setAttributes({ background: val })}
										defaults={{ color: "#000" }} />

									<BorderControl
										label={__("Border:", "wcpc")}
										value={border}
										onChange={(val) => setAttributes({ border: val })}
										defaults={{ radius: "5px" }}
									/>
								</PanelBody>
								<PanelBody title={__("Button Styles", "wcpc")} className="mt20 bPlPanelBody" initialOpen={false}>
									<ColorsControl
										label={__("Color:", "wcpc")}
										value={colors}
										onChange={val => setAttributes({ btnStyle: { ...btnStyle, colors: val, bg: colors } })}
										defaults={{ color: '#222', bg: '#111' }} />

									<ColorsControl
										label={__("Hover Color:", "wcpc")}
										value={hvrColors}
										onChange={val => setAttributes({ btnStyle: { ...btnStyle, hvrColors: val, bg: hvrColors } })}
										defaults={{ color: '#333', bg: '#0000' }} />
									<BorderControl
										label={__("Button Border", "wcpc")}
										value={btnBorder}
										onChange={(val) => setAttributes({ btnStyle: { ...btnStyle, border: val } })}
										defaults={{ radius: "5px" }}
									/>
									<Typography
										label={__("Typography", "wcpc")}
										value={typography}
										onChange={(val) => setAttributes({ btnStyle: { ...btnStyle, typography: val } })}
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