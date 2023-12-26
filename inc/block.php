<?php
class BBlockProductCompare
{
    public function __construct()
    {
        add_action('init', [$this, 'onInit']);
    }

    public function onInit()
    {
        wp_register_style('bBlocks-p-compare-style', plugins_url('dist/style.css', __DIR__), [], B_BLOCKS_VERSION);
        wp_register_style('bBlocks-p-compare-editor-style', plugins_url('dist/editor.css', __DIR__), ['bBlocks-p-compare-style'], B_BLOCKS_VERSION);

        register_block_type(__DIR__, [
            'editor_style'      => 'bBlocks-p-compare-editor-style',
            'render_callback'   => [$this, 'render']
        ]);

        wp_set_script_translations('bBlocks-p-compare-script', 'text-path', plugin_dir_path(__DIR__) . 'languages');
    }

    public function render($attributes)
    {
        extract($attributes);

        $productIds = $attributes['productIds'];


        wp_enqueue_style('bBlocks-p-compare-style');
        wp_enqueue_script('bBlocks-p-compare-script', plugins_url('dist/script.js', __DIR__), ['react', 'react-dom'], B_BLOCKS_VERSION, true);

        $className = $className ?? '';
        $blockClassName = esc_attr("bBlocks-p-compare $className");

        ob_start(); ?>

        <div class='<?php echo $blockClassName; ?>' id='bBlocks-p-compare-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo wp_json_encode($attributes); ?>'>
            <?php
            if (class_exists('WooCommerce')) {
                $this->outputProductCompare($productIds);
            }
            ?>
        </div>

    <?php
        return ob_get_clean();
    }

    private function outputProductCompare($productIds)
    {
        
        $products = wc_get_products([
            'limit'   => -1,
            'status'  => 'publish',
            'include' => $productIds,
        ]);

        $tableData = [
            'Title'        => [],
            'Permalink'    => [],
            'Description'  => [],
            'Image'        => [],
            'Price'        => [],
            'Add to cart'  => [],
            'SKU'          => [],
            'Availability' => [],
            'Weight'       => [],
            'Dimension'    => [],
            'Color'        => [],
            'Size'         => []
        ];

        foreach ($products as $index => $product) {
            $tableData['Title'][$index]        = $product->get_title();
            $tableData['Permalink'][$index]    = get_permalink($product->get_id());
            $tableData['Description'][$index]  = $product->get_description();
            $tableData['Image'][$index]        = wp_get_attachment_url($product->get_image_id());
            $tableData['Price'][$index]        = $product->get_price_html();
            $tableData['Add to cart'][$index]  = '<a href="' . esc_url(add_query_arg('add-to-cart', $product->get_id(), $product->get_permalink())) . '" class="button add_to_cart_button">Add to Cart</a>';
            $tableData['SKU'][$index]          = $product->get_sku();
            $tableData['Availability'][$index] = $product->is_in_stock() ? 'In stock' : 'Out of stock';
            $tableData['Weight'][$index]       = $product->get_weight();
            // $tableData['Dimension'][$index]    = $product->get_dimensions();
            $tableData['Dimension'][$index] = wc_format_dimensions($product->get_dimensions(false));
            $tableData['Color'][$index]        = $product->get_attribute('Color');
            $tableData['Size'][$index]         = $product->get_attribute('Size');
        }
    ?>

        <div class="eael-wcpc-wrapper woocommerce">
            <table class="eael-wcpc-table table-responsive">
                <tbody>
                    <?php
                    foreach ($tableData as $key => $data) {
                        $tdEl = "";

                        foreach ($data as $i => $d) {
                            $link = $tableData['Permalink'][$i];
                            $title = $tableData['Title'][$i];

                            $el = "";
                            if ('Title' === $key) {
                                $el = "<td><a href='$link'>$d</a></td>";
                            } elseif ('Image' === $key) {
                                $el = "<td><img src='$d' alt='$title' /></td>";
                            } else {
                                $el = "<td>$d</td>";
                            }

                            $tdEl .= $el;
                        }

                        if ('Permalink' !== $key) {
                            echo "<tr>
                                <th>$key</th>
                                $tdEl
                            </tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
<?php
    }
}

new BBlockProductCompare();
?>