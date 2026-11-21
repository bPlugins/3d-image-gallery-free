<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

 if (!function_exists('ig_fs')) {
        function ig_fs() {
            global $ig_fs;

            if (!isset($ig_fs)) {
                require_once BIGB_DIR_PATH . 'vendor/freemius-lite/start.php';

                $ig_fs = fs_lite_dynamic_init([
                    'id'                  => '19835',
					'slug'                => '3d-image-gallery',
                    '__FILE__'            => BIGB_DIR_PATH . 'index.php',
					'premium_slug'        => '3d-image-gallery-pro',
					'type'                => 'plugin',
					'public_key'          => 'pk_b2e7f3ea20771578177abd884c97d',
					'is_premium'          => false,
					'premium_suffix'      => 'Pro',
					'has_premium_version' => true,
					'has_addons'          => false,
					'has_paid_plans'      => true,
					'menu'                => array(
						'slug'           => '3d-image-gallery-dashboard',
						'first-path'     => 'edit.php?post_type=image-gallery&page=3d-image-gallery-dashboard',
						'support'        => false,
						'parent'         => array(
							'slug' => 'edit.php?post_type=image-gallery',
						),
					),
                ]); 
            }
            return $ig_fs;
        }

        ig_fs();
        // Show this plugin's own icon on the Freemius opt-in screen. Without it the SDK
        // looks inside its own folder and falls back to a grey plug.
        if ( method_exists( ig_fs(), 'add_filter' ) ) ig_fs()->add_filter( 'plugin_icon', function () {
            return wp_normalize_path( BIGB_DIR_PATH . 'assets/icon.svg' );
        } );
        do_action('ig_fs_loaded');
    }

// Temporary bridge for a bPlugins lite SDK bug: its Plugins-page script looks up
// the "Opt In" link with `.optInBtn.<slug>`, and a slug that starts with a digit
// ("3d-image-gallery") is not a valid CSS selector, so the script stops and the
// link does nothing. Until the SDK escapes the slug itself, rewrite exactly that
// one selector to its escaped form; every other selector passes through as is.
// Delete this block once the SDK ships the fix (plugin-tasks #128).
add_action( 'admin_enqueue_scripts', function ( $hook ) {
	if ( 'plugins.php' !== $hook || ! wp_script_is( 'bsdk-opt-in', 'enqueued' ) ) {
		return;
	}
	$js = '(function(){var p=Document.prototype,q=p.querySelector,s=".optInBtn.3d-image-gallery";'
		. 'if(q.bigbOptInFix||!window.CSS||!CSS.escape)return;'
		. 'var f=function(sel){return q.call(this,sel===s?".optInBtn."+CSS.escape("3d-image-gallery"):sel);};'
		. 'f.bigbOptInFix=true;p.querySelector=f;})();';
	wp_add_inline_script( 'bsdk-opt-in', $js, 'before' );
}, 100 );
