import React from 'react';

function ProductCompare({ attributes }) {





    return (<>
        <div className="eael-wcpc-wrapper woocommerce">
            <table className="eael-wcpc-table table-responsive">
                <tbody>
                    <tr className="title">
                        <th className="thead first-th">
                            <div className="wcpc-table-header">
                                <span className="field-name">Title</span>
                            </div>
                        </th>
                        <td className="odd col_0 product_168">
                            <span>Hoodie</span>
                        </td>
                        <td className="even col_1 product_158">
                            <span>T-Shirt Grouped</span>
                        </td>
                        <td className="odd col_2 product_163">
                            <span>V-Neck T-Shirt</span>
                        </td>
                    </tr>

                    <tr className="description">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">Description</span>
                            </div>
                        </th>
                        <td className="odd col_0 product_168">
                            <span>
                                <p>This is a variable product.</p>
                            </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span>
                                <p>This is a simple product.</p>
                            </span>
                        </td>
                        <td className="odd col_2 product_163">
                            <span>
                                <p>This is a variable product.</p>
                            </span>
                        </td>
                    </tr>

                    <tr className="image">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <h1 className="wcpc-title">Compare Products</h1>
                            </div>
                        </th>
                        <td className="odd col_0 product_168">
                            <span>
                                <span className="img-inner">
                                    <img width="300" height="300"
                                        src="http://localhost/wordpress/wp-content/uploads/2023/12/hoodie-2-300x300.jpg"
                                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                        alt
                                        decoding="async" />
                                </span>
                            </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span>
                                <span className="img-inner">
                                    <img width="300" height="300"
                                        src="http://localhost/wordpress/wp-content/uploads/2023/12/tshirt-2-300x300.jpg"
                                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                        alt decoding="async" />
                                </span>
                            </span>
                        </td>
                        <td className="odd col_2 product_163">
                            <span>
                                <span className="img-inner">
                                    <img width="300" height="300"
                                        src="http://localhost/wordpress/wp-content/uploads/2023/12/vneck-tee-2-300x300.jpg"
                                        className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                                        alt decoding="async" />
                                </span>
                            </span>
                        </td>
                    </tr>

                    <tr className="price">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">Price</span>
                            </div>
                        </th>
                        <td className="even col_1 product_158">
                            <span>
                                <span className="woocommerce-Price-amount amount"><bdi>11.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                                <span className="woocommerce-Price-amount amount"><bdi>18.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                            </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span>
                                <span className="woocommerce-Price-amount amount"><bdi>11.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                                <span className="woocommerce-Price-amount amount"><bdi>18.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                            </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span>
                                <span className="woocommerce-Price-amount amount"><bdi>11.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                                <span className="woocommerce-Price-amount amount"><bdi>18.00<span
                                    className="woocommerce-Price-currencySymbol">৳&nbsp;</span></bdi></span>
                            </span>
                        </td>
                    </tr>
                    <tr className="sku">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">SKU</span>
                            </div>
                        </th>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                woo-hoodie </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                woo-hoodie </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                woo-hoodie </span>
                        </td>
                    </tr>

                    <tr className="availability">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">Availability</span>
                            </div>
                        </th>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> In
                                stock </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> In
                                stock </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> In
                                stock </span>
                        </td>
                    </tr>

                    <tr className="color">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">Color</span>
                            </div>
                        </th>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> Blue,
                                Green, Red </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> Blue,
                                Green, Red </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount"> Blue,
                                Green, Red </span>
                        </td>
                    </tr>

                    <tr className="size">
                        <th className="thead">
                            <div className="wcpc-table-header">
                                <span className="field-name">Size</span>
                            </div>
                        </th>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                Medium </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                Medium </span>
                        </td>
                        <td className="even col_1 product_158">
                            <span className="woocommerce-Price-amount amount">
                                Medium </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </>);

}
export default ProductCompare;




