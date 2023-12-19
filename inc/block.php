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

    private function outputProductCompare($atts)
    {
        $atts = shortcode_atts(
            array(
                'tag'   => 'hoodies',
                'count' => 3,
            ),
            $atts
        );

        $tag    = explode(',', sanitize_text_field($atts['tag']));
        $count  = sanitize_text_field($atts['count']);

        $query = array(
            'post_type'      => 'product',
            'post_status'    => 'publish',
            'posts_per_page' => $count,
            'tax_query'      => array(
                array(
                    'taxonomy' => 'product_cat',
                    'field'    => 'slug',
                    'terms'    => $tag,
                )
            ),
        );

        $products = new WP_Query($query);

        $productsNew = wc_get_products([
            'limit' => -1,
            'status' => 'publish',
            'include' => array(250, 178, 168)
        ]);



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

        foreach ($productsNew as $index => $product) {
            // $tableData[ $index + 1 ] = [
            //     $product->get_title(),
            //     'placeholder description',
            //     'placeholder image',
            //     'placeholder price',
            //     'placeholder sku',
            //     'placeholder availability',
            //     'placeholder color',
            //     'placeholder size',
            // ];
            // echo"1"; 
            $tableData['title'][$index]        = $product->get_title();
            $tableData['permalink'][$index]    = "permalink $index";
            $tableData['description'][$index]  = $product->get_description();
            $tableData['image'][$index]         = wp_get_attachment_url($product->get_image_id());
            $tableData['price'][$index]        = $product->get_price_html();
            $tableData['sku'][$index]          = $product->get_sku();
            $tableData['availability'][$index] = $product->is_in_stock() ? 'In stock' : 'Out of stock';
            $tableData['color'][$index]        = $product->get_attribute('color');
            $tableData['size'][$index]         = $product->get_attribute('size');

            // echo "<pre>";
            // print_r($product->get_title());
            // echo "</pre>";
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

                    while ($products->have_posts()) :
                        $products->the_post();
                        $this->outputProductDetails();
                    endwhile;
                    wp_reset_postdata();
                    ?>
                </tbody>
            </table>
        </div>

    <?php
        wp_reset_postdata();
    }

    private function outputProductDetails()
    {
        $title        = get_the_title();
        $permalink    = get_the_permalink();
        $description  = get_the_content();
        $product      = wc_get_product(get_the_id());
        $image        = $product->get_image();
        $price        = $product->get_price_html();
        $sku          = $product->get_sku();
        $availability = $product->is_in_stock() ? 'In stock' : 'Out of stock';
        $colors       = $product->get_attribute('color');
        $sizes        = $product->get_attribute('size');
    ?>

        <!-- <tr class="title">
            <th class="thead first-th">
                <div class="wcpc-table-header">
                    <span class="field-name">Title x</span>
                </div>
            </th>
            <td class="odd col_0 product_168">
                <span><a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a></span>
            </td>
        </tr>
        <tr class="description">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">Description</span>
                </div>
            </th>
            <td class="odd col_0 product_168">
                <span>
                    <p><?php echo esc_html($description); ?></p>
                </span>
            </td>
        </tr>
        <tr class="image">
            <th class="thead">
                <div class="wcpc-table-header">
                    <h1 class="wcpc-title">Compare Products</h1>
                </div>
            </th>
            <td class="odd col_0 product_168">
                <span>
                    <span class="img-inner"><?php echo $image; ?></span>
                </span>
            </td>
        </tr>
        <tr class="price">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">Price</span>
                </div>
            </th>
            <td class="even col_1 product_158">
                <span><?php echo $price; ?></span>
            </td>
        </tr>
        <tr class="sku">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">SKU</span>
                </div>
            </th>
            <td class="even col_1 product_158">
                <span><?php echo esc_html($sku); ?></span>
            </td>
        </tr>
        <tr class="availability">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">Availability</span>
                </div>
            </th>
            <td class="even col_1 product_158">
                <span><?php echo esc_html($availability); ?></span>
            </td>
        </tr>
        <tr class="color">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">Color</span>
                </div>
            </th>
            <td class="even col_1 product_158">
                <span><?php echo esc_html($colors); ?></span>
            </td>
        </tr>
        <tr class="size">
            <th class="thead">
                <div class="wcpc-table-header">
                    <span class="field-name">Size</span>
                </div>
            </th>
            <td class="even col_1 product_158">
                <span><?php echo esc_html($sizes); ?></span>
            </td>
        </tr> -->

<?php
    }
}

new BBlockProductCompare();
?>