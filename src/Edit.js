import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
const { serverSideRender: ServerSideRender } = wp;
import "./style.scss";

import Settings from './Settings';

const Edit = ({ clientId, name, className, attributes, setAttributes, products }) => {
  const { productIds } = attributes;


  // console.log(productIds.length);

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId]);

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} products={products} />
      <div className={className} id={`bBlocksProductCompare-${clientId}`}>

        {/* <Disabled> */}
        {productIds.length ? (
          <ServerSideRender block={name} attributes={attributes} LoadingResponsePlaceholder={Loading} />
        ) : (
          <h1>Select Product</h1>
        )}
        {/* </Disabled> */}

      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getEntityRecords } = select('core');

  const products = getEntityRecords('postType', 'product', { per_page: -1 })?.map((product) => ({
    id: product.id,
    title: product.title.rendered
  })) || [];

  return { products };
})(Edit);

const Loading = ({ children, showLoader }) => <div className={`wcpcLoader ${showLoader ? 'showLoader' : ''}`}>
  {showLoader && <h3 className='wcpcLoading'><Spinner /> {__('Loading...', 'recent-products')}</h3>}

  {children}
</div>
