import { imageGalleryIcon, mediaHighlightsIcon } from "../../utils/icons";
import welcomeBanner from "../assets/welcomeBanner";

const slug = "3d-image-gallery";

export const dashboardInfo = (info) => {
  const {
    version,
    isPremium,
    hasPro,
    licenseActiveNonce,
    nonce,
    adminUrl,
    uninstallNonce,
    deleteDataOnUninstall,
  } = info;

  const proSuffix = isPremium ? " Pro" : "";

  return {
    name: `Image Gallery Block${proSuffix}`,
    displayName: `Image Gallery Block${proSuffix} - Create and display photo gallery/photo album`,
    description:
      "The Image Gallery Block Plugin for WordPress allows you to create beautifully designed and interactive image galleries directly within your content. With multiple 3D styles and dynamic layout options, this plugin helps you present your images in a visually engaging way, making it easier to capture your audience's attention and enhance your message.",
    slug,
    version,
    isPremium,
    hasPro,
    adminUrl,
    licenseActiveNonce,
    uninstallNonce,
    deleteDataOnUninstall,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      // The Welcome hero's artwork. Vector and bundled -- see the module
      // for why it is a string rather than an imported .svg.
      thumbnail: welcomeBanner,
      //   video: "https://www.youtube.com/watch?v=milYZrqLJsE",
      //   isYoutube: true,
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      //   docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 19835,
      plan_id: 32910,
      public_key: "pk_b2e7f3ea20771578177abd884c97d",
    },
    changelogs: [
      {
        version: "2.4.0 - 19 Sep 26",
        list: [
          "New (Pro): Media Highlights — Facebook-style story albums for photos & videos with a full-screen autoplay story viewer. Available in the Pro version.",
          "New: Reusable galleries — an Image Gallery post type with a [image_gallery id=123] shortcode you can place anywhere.",
          "New: The gallery screen keeps the block editor even when Gutenberg is disabled sitewide.",
          "New: Four ready-made sections in the inserter — Photo album grid, Polaroid photo wall, Portfolio showcase, Product lookbook.",
          "New: Bulk Add from Media Library — select several photos at once and add them all in one step, instead of one at a time.",
          "New: Albums & Filter Bar — group images into albums and let visitors filter the gallery with a clickable filter bar.",
          "New: Image Watermarking — overlay a text or logo watermark on gallery and lightbox images.",
          "New: Load More Pagination — show a limited number of images up front and reveal the rest on demand.",
          "New: Lightbox Toolbar — fullscreen, download, and share/copy-link buttons plus an image counter.",
          "New: Aspect Ratio Control — crop gallery thumbnails to Square, 4:3, 16:9, 3:2, or 9:16.",
          "New: Right-Click Protection — optionally prevent visitors from right-clicking to save images.",
          "Improved: gallery tiles and both lightboxes are now fully keyboard-operable with proper ARIA roles and focus handling.",
          "Improved: gallery and Polaroid thumbnails now lazy-load and carry real alt text.",
          "Fix: Polaroid photo wall section arrived empty; now ships with six framed photographs.",
          "Fix: Polaroid wall column count collapsed to one column; now sets 3/2/1 columns per device.",
          "Fix: Frame captions could be invisible on dark themes.",
          "Fix: Frame tilt reshuffled on every re-render.",
          "Fix: A Polaroid gallery with cleared photographs could throw before rendering.",
          "Fix: The block had no usable inserter preview.",
          "Fix: Copy-to-clipboard messages used the wrong text domain and could not be translated.",
          "Fix: block asset caching now uses the plugin's real version so styles update immediately after an update.",
        ],
        type: "new",
      },
      {
        version: "2.3.0 - 30 Jun 26",
        list: [
          "Add: New Admin Dashboard UI with improved layout and user experience.",
        ],
        type: "new",
      },
      {
        version: "2.2.10 - 16 Mar 26",
        list: ["Fix: Dashboard Default Color Scheme"],
        type: "fix",
      },
      {
        version: "2.2.9 - 15 Mar 26",
        list: ["Fix: Premium Overlay Issue"],
        type: "fix",
      },
      {
        version: "2.2.8 - 05 Feb 26",
        list: ["Fix: Product landing page link not working"],
        type: "fix",
      },
      {
        version: "2.2.7 - 26 Feb 26",
        list: ["Fix: Freemius Lite SDK Security Vulnerability"],
        type: "fix",
      },
      {
        version: "2.2.6 - 23 Feb 26",
        list: ["Add: New Dashboard"],
        type: "new",
      },
      {
        version: "2.1.5 - 14 Jan 26",
        list: ["Added New Screenshots", "Fixed Frontend View Issue"],
        type: "new",
      },
      {
        version: "2.1.4 - 13 Jan 26",
        list: ["Added New Features", "Fixed Theme Change Tooltip Issue"],
        type: "new",
      },

      {
        version: "2.0.2 - 18 Nov 25",
        list: ["Added Inline Script"],
        type: "new",
      },

      {
        version: "2.0.2 - 04 Nov 25",
        list: ["SDK updated"],
        type: "update",
      },
    ],
    proFeatures: [
      "Access premium gallery styles (styleTwo, styleThree, styleFour, styleFive, styleSix, styleSeven) for diverse layouts.",
      "Add, remove, and sort images with a sortable design for premium styles.",
      "Customize title font, color, margin, overlay, and padding for styleTwo, styleThree, styleFour, styleFive.",
      "Set image border radius, overlay color, shadow, hover shadow, size, and gap for styleTwo, styleThree, styleFive, styleSix.",
      "Adjust card border radius, shadow, width, height, gap, and alignment for styleFour.",
      "Configure button icons, colors, border radius, size, and positioning for styleSeven.",
      "Customize container background, border radius, margin, padding, width, height, and slider height for premium styles.",
    ],

    startButton: {
      label: "Start Now",
      url: `wp-admin/post-new.php?post_type=page&title=Image Gallery Block&content=<!-- wp:bigb/image-gallery {"cId":"20fab628-8"} /-->&nonce=${nonce}`,
    },
  };
};

