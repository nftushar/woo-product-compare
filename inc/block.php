<?php
class BBlockProductCompare
{

    public function __construct()
    {
        add_action('init', [$this, 'onInit']);
    }

    function getBackgroundCSS($bg, $isSolid = true, $isGradient = true, $isImage = true)
    {
        extract($bg);
        $type = $type ?? 'solid';
        $color = $color ?? '#000000b3';
        $gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';
        $image = $image ?? [];
        $position = $position ?? 'center center';
        $attachment = $attachment ?? 'initial';
        $repeat = $repeat ?? 'no-repeat';
        $size = $size ?? 'cover';
        $overlayColor = $overlayColor ?? '#000000b3';

        $gradientCSS = $isGradient ? "background: $gradient;" : '';

        $imgUrl = $image['url'] ?? '';
        $imageCSS = $isImage ? "background: url($imgUrl); background-color: $overlayColor; background-position: $position; background-size: $size; background-repeat: $repeat; background-attachment: $attachment; background-blend-mode: overlay;" : '';

        $solidCSS = $isSolid ? "background: $color;" : '';

        $styles = 'gradient' === $type ? $gradientCSS : ('image' === $type ? $imageCSS : $solidCSS);

        return $styles;
    }

    function getBorderCSS($border)
    {
        extract($border);
        $width = $width ?? '0px';
        $style = $style ?? 'solid';
        $color = $color ?? '#0000';
        $side = $side ?? 'all';
        $radius = $radius ?? '0px';

        $borderSideCheck = function ($s) use ($side) {
            $bSide = strtolower($side);
            return false !== strpos($bSide, 'all') || false !== strpos($bSide, $s);
        };

        $noWidth = $width === '0px' || !$width;
        $borderCSS = "$width $style $color";

        $styles = '';
        foreach (['top', 'right', 'bottom', 'left'] as $s) {
            if (!$noWidth && $borderSideCheck($s)) {
                $styles .= "border-$s: $borderCSS;";
            }
        }
        if ($radius) {
            $styles .= "border-radius: $radius;";
        }

        return $styles;
    }


    function generateCss($value, $cssProperty)
    {
        return !$value ? '' : "$cssProperty: $value;";
    }

