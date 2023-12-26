import React from 'react';

function ProductCompare({ products }) {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return <p>No product data available.</p>;
    }

    return (
        <>
            <div className="eael-wcpc-wrapper woocommerce">
                <table className="eael-wcpc-table table-responsive">
                    <tbody>
                        {products.map((product, index) => (
                            <React.Fragment key={index}>
                                <tr className="title">
                                    <th className="thead first-th">
                                        <div className="wcpc-table-header">
                                            <span className="field-name">Title</span>
                                        </div>
                                    </th>
                                    <td className={`odd col_${index} product_${product.id}`}>
                                        <span>{product.title}</span>
                                    </td>
                                </tr>

                                <tr className="description">
                                    <th className="thead">
                                        <div className="wcpc-table-header">
                                            <span className="field-name">Description</span>
                                        </div>
                                    </th>
                                    <td className={`odd col_${index} product_${product.id}`}>
                                        <span>
                                            <p>{product.description}</p>
                                        </span>
                                    </td>
                                </tr>

                                <tr className="image">
                                    <th className="thead">
                                        <div className="wcpc-table-header">
                                            <h1 className="wcpc-title">Compare Products</h1>
                                        </div>
                                    </th>
                                    <td className={`odd col_${index} product_${product.id}`}>
                                        <span className="img-inner">
                                            {product.image && product.image !== 'Default Image' ? (
                                                <img
                                                    width="300"
                                                    height="300"
                                                    src={product.image}
                                                    className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                                    alt={`Product Image: ${product.title}`}
                                                    decoding="async"
                                                />
                                            ) : (
                                                'Image not available'
                                            )}
                                        </span>
                                    </td>
                                </tr>

                                <tr className="price">
                                    <th className="thead">
                                        <div className="wcpc-table-header">
                                            <span className="field-name">Price</span>
                                        </div>
                                    </th>
                                    <td className={`even col_${index} product_${product.id}`}>
                                        <span className="woocommerce-Price-amount amount">
                                            <bdi>{product.price}</bdi>
                                            <span className="woocommerce-Price-currencySymbol">৳&nbsp;</span>
                                        </span>
                                    </td>
                                </tr>

                                {/* Additional Features */}
                                {Object.entries(product).map(([key, value]) => (
                                    key !== 'id' && key !== 'title' && key !== 'description' && key !== 'image' && key !== 'price' && (
                                        <tr key={key} className={key}>
                                            <th className="thead">
                                                <div className="wcpc-table-header">
                                                    <span className="field-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                                </div>
                                            </th>
                                            <td className={`odd col_${index} product_${product.id}`}>
                                                <span>{value || 'N/A'}</span>
                                            </td>
                                        </tr>
                                    )
                                ))}

                                <tr className="add-to-cart">
                                    <th className="thead">
                                        <div className="wcpc-table-header">
                                            <span className="field-name">Add to Cart</span>
                                        </div>
                                    </th>
                                    <td className={`even col_${index} product_${product.id}`}>
                                        <button>Add to Cart</button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ProductCompare;