export const welcomeInfo = (adminUrl = "") => ({
  // Hero card keyword chips (rendered by the canonical Welcome/Overview).
  keywordsLabel: "Styles",
  keywords: [
    "Default",
    "Style One",
    "Style Two",
    "Style Three",
    "Style Four",
    "Style Five",
    "Style Six",
    "Style Seven",
  ],

  // Tabbed getting-started guide shown beside the hero card.
  gettingStarted: {
    tabs: [
      {
        key: "block-editor",
        label: "Block Editor",
        steps: [
          {
            num: 1,
            title: "Open the Editor",
            body: "Edit any post or page, or create a new one.",
            link: { url: `${adminUrl}post-new.php`, label: "New Post" },
          },
          {
            num: 2,
            title: "Insert the Image Gallery Block",
            body: "Click the <strong>+</strong> inserter and search <strong>Image Gallery</strong>, then drop it into your content.",
          },
          {
            num: 3,
            title: "Add Your Images",
            body: "Upload images or pick them from the <strong>Media Library</strong> to build your gallery.",
          },
          {
            num: 4,
            title: "Pick a Style & Publish",
            body: "Choose a <strong>3D style/layout</strong>, then fine-tune columns, gaps, overlays, and captions in the sidebar before you <strong>Publish</strong>.",
          },
        ],
      },
      {
        key: "shortcode",
        label: "Shortcode",
        steps: [
          {
            num: 1,
            title: "Create a Gallery",
            body: "Go to <strong>Image Gallery</strong> in your admin menu and click <strong>Add New</strong>.",
            link: {
              url: `${adminUrl}post-new.php?post_type=image-gallery`,
              label: "Add New Gallery",
            },
          },
          {
            num: 2,
            title: "Build & Publish",
            body: "Add your images, pick a <strong>3D style</strong>, then click <strong>Publish</strong>.",
          },
          {
            num: 3,
            title: "Copy the Shortcode",
            body: "Go to <strong>Image Gallery &rsaquo; All Image Gallery</strong> and click the shortcode in the <strong>Shortcode</strong> column to copy it (e.g. <code>[image_gallery id=123]</code>).",
            link: {
              url: `${adminUrl}edit.php?post_type=image-gallery`,
              label: "All Galleries",
            },
          },
          {
            num: 4,
            title: "Paste It Anywhere",
            body: "Drop the shortcode into any post, page, widget, page-builder row or theme template. Edit the gallery once and every copy updates.",
          },
        ],
      },
      {
        key: "elementor",
        label: "Elementor",
        steps: [
          {
            num: 1,
            title: "Create a Gallery",
            body: "Go to <strong>Image Gallery &rsaquo; Add New</strong> to build and publish a gallery, then copy its shortcode.",
            link: {
              url: `${adminUrl}post-new.php?post_type=image-gallery`,
              label: "Add New Gallery",
            },
          },
          {
            num: 2,
            title: "Edit with Elementor",
            body: "Open any post or page in the <strong>Elementor</strong> editor.",
          },
          {
            num: 3,
            title: "Add Shortcode Widget",
            body: "Search for the <strong>Shortcode</strong> widget in the Elementor elements panel and drag it into your layout.",
          },
          {
            num: 4,
            title: "Paste Shortcode",
            body: "Paste your gallery shortcode (e.g. <code>[image_gallery id=123]</code>) into the widget input field and save your changes.",
          },
        ],
      },
      {
        key: "php",
        label: "PHP",
        steps: [
          {
            num: 1,
            title: "Get Gallery ID",
            body: "Go to <strong>Image Gallery &rsaquo; All Image Gallery</strong> and note the <strong>ID</strong> of the gallery you want to embed.",
            link: {
              url: `${adminUrl}edit.php?post_type=image-gallery`,
              label: "All Galleries",
            },
          },
          {
            num: 2,
            title: "Copy PHP Function",
            body: "Copy the WordPress <code>do_shortcode</code> function: <pre><code>&lt;?php echo do_shortcode('[image_gallery id=\"YOUR_ID\"]'); ?&gt;</code></pre>",
          },
          {
            num: 3,
            title: "Insert in Template",
            body: "Open your theme or template files (e.g. <code>single.php</code>, <code>page.php</code>) in an editor.",
          },
          {
            num: 4,
            title: "Replace ID & Save",
            body: "Paste the code into your PHP file and replace <code>YOUR_ID</code> with the actual ID of your image gallery.",
          },
        ],
      },
    ],
  },
});

