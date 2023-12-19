<?php
class BBlockProductCompare
{
    public function __construct()
    {
        add_action('init', [$this, 'onInit']);
    }

    public function onInit()
    {
        wp_register_style('bBlocksPath-style', plugins_url('dist/style.css', __DIR__), [], B_BLOCKS_VERSION); // Style
        wp_register_style('bBlocksPath-editor-style', plugins_url('dist/editor.css', __DIR__), ['bBlocksPath-style'], B_BLOCKS_VERSION); // Backend Style

        register_block_type(__DIR__, [
            'editor_style'      => 'bBlocksPath-editor-style',
            'render_callback'   => [$this, 'render']
        ]); // Register Block

        wp_set_script_translations('bBlocksPath-script', 'text-path', plugin_dir_path(__DIR__) . 'languages'); // Translate
    }

    public function render($attributes)
    {
        extract($attributes);

        wp_enqueue_style('bBlocksPath-style');
        wp_enqueue_script('bBlocksPath-script', plugins_url('dist/script.js', __DIR__), ['react', 'react-dom'], B_BLOCKS_VERSION, true);

        $className = $className ?? '';
        $blockClassName = esc_attr("bBlocksPath $className");

        ob_start(); ?>

        <div class='<?php echo $blockClassName; ?>' id='bBlocksPath-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo wp_json_encode($attributes); ?>'>
            <?php




            // WooCommerce code start
            if (class_exists('WooCommerce')) {
                // Output the product Compare
                $this->outputProductCompare(['tag' => 'hoodies', 'count' => 20]);
            }
            ?>
        </div>

    <?php
        return ob_get_clean();
    }

    private function outputProductCompare(){
        $products = wc_get_products([
            'limit' => -1,
            'status' => 'publish',
            'include' => [59, 178, 168, 172]
        ]);

        echo "<pre>"; 
        print_r(count($products));
        echo"</pre>";

        // $tableData = [['Title', 'Permalink', 'Description', 'Image', 'Price', 'SKU', 'Availability', 'Color', 'Size']];
        $tableData = [
            'title' => [],
            'permalink' => [],
            'description' => [],
            'image' => [],
            'price' => [],
            'sku' => [],
            'availability' => [],
            'color' => [],
            'size' => []
        ];

        foreach ($products as $index => $product) {

            // $tableData['id'][$index]   =       $product->wc_get_product(get_the_id());
            $tableData['title'][$index]        = $product->get_title();
            $tableData['permalink'][$index]    = "permalink $index";
            $tableData['description'][$index]  = $product->get_description();
            $tableData['image'][$index]         = wp_get_attachment_url($product->get_image_id());
            $tableData['price'][$index]        = $product->get_price_html();
            $tableData['sku'][$index]          = $product->get_sku();
            $tableData['availability'][$index] = $product->is_in_stock() ? 'In stock' : 'Out of stock';
            $tableData['color'][$index]        = $product->get_attribute('color');
            $tableData['size'][$index]         = $product->get_attribute('size');
        }
    ?>

        <div class="eael-wcpc-wrapper woocommerce">
            <table class="eael-wcpc-table table-responsive">
                <tbody>
                    <?php
                    foreach ($tableData as $key => $data) {
                        $tdEl = "";
                        foreach ($data as $i => $d) {
                            $link = $tableData['permalink'][$i];
                            $title = $tableData['title'][$i];

                            $el = "";
                            if ('title' === $key) {
                                $el = "<td><a href='$link'>$d</a></td>";
                            } else if ('image' === $key) {
                                $el = "<td><img src='$d' alt='$title' /></td>";
                            } else {
                                $el = "<td>$d</td>";
                            }

                            $tdEl .= $el;
                        }

                        if ('permalink' !== $key) {
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