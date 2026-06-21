import { __ } from "@wordpress/i18n";
import { ItemsPanel } from "../../../../../../bpl-tools/Components";
import GalleryPanel from "../GalleryItemPanel/GalleryItemPanel";

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
} from "@wordpress/components";
import { produce } from "immer";

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
    columns,
    columnGap,
    rowGap,
    styleSl,
    imagesData,
  } = attributes;

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
      },
    ];
    setAttributes({ gallery: newGallery });
    setActiveIndex(newGallery.length - 1);
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

                  <div className="addItem">
                    <Button
                      label={__("Add Image", "image-gallery")}
                      onClick={() => updateGallery("images", [...images, ""])}>
                      <Dashicon icon="plus" />
                      {__("Add Image", "image-gallery")}
                    </Button>
                  </div>

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

            <div className="addItem">
              <Button
                label={__("Add New Gallery Item", "image-gallery")}
                onClick={addGalleryItem}>
                <Dashicon icon="plus" />
                {__("Add New Gallery Item", "image-gallery")}
              </Button>
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

            <UnitControl
              className="mt20"
              label={__("Item Height:", "image-gallery")}
              labelPosition="left"
              value={itemHeight}
              onChange={(val) => setAttributes({ itemHeight: val })}
              units={[pxUnit(), perUnit(), emUnit()]}
            />
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

      {/* Style One */}
      {styleSl === "styleOne" && (
        <PanelBody
          className="bPlPanelBody"
          title={__("Gallery Items", "image-gallery")}
          initialOpen={true}>
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
          />
        </PanelBody>
      )}
    </>
  );
};

export default General;