export const demoInfo = {
  allInOneLabel: "See All Demos",
  allInOneLink: "https://bblockswp.com/demo/image-gallery-default/",
  demos: [
    {
      icon: imageGalleryIcon,
      title: "Image Gallery Block",
      children: [
        {
          title: "Default",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-block-style-default/",
        },
        {
          title: "Style One",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-one/",
        },
        {
          title: "Style Two",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-two/",
        },
        {
          title: "Style Three",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-three/",
        },
        {
          title: "Style Four",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-four/",
        },
        {
          title: "Style Five",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-five/",
        },
        {
          title: "Style Six",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-six/",
        },
        {
          title: "Style Seven",
          type: "iframe",
          url: "https://bblockswp.com/demo/image-gallery-style-seven/",
        },
      ],
    },
    {
      icon: mediaHighlightsIcon,
      title: "Media Highlights",
      type: "iframe",
      url: "https://bblockswp.com/demo/3d-image-gallery-media-highlights/",
    },

    // {
    //   icon: imageGalleryIcon,
    //   title: "Image Gallery Block",
    //   type: "iframe",
    //   url: "https://bblockswp.com/demo/image-gallery-default/",
    // },
  ],
};

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 19835,
  planId: 32910,
  licenses: [1, 3, null],
  button: {
    label: "Buy Now ➜",
  },
  featured: {
    selected: 3, // choose from licenses item
  },
};