    function getTypoCSS($selector, $typo, $isFamily = true)
    {
        extract($typo);
        $fontFamily = $fontFamily ?? 'Default';
        $fontCategory = $fontCategory ?? 'sans-serif';
        $fontVariant = $fontVariant ?? 400;
        $fontWeight = $fontWeight ?? 400;
        $isUploadFont = $isUploadFont ?? true;
        $fontSize = $fontSize ?? ['desktop' => 15, 'tablet' => 15, 'mobile' => 15];
        $fontStyle = $fontStyle ?? 'normal';
        $textTransform = $textTransform ?? 'none';
        $textDecoration = $textDecoration ?? 'auto';
        $lineHeight = $lineHeight ?? '135%';
        $letterSpace = $letterSpace ?? '0px';

        $isEmptyFamily = !$isFamily || !$fontFamily || 'Default' === $fontFamily;
        $desktopFontSize = $fontSize['desktop'] ?? $fontSize;
        $tabletFontSize = $fontSize['tablet'] ?? $desktopFontSize;
        $mobileFontSize = $fontSize['mobile'] ?? $tabletFontSize;

        $styles = ($isEmptyFamily ? '' : "font-family: '$fontFamily', $fontCategory;")
            . self::generateCss($fontWeight, 'font-weight')
            . 'font-size: ' . $desktopFontSize . 'px;'
            . self::generateCss($fontStyle, 'font-style')
            . self::generateCss($textTransform, 'text-transform')
            . self::generateCss($textDecoration, 'text-decoration')
            . self::generateCss($lineHeight, 'line-height')
            . self::generateCss($letterSpace, 'letter-spacing');

        // Google font link
        $linkQuery = (!$fontVariant || 400 === $fontVariant) ? '' : ('400i' === $fontVariant ? ':ital@1' : (false !== strpos($fontVariant, '00i') ? ': ital, wght@1, ' . str_replace('00i', '00', $fontVariant) . ' ' : ": wght@$fontVariant "));

        $link = $isEmptyFamily ? '' : 'https://fonts.googleapis.com/css2?family=' . str_replace(' ', '+', $fontFamily) . "$linkQuery&display=swap";

        return [
            'googleFontLink' => !$isUploadFont || $isEmptyFamily ? '' : "@import url( $link );",
            'styles' => preg_replace('/\s+/', ' ', trim("
                $selector{ $styles }
                @media (max-width: 768px) {
                    $selector{ font-size: $tabletFontSize" . "px; }
                }
                @media (max-width: 576px) {
                    $selector{ font-size: $mobileFontSize" . "px; }
                }
            "))
        ];
    }
    function getColorsCSS($colors)
    {
        extract($colors);
        $color = $color ?? '#333';
        $bgType = $bgType ?? 'solid';
        $bg = $bg ?? '#0000';
        $gradient = $gradient ?? 'linear-gradient(135deg, #4527a4, #8344c5)';

        $background = $bgType === 'gradient' ? $gradient : $bg;

        $styles = '';
        $styles .= $color ? "color: $color;" : '';
        $styles .= ($gradient || $bg) ? "background: $background;" : '';

        return $styles;
    }



    public function onInit()
    {
        wp_register_style('b-blocks-product-compare-style', plugins_url('dist/style.css', __DIR__), [], B_BLOCKS_VERSION);
        wp_register_style('b-blocks-product-compare-editor-style', plugins_url('dist/editor.css', __DIR__), ['b-blocks-product-compare-style'], B_BLOCKS_VERSION);

        register_block_type(__DIR__, [
            'editor_style'      => 'b-blocks-product-compare-editor-style',
            'render_callback'   => [$this, 'render']
        ]);

        wp_set_script_translations('b-blocks-product-compare-script', 'text-path', plugin_dir_path(__DIR__) . 'languages');
    }



    private function generatePaddingCSS($padding)
    {
        $paddingValues = [
            'top'    => esc_attr($padding['top']),
            'right'  => esc_attr($padding['right']),
            'bottom' => esc_attr($padding['bottom']),
            'left'   => esc_attr($padding['left']),
        ];

        return implode(' ', $paddingValues);
    }







    public function render($attributes)
    {
        extract($attributes); 
        wp_enqueue_style('b-blocks-product-compare-style');

        $className = $className ?? '';
        $blockClassName = "wp-block-b-blocks-product-compare $className align$align";


        ob_start(); 

?>

        <div class='<?php echo $blockClassName; ?>' id='bBlocksProductCompare-<?php echo esc_attr($cId); ?>' data-attributes='<?php echo wp_json_encode($attributes); ?>'>
            <style>
                <?php
                echo $this->getTypoCSS('', $btnStyle['typography'])['googleFontLink'];
                echo $this->getTypoCSS(".wp-block-b-blocks-product-compare table td .add_to_cart_button", $btnStyle['typography'])['styles'];
                ?>.wp-block-b-blocks-product-compare .bBlocksProductCompare table th,
                .wp-block-b-blocks-product-compare .bBlocksProductCompare table td {
                    text-align: <?php echo esc_attr($alignment); ?>;
                    padding: <?php echo esc_attr(implode(' ', $padding)); ?>;
                    <?php echo $this->getBorderCSS($border); ?><?php echo $this->getBackgroundCSS($background); ?>
                } 

                .wp-block-b-blocks-product-compare table td .add_to_cart_button {
                    <?php
                    if (isset($btnStyle['colors'])) {
                        echo esc_html($this->getColorsCSS($btnStyle['colors'], $btnStyle['bg']));
                    }
                    ?>;
                    <?php echo $this->getBorderCSS($btnStyle['border']); ?>;
                    padding: <?php echo esc_attr(
                                    implode(
                                        ' ',
                                        [
                                            esc_attr($btnStyle['padding']['top']),
                                            esc_attr($btnStyle['padding']['right']),
                                            esc_attr($btnStyle['padding']['bottom']),
                                            esc_attr($btnStyle['padding']['left']),
                                        ]
                                    )
                                ); ?>;

                } 

                .wp-block-b-blocks-product-compare table td .add_to_cart_button:hover {
                    <?php
                    if (isset($btnStyle['hvrColors'])) {
                        echo esc_html($this->getColorsCSS($btnStyle['hvrColors'], $btnStyle['bg']));
                    }
                    ?>
                }

                ;



                <?php
                echo $this->getTypoCSS('.wp-block-b-blocks-product-compare table td .add_to_cart_button', $typography)['googleFontLink'];
                echo $this->getTypoCSS(".wp-block-b-blocks-product-compare table td .add_to_cart_button", $typography)['styles'];
                ?>
            </style>

            <?php
            if (class_exists('WooCommerce')) {
                $this->outputProductCompare($productIds);
            }
            ?>
        </div>


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
            $tableData['Add to cart'][$index]  = '<a href="' . esc_url(add_query_arg('add-to-cart', $product->get_id(), $product->get_permalink())) . '" class="add_to_cart_button">Add to Cart</a>';
            $tableData['SKU'][$index]          = $product->get_sku();
            $tableData['Availability'][$index] = $product->is_in_stock() ? 'In stock' : 'Out of stock';
            $tableData['Weight'][$index]       = $product->get_weight();
            // $tableData['Dimension'][$index]    = $product->get_dimensions();
            $tableData['Dimension'][$index] = wc_format_dimensions($product->get_dimensions(false));
            $tableData['Color'][$index]        = $product->get_attribute('Color');
            $tableData['Size'][$index]         = $product->get_attribute('Size');
        }
    ?>

        <div class="bBlocksProductCompare">
            <table>
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
                                $el = "<td><img class='product-img' src='$d' alt='$title' /></td>";
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