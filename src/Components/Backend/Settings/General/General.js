import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { ItemsPanel } from "../../../../../../bpl-tools/Components";
import GalleryPanel from "../GalleryItemPanel/GalleryItemPanel";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  TextControl,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  Tooltip,
  Button,
  Dashicon,
  SelectControl,
  ToggleControl,
  CheckboxControl,
} from "@wordpress/components";
import { produce } from "immer";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Settings Components
import {
  Label,
  ColorsControl,
  HelpPanel,
  InlineMediaUpload,
  Device,
} from "../../../../../../bpl-tools/Components";

import { closeIcon, gearIcon } from "../../../../../../bpl-tools/utils/icons";

import {
  pxUnit,
  perUnit,
  emUnit,
} from "../../../../../../bpl-tools/utils/options";

import {
  galleryAttr,
  galleryOptions,
  getNewItemByStyle,
  styleItems,
} from "../../../../utils/options";

const General = ({
  attributes,
  setAttributes,
  device,
  activeIndex,
  setActiveIndex,
}) => {
  const {
    gallery = [],
    slideSpeed,
    itemHeight,
    aspectRatio = "original",
    objectFit = "cover",
    showLightboxCounter = true,
    showLightboxFullscreen = true,
    showLightboxDownload = true,
    showLightboxShare = true,
    columns,
    columnGap,
    rowGap,
    styleSl,
    imagesData,
    albums = [],
    filter = {},
    watermark = {},
    disableRightClick = false,
    enableLightbox = true,
    enableLoadMore = false,
    imagesPerLoad = 10,
    loadMoreBtnText = "Load More",
    loadMoreBtnColors,
    loadMoreBtnTypo,
  } = attributes;

  const [newAlbumName, setNewAlbumName] = useState("");
  const [globalDate, setGlobalDate] = useState(new Date());

  const addAlbum = () => {
    const trimmed = (newAlbumName || "").trim();
    if (!trimmed || albums.includes(trimmed)) return;
    setAttributes({ albums: [...albums, trimmed] });
    setNewAlbumName("");
  };

  const removeAlbum = (indexToRemove) => {
    const albumToRemove = albums[indexToRemove];
    const updatedAlbums = albums.filter((_, i) => i !== indexToRemove);
    const updatedGallery = gallery.map((item) => ({
      ...item,
      albs: Array.isArray(item?.albs)
        ? item.albs.filter((a) => a !== albumToRemove)
        : [],
    }));
    setAttributes({ albums: updatedAlbums, gallery: updatedGallery });
  };

  // Add new gallery item
  const addGalleryItem = () => {
    const newGallery = [
      ...gallery,
      {
        title: `Title ${gallery.length + 1}`,
        subtitle: `Subtitle ${gallery.length + 1}`,
        images: [],
        colors: {
          color: "#fff",
          bgType: "solid",
          bg: "#505a64d9",
        },
        btnColors: {
          color: "#fff",
          bgType: "solid",
          bg: "#000a1480",
        },
        albs: [],
      },
    ];
    setAttributes({ gallery: newGallery });
    setActiveIndex(newGallery.length - 1);
  };

  // Bulk-add Media Library selections as new gallery items (one image each),
  // instead of the New Item -> Add Image -> browse cycle repeated per photo.
  const bulkAddGalleryItems = (media) => {
    const items = Array.isArray(media) ? media : [media];
    if (!items.length) return;

    const startCount = gallery.length;
    const newItems = items.map((item, i) => ({
      title: item?.title || `Title ${startCount + i + 1}`,
      subtitle: "",
      images: [item?.url],
      colors: { color: "#fff", bgType: "solid", bg: "#505a64d9" },
      btnColors: { color: "#fff", bgType: "solid", bg: "#000a1480" },
      albs: [],
    }));

    const newGallery = [...gallery, ...newItems];
    setAttributes({ gallery: newGallery });
    setActiveIndex(newGallery.length - 1);
  };

  // Same idea for styleOne (Polaroid): each selection becomes a new frame
  // in imagesData.images instead of one at a time via the sortable panel.
  const bulkAddImages = (media) => {
    const items = Array.isArray(media) ? media : [media];
    if (!items.length) return;

    const template = getNewItemByStyle(styleSl) || {};
    const existingImages = imagesData?.images || [];

    const newImages = items.map((item) => {
      let dateStr = template.date || "";
      if (item?.dateFormatted && typeof item.dateFormatted === "string") {
        dateStr = item.dateFormatted;
      } else if (item?.date && typeof item.date === "string") {
        dateStr = item.date;
      } else if (item?.date instanceof Date) {
        dateStr = item.date.toISOString();
      }

      return {
        ...template,
        id: `${item?.id || Math.random().toString(36).substring(2, 9)}`,
        url: item?.url,
        title: item?.title || template.title || "Title",
        description: item?.caption || item?.alt || template.description || "",
        date: dateStr.slice(0, 10),
      };
    });

    setAttributes({
      imagesData: { ...imagesData, images: [...existingImages, ...newImages] },
    });
  };

  // Update gallery item safely
  const updateGallery = (type, val, otherIndex = false) => {
    const newGallery = produce(gallery, (draft) => {
      // Guard clause: exit if activeIndex invalid
      if (
        activeIndex === null ||
        activeIndex < 0 ||
        activeIndex >= draft.length
      ) {
        return;
      }

      if (false !== otherIndex) {
        if (
          Array.isArray(draft[activeIndex][type]) &&
          otherIndex >= 0 &&
          otherIndex < draft[activeIndex][type].length
        ) {
          draft[activeIndex][type][otherIndex] = val;
        }
      } else {
        draft[activeIndex][type] = val;
      }
    });
    setAttributes({ gallery: newGallery });
  };

  // Duplicate gallery item
  const duplicateGallery = (e) => {
    e.preventDefault();
    if (
      activeIndex === null ||
      activeIndex < 0 ||
      activeIndex >= gallery.length
    )
      return;

    const newGallery = [
      ...gallery.slice(0, activeIndex + 1),
      { ...gallery[activeIndex] },
      ...gallery.slice(activeIndex + 1),
    ];
    setAttributes({ gallery: newGallery });
    setActiveIndex(activeIndex + 1);
  };

  // Remove gallery item
  const removeGallery = (e) => {
    e.preventDefault();
    if (
      activeIndex === null ||
      activeIndex < 0 ||
      activeIndex >= gallery.length
    )
      return;

    const newGallery = [
      ...gallery.slice(0, activeIndex),
      ...gallery.slice(activeIndex + 1),
    ];
    setAttributes({ gallery: newGallery });

    // Set new active index safely
    const newIndex = activeIndex === 0 ? 0 : activeIndex - 1;
    setActiveIndex(newGallery.length > 0 ? newIndex : null);
  };

  // Active gallery item safely destructured
  const activeItem = gallery?.[activeIndex] || {};
  const {
    title = "",
    subtitle = "",
    images = [],
    colors = {},
    btnColors = {},
  } = activeItem;

  const updateStyle = (newStyle) => {
    if (newStyle === "styleDefault") {
      setAttributes({
        styleSl: newStyle,
        gallery: galleryAttr || {},
        imagesData: { images: [] },
        styles: {},
      });
    } else {
      setAttributes({
        styleSl: newStyle,
        gallery: [],
        imagesData: styleItems[newStyle]?.imagesData || { images: [] },
        styles: styleItems[newStyle]?.styles || {},
      });
    }
  };

  return (
    <>
      <HelpPanel
        slug="3d-image-gallery"
        docsLink="https://bblockswp.com/docs/3d-image-gallery-block"
      />
      <PanelBody
        className="bPlPanelBody"
        title={__("Gallery", "image-gallery")}
        initialOpen={true}>
        <SelectControl
          className="chooseStyle mb10"
          label={__("Choose a Style", "image-gallery")}
          labelPosition="left"
          value={styleSl}
          options={galleryOptions}
          onChange={updateStyle}
        />
      </PanelBody>

      {/* Style One */}
      {styleSl === "styleOne" && (
        <>
          <PanelBody
            className="bPlPanelBody"
            title={`${__("Gallery Images", "image-gallery")} (${(imagesData?.images || []).length})`}
            initialOpen={true}>
            <div className="bulkAddItem mb10">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={bulkAddImages}
                  allowedTypes={["image"]}
                  multiple="add"
                  render={({ open }) => (
                    <Button
                      variant="secondary"
                      className="ig-bulk-add-btn"
                      label={__("Bulk Add from Media Library", "image-gallery")}
                      onClick={open}>
                      <Dashicon icon="admin-media" />
                      {__("Bulk Add from Media Library", "image-gallery")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
            <ItemsPanel
              styleSl={styleSl}
              attributes={imagesData}
              setAttributes={(newImages) =>
                setAttributes({
                  imagesData: { ...imagesData, ...newImages },
                })
              }
              device={device}
              arrKey="images"
              newItem={getNewItemByStyle(styleSl)}
              ItemSettings={GalleryPanel}
              itemLabel="Image"
              design="sortable"
              premiumProps={{ rootAttributes: attributes }}
            />
          </PanelBody>

          <PanelBody
            className="bPlPanelBody"
            title={__("Date Stamp Settings", "image-gallery")}
            initialOpen={false}>
            <ToggleControl
              label={__("Show Date on Images", "image-gallery")}
              checked={imagesData?.showDate}
              onChange={(showDate) => {
                setAttributes({ imagesData: { ...imagesData, showDate } });
              }}
            />

            {imagesData?.showDate && (
              <>
                <SelectControl
                  label={__("Global Date Format", "image-gallery")}
                  value={imagesData?.globalDateFormat || "MM-dd-yyyy"}
                  options={[
                    { value: "MM-dd-yyyy", label: "MM-DD-YYYY" },
                    { value: "yyyy-MM-dd", label: "YYYY-MM-DD" },
                    { value: "dd/MM/yyyy", label: "DD/MM/YYYY" },
                    { value: "MMMM d, yyyy ", label: "Month D, YYYY" },
                  ]}
                  onChange={(globalDateFormat) => {
                    const newImages = (imagesData?.images || []).map((img) => {
                      try {
                        const parsed = new Date(img.date);
                        if (!isNaN(parsed.getTime())) {
                          return {
                            ...img,
                            date: format(parsed, globalDateFormat),
                          };
                        }
                      } catch (e) {
                        // ignore
                      }
                      return img;
                    });

                    setAttributes({
                      imagesData: {
                        ...imagesData,
                        globalDateFormat,
                        images: newImages,
                      },
                    });
                  }}
                />
                <div style={{ marginTop: "12px" }}>
                  <Label className="mb5">
                    {__("Apply Global Date (Sets date for all images):", "image-gallery")}
                  </Label>
                  <div style={{ width: "100%", marginTop: "6px" }}>
                    <DatePicker
                      className="ig-datepicker-input"
                      selected={globalDate}
                      onChange={(date) => {
                        setGlobalDate(date);
                        try {
                          const formattedDate = format(
                            date,
                            imagesData?.globalDateFormat || "MM-dd-yyyy",
                          );
                          const newImages = (imagesData?.images || []).map(
                            (img) => ({
                              ...img,
                              date: formattedDate,
                            }),
                          );
                          setAttributes({
                            imagesData: {
                              ...imagesData,
                              images: newImages,
                            },
                          });
                        } catch (e) {
                          // ignore
                        }
                      }}
                      dateFormat={imagesData?.globalDateFormat || "MM-dd-yyyy"}
                    />
                  </div>
                </div>
              </>
            )}
          </PanelBody>
        </>
      )}

      {styleSl === "styleDefault" && (
        <>
          <PanelBody
            className="bPlPanelBody addRemoveItems"
            title={__("Add or Remove Items", "image-gallery")}>
            {activeIndex !== null &&
              activeIndex >= 0 &&
              activeIndex < gallery.length && (
                <div className="editItem">
                  <Label className="mb5 editItemHeading">
                    {__(`Item ${activeIndex + 1}:`, "image-gallery")}
                  </Label>

                  <Label className="mb5">{__("Title:", "image-gallery")}</Label>
                  <TextControl
                    value={title}
                    onChange={(val) => updateGallery("title", val)}
                  />

                  <Label>{__("Subtitle:", "image-gallery")}</Label>
                  <TextControl
                    value={subtitle}
                    onChange={(val) => updateGallery("subtitle", val)}
                  />

                  <Label>{__("Custom Link:", "image-gallery")}</Label>
                  <TextControl
                    value={activeItem?.link || ""}
                    onChange={(val) => updateGallery("link", val)}
                    help={__(
                      "If provided, clicking this item will open the link instead of the lightbox.",
                      "image-gallery",
                    )}
                  />

                  <Label>{__("Images:", "image-gallery")}</Label>
                  {images?.map((img, i) => (
                    <PanelRow key={i}>
                      <InlineMediaUpload
                        value={img}
                        types={["image"]}
                        onChange={(val) => updateGallery("images", val, i)}
                        placeholder={__(
                          "Enter gallery image url",
                          "image-gallery",
                        )}
                      />

                      <Tooltip
                        text={__("Remove this Image", "image-gallery")}
                        placement="top"
                        position="top">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            updateGallery("images", [
                              ...images.slice(0, i),
                              ...images.slice(i + 1),
                            ]);
                          }}>
                          <Dashicon icon="no" />
                        </Button>
                      </Tooltip>
                    </PanelRow>
                  ))}

                  <div
                    className="addItem bulkAddItem"
                    style={{ marginTop: "8px", gap: "8px" }}>
                    <Button
                      label={__("Add Image", "image-gallery")}
                      onClick={() => updateGallery("images", [...images, ""])}>
                      <Dashicon icon="plus" />
                      {__("Add Image", "image-gallery")}
                    </Button>

                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => {
                          const items = Array.isArray(media) ? media : [media];
                          const newUrls = items
                            .map((m) => m?.url)
                            .filter(Boolean);
                          updateGallery("images", [
                            ...images.filter(Boolean),
                            ...newUrls,
                          ]);
                        }}
                        allowedTypes={["image"]}
                        multiple="add"
                        render={({ open }) => (
                          <Button
                            label={__("Bulk Add Images", "image-gallery")}
                            onClick={open}>
                            <Dashicon icon="images-alt2" />
                            {__("Bulk Add Images", "image-gallery")}
                          </Button>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>

                  {albums?.length > 0 && (
                    <div className="ig-item-albums mt20">
                      <Label className="mb5">
                        {__("Assign to Albums:", "image-gallery")}
                      </Label>
                      <div className="ig-item-album-list">
                        {albums.map((albumName) => {
                          const currentAlbs = Array.isArray(activeItem?.albs)
                            ? activeItem.albs
                            : [];
                          const isChecked = currentAlbs.includes(albumName);
                          return (
                            <CheckboxControl
                              key={albumName}
                              label={albumName}
                              checked={isChecked}
                              onChange={(checked) => {
                                const nextAlbs = checked
                                  ? [...currentAlbs, albumName]
                                  : currentAlbs.filter((a) => a !== albumName);
                                updateGallery("albs", nextAlbs);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <ColorsControl
                    className="mt20"
                    value={colors}
                    onChange={(val) => updateGallery("colors", val)}
                    defaults={{
                      color: "#fff",
                      bgType: "solid",
                      bg: "#505a64d9",
                    }}
                  />

                  <ColorsControl
                    label={__("Button Colors:", "image-gallery")}
                    value={btnColors}
                    onChange={(val) => updateGallery("btnColors", val)}
                    defaults={{
                      color: "#fff",
                      bgType: "solid",
                      bg: "#000a1480",
                    }}
                  />

                  <PanelRow className="itemAction mt20">
                    <Button
                      className="removeItem"
                      label={__("Remove", "image-gallery")}
                      onClick={removeGallery}>
                      {/* <Dashicon icon="no" /> */}
                      {closeIcon}
                      {__("Remove", "image-gallery")}
                    </Button>

                    <Button
                      className="duplicateItem"
                      label={__("Duplicate", "image-gallery")}
                      onClick={duplicateGallery}>
                      {gearIcon}
                      {__("Duplicate", "image-gallery")}
                    </Button>
                  </PanelRow>
                </div>
              )}

            <div className="addItem bulkAddItem">
              <Button
                label={__("Add New Gallery Item", "image-gallery")}
                onClick={addGalleryItem}>
                <Dashicon icon="plus" />
                {__("Add New Gallery Item", "image-gallery")}
              </Button>

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={bulkAddGalleryItems}
                  allowedTypes={["image"]}
                  multiple="add"
                  render={({ open }) => (
                    <Button
                      label={__("Bulk Add from Media Library", "image-gallery")}
                      onClick={open}>
                      <Dashicon icon="admin-media" />
                      {__("Bulk Add from Media Library", "image-gallery")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </PanelBody>

          <PanelBody
            className="bPlPanelBody"
            title={__("Gallery Settings", "image-gallery")}
            initialOpen={false}>
            <Label className="mb5">
              {__("Slide Speed (in seconds):", "image-gallery")}
            </Label>
            <RangeControl
              value={slideSpeed}
              onChange={(val) => setAttributes({ slideSpeed: val })}
              min={0}
              max={10}
              step={0.01}
              beforeIcon="slides"
            />

            <SelectControl
              className="mt20"
              label={__("Aspect Ratio", "image-gallery")}
              value={aspectRatio}
              options={[
                { label: __("Original (Custom Height)", "image-gallery"), value: "original" },
                { label: __("Square (1:1)", "image-gallery"), value: "1 / 1" },
                { label: __("Standard (4:3)", "image-gallery"), value: "4 / 3" },
                { label: __("Widescreen (16:9)", "image-gallery"), value: "16 / 9" },
                { label: __("Classic Photo (3:2)", "image-gallery"), value: "3 / 2" },
                { label: __("Portrait (9:16)", "image-gallery"), value: "9 / 16" },
              ]}
              onChange={(val) => setAttributes({ aspectRatio: val })}
            />

            {aspectRatio !== "original" && (
              <SelectControl
                className="mt10"
                label={__("Thumbnail Object Fit", "image-gallery")}
                value={objectFit}
                options={[
                  { label: __("Cover (Crop to fill)", "image-gallery"), value: "cover" },
                  { label: __("Contain (Fit inside)", "image-gallery"), value: "contain" },
                  { label: __("Fill (Stretch)", "image-gallery"), value: "fill" },
                ]}
                onChange={(val) => setAttributes({ objectFit: val })}
              />
            )}

            {(!aspectRatio || aspectRatio === "original") && (
              <UnitControl
                className="mt20"
                label={__("Item Height:", "image-gallery")}
                labelPosition="left"
                value={itemHeight}
                onChange={(val) => setAttributes({ itemHeight: val })}
                units={[pxUnit(), perUnit(), emUnit()]}
              />
            )}
          </PanelBody>

          <PanelBody
            className="bPlPanelBody"
            title={__("Layout Settings", "image-gallery")}
            initialOpen={false}>
            <PanelRow>
              <Label className="mb5">{__("Columns:", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <RangeControl
              value={columns?.[device]}
              onChange={(val) => {
                setAttributes({
                  columns: { ...columns, [device]: val },
                });
              }}
              min={1}
              max={6}
              step={1}
              beforeIcon="grid-view"
            />

            <UnitControl
              className="mt20"
              label={__("Column Gap:", "image-gallery")}
              labelPosition="left"
              value={columnGap}
              onChange={(val) => setAttributes({ columnGap: val })}
              units={[pxUnit(), perUnit(), emUnit()]}
            />

            <UnitControl
              className="mt20"
              label={__("Row Gap:", "image-gallery")}
              labelPosition="left"
              value={rowGap}
              onChange={(val) => setAttributes({ rowGap: val })}
              units={[pxUnit(), perUnit(), emUnit()]}
            />
          </PanelBody>
        </>
      )}

      {(styleSl === "styleDefault" || styleSl === "styleOne") && (
        <>
          <PanelBody
            className="bPlPanelBody"
            title={__("Advanced Settings", "image-gallery")}
            initialOpen={false}>
            <ToggleControl
              label={__("Disable Right Click", "image-gallery")}
              checked={disableRightClick}
              onChange={(val) => setAttributes({ disableRightClick: val })}
              help={__(
                "Prevent visitors from downloading images via right-click.",
                "image-gallery",
              )}
            />
            <ToggleControl
              label={__("Enable Lightbox Popup", "image-gallery")}
              checked={enableLightbox}
              onChange={(val) => setAttributes({ enableLightbox: val })}
            />
            {enableLightbox && (
              <>
                <ToggleControl
                  label={__("Show Lightbox Image Counter", "image-gallery")}
                  checked={showLightboxCounter}
                  onChange={(val) => setAttributes({ showLightboxCounter: val })}
                  help={__(
                    "Display current image index and total count (e.g. 1 / 10).",
                    "image-gallery"
                  )}
                />
                <ToggleControl
                  label={__("Show Lightbox Fullscreen Button", "image-gallery")}
                  checked={showLightboxFullscreen}
                  onChange={(val) => setAttributes({ showLightboxFullscreen: val })}
                  help={__(
                    "Allow visitors to expand the image popup to full screen.",
                    "image-gallery"
                  )}
                />
                <ToggleControl
                  label={__("Show Lightbox Download Button", "image-gallery")}
                  checked={showLightboxDownload}
                  onChange={(val) => setAttributes({ showLightboxDownload: val })}
                  help={__(
                    "Allow visitors to download the full-resolution image.",
                    "image-gallery"
                  )}
                />
                <ToggleControl
                  label={__("Show Lightbox Share / Copy Link Button", "image-gallery")}
                  checked={showLightboxShare}
                  onChange={(val) => setAttributes({ showLightboxShare: val })}
                  help={__(
                    "Allow visitors to share or copy the direct image link.",
                    "image-gallery"
                  )}
                />
              </>
            )}
            <ToggleControl
              label={__("Enable Load More", "image-gallery")}
              checked={enableLoadMore}
              onChange={(val) => setAttributes({ enableLoadMore: val })}
              help={__(
                "Improve performance by loading a limited number of images initially.",
                "image-gallery",
              )}
            />
            {enableLoadMore && (
              <>
                <RangeControl
                  label={__("Images Per Load", "image-gallery")}
                  value={imagesPerLoad}
                  onChange={(val) => setAttributes({ imagesPerLoad: val })}
                  min={1}
                  max={50}
                />
                <TextControl
                  label={__("Load More Button Text", "image-gallery")}
                  value={loadMoreBtnText}
                  onChange={(val) => setAttributes({ loadMoreBtnText: val })}
                />
                <div style={{ marginTop: "15px" }}>
                  <ColorsControl
                    label={__("Button Colors:", "image-gallery")}
                    value={loadMoreBtnColors}
                    onChange={(val) =>
                      setAttributes({ loadMoreBtnColors: val })
                    }
                    defaults={{
                      color: "#ffffff",
                      bgType: "solid",
                      bg: "#146ef5",
                    }}
                  />
                </div>
                <RangeControl
                  label={__("Button Font Size", "image-gallery")}
                  value={loadMoreBtnTypo?.fontSize}
                  onChange={(val) =>
                    setAttributes({
                      loadMoreBtnTypo: { ...loadMoreBtnTypo, fontSize: val },
                    })
                  }
                  min={10}
                  max={50}
                />
                <RangeControl
                  label={__("Button Border Radius", "image-gallery")}
                  value={loadMoreBtnTypo?.borderRadius}
                  onChange={(val) =>
                    setAttributes({
                      loadMoreBtnTypo: {
                        ...loadMoreBtnTypo,
                        borderRadius: val,
                      },
                    })
                  }
                  min={0}
                  max={100}
                />
              </>
            )}
          </PanelBody>

          <PanelBody
            className="bPlPanelBody"
            title={__("Albums & Filter Bar", "image-gallery")}
            initialOpen={false}>
            <ToggleControl
              label={__("Enable Filter Bar", "image-gallery")}
              checked={filter?.display || false}
              onChange={(display) =>
                setAttributes({ filter: { ...filter, display } })
              }
            />

            {filter?.display && (
              <>
                <TextControl
                  label={__('"All" Button Text', "image-gallery")}
                  value={filter?.allText || "All"}
                  onChange={(allText) =>
                    setAttributes({ filter: { ...filter, allText } })
                  }
                />
                <SelectControl
                  label={__("Filter Alignment", "image-gallery")}
                  value={filter?.align || "center"}
                  options={[
                    { label: __("Left", "image-gallery"), value: "left" },
                    { label: __("Center", "image-gallery"), value: "center" },
                    { label: __("Right", "image-gallery"), value: "right" },
                  ]}
                  onChange={(align) =>
                    setAttributes({ filter: { ...filter, align } })
                  }
                />
              </>
            )}

            <div className="ig-album-manager">
              <Label className="mb5">
                {__("Manage Albums / Categories:", "image-gallery")}
              </Label>
              <div className="ig-album-add-row">
                <TextControl
                  placeholder={__("New album name...", "image-gallery")}
                  value={newAlbumName}
                  onChange={setNewAlbumName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAlbum();
                    }
                  }}
                />
                <Button isPrimary onClick={addAlbum}>
                  {__("Add", "image-gallery")}
                </Button>
              </div>

              {albums?.length > 0 && (
                <div className="ig-album-chips">
                  {albums.map((alb, i) => (
                    <span key={i} className="ig-album-chip">
                      {alb}
                      <Button
                        className="ig-album-remove"
                        onClick={() => removeAlbum(i)}
                        label={__("Delete album", "image-gallery")}>
                        <Dashicon icon="no" size={14} />
                      </Button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </PanelBody>

          <PanelBody
            className="bPlPanelBody"
            title={__("Watermark", "image-gallery")}
            initialOpen={false}>
            <ToggleControl
              label={__("Enable Watermark", "image-gallery")}
              checked={watermark?.enable || false}
              onChange={(enable) =>
                setAttributes({ watermark: { ...watermark, enable } })
              }
            />

            {watermark?.enable && (
              <>
                <SelectControl
                  label={__("Watermark Type", "image-gallery")}
                  value={watermark?.type || "text"}
                  options={[
                    { label: __("Text", "image-gallery"), value: "text" },
                    {
                      label: __("Image / Logo", "image-gallery"),
                      value: "image",
                    },
                  ]}
                  onChange={(type) =>
                    setAttributes({ watermark: { ...watermark, type } })
                  }
                />

                {watermark?.type === "image" ? (
                  <InlineMediaUpload
                    label={__("Watermark Logo", "image-gallery")}
                    value={watermark?.image || ""}
                    types={["image"]}
                    onChange={(image) =>
                      setAttributes({ watermark: { ...watermark, image } })
                    }
                  />
                ) : (
                  <>
                    <TextControl
                      label={__("Watermark Text", "image-gallery")}
                      value={watermark?.text || ""}
                      onChange={(text) =>
                        setAttributes({ watermark: { ...watermark, text } })
                      }
                    />

                    <RangeControl
                      label={__("Font Size (px)", "image-gallery")}
                      value={watermark?.fontSize || 14}
                      onChange={(fontSize) =>
                        setAttributes({ watermark: { ...watermark, fontSize } })
                      }
                      min={10}
                      max={48}
                    />

                    <ColorsControl
                      label={__("Text Color", "image-gallery")}
                      value={{ color: watermark?.color || "#ffffff" }}
                      onChange={(col) =>
                        setAttributes({
                          watermark: {
                            ...watermark,
                            color: col?.color || "#ffffff",
                          },
                        })
                      }
                    />
                  </>
                )}

                <SelectControl
                  label={__("Position", "image-gallery")}
                  value={watermark?.position || "bottom-right"}
                  options={[
                    {
                      label: __("Bottom Right", "image-gallery"),
                      value: "bottom-right",
                    },
                    {
                      label: __("Bottom Left", "image-gallery"),
                      value: "bottom-left",
                    },
                    {
                      label: __("Top Right", "image-gallery"),
                      value: "top-right",
                    },
                    {
                      label: __("Top Left", "image-gallery"),
                      value: "top-left",
                    },
                    {
                      label: __("Center", "image-gallery"),
                      value: "center",
                    },
                  ]}
                  onChange={(position) =>
                    setAttributes({ watermark: { ...watermark, position } })
                  }
                />

                <RangeControl
                  label={__("Opacity", "image-gallery")}
                  value={
                    watermark?.opacity !== undefined ? watermark.opacity : 0.7
                  }
                  onChange={(opacity) =>
                    setAttributes({ watermark: { ...watermark, opacity } })
                  }
                  min={0.1}
                  max={1}
                  step={0.05}
                />

                <SelectControl
                  label={__("Apply On", "image-gallery")}
                  value={watermark?.applyOn || "both"}
                  options={[
                    {
                      label: __("Both Gallery & Lightbox", "image-gallery"),
                      value: "both",
                    },
                    {
                      label: __("Gallery Cards Only", "image-gallery"),
                      value: "gallery",
                    },
                    {
                      label: __("Lightbox Popup Only", "image-gallery"),
                      value: "popup",
                    },
                  ]}
                  onChange={(applyOn) =>
                    setAttributes({ watermark: { ...watermark, applyOn } })
                  }
                />
              </>
            )}
          </PanelBody>
        </>
      )}
    </>
  );
};

export default General;
