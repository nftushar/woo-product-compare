import React from 'react';
import { createRoot } from 'react-dom';
import "./style.scss";
import Style from "./Style";
import ProductCompare from './components/ProductCompare';

document.addEventListener("DOMContentLoaded", () => {
    const wcpcEls = document.querySelectorAll(".wp-block-p-compare");
    wcpcEls.forEach((wcpcEl) => {
        const attributes = JSON.parse(wcpcEl.dataset.attributes);
        const { cId } = attributes;

        createRoot(wcpcEl).render(
            <>  
                <div id={`bBlocks-p-compare-${cId}`} >
                    <Style attributes={attributes} clientId={cId} />
                    <ProductCompare attributes={attributes} clientId={cId} />
                </div>
            </>
        );

        wcpcEl?.removeAttribute("data-attributes");
    });
}); 


