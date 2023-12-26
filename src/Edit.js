 import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { Disabled, Spinner } from '@wordpress/components';
const { serverSideRender: ServerSideRender } = wp;
import "./style.scss";

import Settings from './Settings';
// import Style from './Style';

const Edit = ({ name, className, attributes, setAttributes, clientId, products }) => {


  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId]);

  return (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} products={products} />
      <div className={`bBlocks-p-compare ${className}`} id={`bBlocks-p-compare-${clientId}`} data-attributes={JSON.stringify(attributes)}>
        {/* <Style attributes={attributes} clientId={clientId} /> */}

        <Disabled>
          <ServerSideRender block={name} attributes={attributes} LoadingResponsePlaceholder={Loading} />
        </Disabled>
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

const Loading = ({ children, showLoader }) => <div className={`wrpLoader ${showLoader ? 'showLoader' : ''}`}>
  {showLoader && <h3 className='wrpLoading'><Spinner /> {__('Loading...', 'recent-products')}</h3>}

  {children}
</div>
