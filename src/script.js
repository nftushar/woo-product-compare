import React from 'react';
import { createRoot } from 'react-dom';
import "./style.scss";
import Style from "./Style";
import ProductCompare from './components/ProductCompare';

document.addEventListener("DOMContentLoaded", () => {
    const mapEls = document.querySelectorAll(".wp-block-fb-button");
    mapEls.forEach((mapEl) => {
        const attributes = JSON.parse(mapEl.dataset.attributes);
        const { cId } = attributes;

        createRoot(mapEl).render(
            <> 
                <div id={`bBlocks-fb-button-${cId}`} >
                    <Style attributes={attributes} clientId={cId} />
                    <ProductCompare attributes={attributes} clientId={cId} />
                </div>
            </>
        );

        mapEl?.removeAttribute("data-attributes");
    });
}); 