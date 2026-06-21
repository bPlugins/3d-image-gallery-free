# Gutenberg 3D Image Gallery Block Documentation

Welcome to the official documentation for the **3D Image Gallery Block** by bPlugins. This documentation provides a comprehensive guide to installing, configuring, customizing, and troubleshooting the 3D Image Gallery Block on your WordPress website.

---

## 📖 Document Index

* **[Overview & Introduction](#overview--introduction)**
* **[Getting Started](#getting-started)**
  * [System Requirements](#system-requirements)
  * [Installation Methods](#installation-methods)
  * [Activating the Pro License](#activating-the-pro-license)
* **[How To Use](#how-to-use)**
  * [Inserting the Gallery Block](#inserting-the-gallery-block)
  * [Adding and Managing Gallery Items](#adding-and-managing-gallery-items)
  * [Customizing Gallery Styles & Layouts](#customizing-gallery-styles--layouts)
  * [Adjusting Layout & Spacing Settings](#adjusting-layout--spacing-settings)
  * [Configuring Slide Speed & Heights](#configuring-slide-speed--heights)
  * [Styling Typography, Backgrounds, and Shadows](#styling-typography-backgrounds-and-shadows)
* **[Frequently Asked Questions (FAQs)](#frequently-asked-questions-faqs)**

---

## Overview & Introduction

The **[3D Image Gallery Block](https://bplugins.com/products/3d-image-gallery/)** is a lightweight, high-performance Gutenberg block plugin designed to help you create responsive photo galleries, masonry layouts, and interactive 3D sliders. 

Without writing a single line of code, you can display photography portfolios, product albums, blogs, and showcase slider screens directly inside the WordPress Gutenberg Block Editor.

### 🌟 Key Feature Comparison

| Feature / Control | Free Version | Pro Version |
| :--- | :---: | :---: |
| **Default Grid Layout** | Yes | Yes |
| **Polaroid Card Layout (Style 1)** | Yes | Yes |
| **Masonry Grid Layout (Style 2)** | No | Yes |
| **Dynamic Motion Hover Effect (Style 3)** | No | Yes |
| **3D Parallax Mouse Tilt (Style 4)** | No | Yes |
| **3D Slider Coverflow Carousel (Style 5)** | No | Yes |
| **Hexagonal Honeycomb Grid (Style 6)** | No | Yes |
| **Simple Swiper Slide Carousel (Style 7)** | No | Yes |
| **Built-in Lightbox Popup** | Yes | Yes |
| **Drag-and-Drop Image Sorting** | No | Yes |
| **Custom Overlays & Card Backgrounds** | Yes | Yes |
| **Responsive Column & Typography Controls** | Yes | Yes |

---

## Getting Started

### System Requirements
Before installing the 3D Image Gallery Block, ensure your hosting environment meets the following specifications:
* **WordPress Version:** 6.5 or higher.
* **PHP Version:** 7.1 or higher (PHP 8.x recommended).
* **Editor:** Gutenberg block editor (default block editor in WordPress core).

### Installation Methods

#### Dashboard Installation
* Log in to your WordPress dashboard.
* Navigate to **Plugins** > **Add New Plugin**.
* In the top-right search bar, type `Image Gallery Block` (look for the plugin contributed by **bPlugins**).
* Click **Install Now**, and once installed, click **Activate**.

#### Uploading the ZIP File
* Download the plugin ZIP file from the [WordPress Plugin Directory](https://wordpress.org/plugins/3d-image-gallery/) or [bPlugins website](https://bplugins.com/products/3d-image-gallery/).
* In your WordPress dashboard, navigate to **Plugins** > **Add New Plugin**.
* Click the **Upload Plugin** button at the top of the screen.
* Select the `3d-image-gallery.zip` file from your local computer and click **Install Now**.
* Click **Activate Plugin** once the upload completes.

#### Manual Installation via SFTP
* Extract the downloaded `3d-image-gallery.zip` file on your computer.
* Connect to your server using your preferred FTP client (e.g., FileZilla).
* Upload the extracted `3d-image-gallery` folder to the `/wp-content/plugins/` directory on your server.
* Go to **Plugins** > **Installed Plugins** in the WordPress dashboard and click **Activate** under **Image Gallery Block**.

### Activating the Pro License
If you purchased a Pro license for advanced layouts and hover capabilities:
* Install and activate the Pro plugin ZIP file using the upload method above.
* Go to **Tools** > **Image Gallery** from the WordPress admin menu.
* Click on the **Activation** tab.
* Enter your license key in the input box and click the **Activate License** button.

---

## How To Use

### Inserting the Gallery Block
* Open a new or existing WordPress Page or Post.
* Click the **+ (Block Inserter)** icon at the top-left of the editor canvas.
* Type `Image Gallery` in the search bar.
* Click the **Image Gallery** block icon to insert it onto your page.

### Adding and Managing Gallery Items
The gallery displays multiple cards. Each card can house images, titles, subtitles, and individual colors.

* Click on the Image Gallery block to select it.
* In the editor canvas or the block toolbar, click the **Add New Gallery Item** button (plus sign).
* Under the **General** settings tab in the right-hand sidebar, customize the item details:
  * **Title:** Enter the title text for the image card.
  * **Subtitle:** Enter a subtitle or short description.
  * **Add Image:** Click this button to upload a photo or select one from the Media Library.
* To create an image carousel inside a single card:
  * Click **Add Image** again within the same item to upload multiple photos.
   
  > [!NOTE]
  > Adding more than one photo to a single gallery item transforms that card into a carousel. Clicking it on the frontend opens the lightbox showing previous/next navigation controls.
   
* Use the **Duplicate** button to replicate a card, or the **Remove** button to delete it.

### Customizing Gallery Styles & Layouts
The 3D Image Gallery Block features pre-designed styles. To switch layouts:
* Select the main block.
* Open the **General** tab in the right sidebar.
* Under the **Choose a Style** dropdown menu, select one of the following layouts:

#### Default (Classic Grid)
Displays images in a clean, standard photo grid. This style is free and ideal for minimalist layout displays.

#### Style One (Polaroid)
Surrounds photos with a classic white Polaroid-style photo frame. Best for retro albums and artistic styling.

#### Style Two (Masonry) `[Pro]`
Arranges images in a dynamic grid layout where image heights vary fluidly, eliminating empty spaces. Perfect for portfolios with vertical and horizontal images mixed.

#### Style Three (Dynamic Motion) `[Pro]`
Adds an interactive scrolling hover motion. When visitors hover over an image card, it smoothly scrolls through the content.

#### Style Four (3D Parallax) `[Pro]`
Creates a modern 3D tilt effect. The image cards follow and tilt along with the visitor's cursor movement.

#### Style Five (3D Slider) `[Pro]`
An interactive Coverflow carousel. Images rotate in a three-dimensional perspective slider. 

#### Style Six (Hexagonal) `[Pro]`
Groups your images into a beautiful honeycomb hexagonal grid structure. You can toggle options to open linked URLs in new tabs.

#### Style Seven (Simple Swiper) `[Pro]`
A touch-friendly swipe slider carousel. Includes customized navigation arrows and pagination controls.

---

### Adjusting Layout & Spacing Settings
Optimize the columns and gaps between gallery items to match desktop, tablet, and mobile displays:
* Navigate to the **General** tab in the sidebar.
* Open the **Layout Settings** section.
* Use the device toggles (Desktop, Tablet, Mobile) to set the **Columns** slider.
* Adjust the **Column Gap** and **Row Gap** inputs (e.g., `20px` or `30px`) to control the empty spaces surrounding the cards.

### Configuring Slide Speed & Heights
Adjust dimensions and slider mechanics:
* Go to the **General** tab > **Gallery Settings**.
* **Slide Speed:** Set the transition speed (in seconds) for slider/carousel card transitions.
* **Item Height:** Input height values (such as `550px`, `400px`, or `50vh`) to determine the uniform height of all gallery items.

---

### Styling Typography, Backgrounds, and Shadows
Modify the appearance under the **Style** tab of the settings sidebar:

#### Title & Subtitle Typography
* Open the **Title Typography** or **Subtitle Typography** section.
* Customize the font family, font weight, line height, letter spacing, and font sizes.
* Click the device icons next to the font size slider to specify custom responsive font sizes for mobile screens.
* Click the color circle picker to apply solid or custom text colors.

#### Background Colors
* Open the **Background** section.
* Select **Solid Color** or **Gradient**.
* Choose color values or linear gradient ranges to customize the card's background.

#### Shadows & Hover Effects
* Open the **Shadow** section.
* Adjust the horizontal offset, vertical offset, blur radius, spread, and color of the default card shadows.
* Open the **Hover Shadow** section to configure a secondary shadow. This shadow style automatically applies when hover interactions happen.

> [!TIP]
> **Pro Design Tip:** Setting a low-opacity shadow offset (e.g. `vOffset: 6px`, `blur: 15px`, and `color: rgba(0, 10, 20, 0.1)`) with a stronger hover shadow creates a highly interactive, premium "floating card" effect.

---

## Frequently Asked Questions (FAQs)

### Is the 3D Image Gallery Block free?
Yes, the base plugin is free and comes with standard layouts (Default Grid and Polaroid style), lightbox popup controls, columns, gaps, shadows, and typography customization options. You can upgrade to the Pro plan for premium layouts (Masonry, 3D Slider, Hexagonal, etc.).

### Will this plugin work with my WordPress theme?
Yes. The 3D Image Gallery Block is designed to work with all block-supporting WordPress themes and classic themes running Gutenberg. It uses standard WordPress block structures to ensure high theme compatibility.

### Why are my changes not displaying on the live site?
If you configure changes in the editor but they do not show up on the frontend, it is usually due to caching. Clear your browser cache and your website's caching plugins (such as WP Rocket, LiteSpeed Cache, or W3 Total Cache). If you use a CDN like Cloudflare, clear its cache as well.

### How do I change the sorting order of my images?
Drag-and-drop sortable controls are supported directly in the block settings sidebar. This allows you to easily reorganize slide structures. Note that this feature is available for advanced layouts in the Pro version.

### How do I fix cropped images?
In the default layouts, the block crops images to fit the configured **Item Height**. You can increase or decrease this height under **Gallery Settings**. If you want to show images in their original aspect ratios without cropping, select the **Style Two (Masonry)** layout in the Pro version.

### Can I display more than one image inside a card?
Yes. If you select a gallery item in the sidebar and click **Add Image** multiple times, that card turns into an internal slideshow. When clicked on the frontend, the lightbox popup will display previous and next navigation arrows so users can browse all images in that item.

### Where can I get support or report bugs?
You can post questions on our [WordPress.org Support Forum](https://wordpress.org/support/plugin/3d-image-gallery/) or contact our help desk via the [bPlugins Support Page](https://bplugins.com/support/). 

### How can I report a security vulnerability?
Please submit security issues via the [Patchstack Vulnerability Disclosure Program](https://patchstack.com/database/vdp/9e5fc6a4-e1c2-43ce-be03-f518a3f38622). Our development team will review it, assign a CVE if applicable, and deploy a patched version immediately.
