<?php
namespace BIGB;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Green "Upgrade" link in the plugin's admin submenu, styled like the Freemius
 * SDK's own. It opens the Pricing tab of the plugin's Help & Demos dashboard, so
 * there is only one pricing page to keep up to date.
 */
class Pricing {
    const PARENT_SLUG = 'edit.php?post_type=image-gallery';
    const PRICING_URL = 'edit.php?post_type=image-gallery&page=3d-image-gallery-dashboard#/pricing';

    function __construct() {
        add_action( 'admin_menu', [ $this, 'addMenu' ], 20 );
        add_action( 'admin_head', [ $this, 'menuStyle' ] );
    }

    function addMenu() {
        // No callback: WordPress then uses the slug itself as the link.
        add_submenu_page(
            self::PARENT_SLUG,
            __( 'Upgrade', 'image-gallery' ),
            '<span class="bigb-upgrade-menu">' . esc_html__( 'Upgrade', 'image-gallery' ) . '&nbsp;&nbsp;&#x27A4;</span>',
            'manage_options',
            self::PRICING_URL
        );
    }

    /** Same yellow-green the Freemius SDK gives its "Upgrade" link. */
    function menuStyle() { ?>
        <style>
            #adminmenu .bigb-upgrade-menu { color: greenyellow; }
        </style>
    <?php }
}
