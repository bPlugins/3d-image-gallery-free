import { imageGalleryIcon } from "../../utils/icons";

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
      thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/3d-image-gallery.png`,
      // thumbnail: `https://bplugins.com/wp-content/uploads/2026/01/3d-image-gallery.png`,
      //   thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
      // proThumbnail: `https://bplugins.com/wp-content/uploads/2026/01/3d-image-gallery.png`,
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
        key: "site-editor",
        label: "Site Editor",
        steps: [
          {
            num: 1,
            title: "Open the Site Editor",
            body: "Go to <strong>Appearance &rsaquo; Editor</strong> to edit your block theme (FSE).",
            link: { url: `${adminUrl}site-editor.php`, label: "Site Editor" },
          },
          {
            num: 2,
            title: "Choose a Template",
            body: "Open the <strong>template</strong> or <strong>template part</strong> (e.g. header, single, archive) where you want the gallery.",
          },
          {
            num: 3,
            title: "Insert the Image Gallery Block",
            body: "Click the <strong>+</strong> inserter and search <strong>Image Gallery</strong>, then drop it into the template.",
          },
          {
            num: 4,
            title: "Add Images & Save",
            body: "Add your images, pick a style, and click <strong>Save</strong> — the gallery appears everywhere that template is used.",
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
