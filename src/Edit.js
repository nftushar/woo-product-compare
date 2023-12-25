// Edit.js
import React, { useEffect } from 'react';
import { withSelect } from '@wordpress/data';
import Settings from './Settings';
import ProductCompare from './components/ProductCompare';
import Style from './Style';

const Edit = ({ className = '', attributes, setAttributes, clientId = '', isSelected, products }) => {
  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId]);

  // Check if products is an array and has at least one item
  const firstProduct = products && products.length > 0 ? products[0] : null;

  // Access properties on the first product (if available)
  const imageUrl = firstProduct ? firstProduct.image : 'Default Image';

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} products={products} />

      <div className={`bBlocks-p-compare ${className}`} id={`bBlocks-p-compare-${clientId}`} data-attributes={JSON.stringify(attributes)}>
        {!isSelected && <div className="mouse"></div>}
        <Style attributes={attributes} clientId={clientId} />

        <ProductCompare products={products} imageUrl={imageUrl} />
      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getEntityRecords } = select('core');

  const products = getEntityRecords('postType', 'product', { per_page: -1 })?.map((product) => ({
    id: product.id,
    title: product.title.rendered || 'Default Title',
    permalink: product.link,
    description: product.content.rendered || 'Default Description',
    image: product.featured_media_src_url || 'Default Image',
    price: product.price_html || 'Default Price',
    sku: product.sku || 'Default SKU',
  })) || [];

  return {
    products,
  };
})(Edit);
