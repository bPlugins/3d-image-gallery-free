import {
  __experimentalInputControl as InputControl,
  TextareaControl,
  __experimentalNumberControl as NumberControl,
  PanelRow,
  __experimentalUnitControl as UnitControl,
  TextControl,
  SelectControl,
  RangeControl,
  CheckboxControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { produce } from "immer";
import {
  Device,
  InlineMediaUpload,
  Label,
} from "../../../../../../bpl-tools/Components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { format } from "date-fns";
import { BControlPro } from "../../../../../../bpl-tools/ProControls";

const GalleryPanel = ({
  styleSl,
  attributes,
  setAttributes,
  arrKey,
  index,
  setActiveIndex = false,
  device,
  premiumProps,
}) => {
  const items = attributes[arrKey] || [];
  const item = items[index] || {};

  const isFreeStyle = ["styleDefault", "styleOne"].includes(styleSl);
  const InlineMediaComponent = isFreeStyle ? InlineMediaUpload : BControlPro;
  const InputControlComponent = isFreeStyle ? InputControl : BControlPro;
  const TextareaControlComponent = isFreeStyle ? TextareaControl : BControlPro;

  const [startDate, setStartDate] = useState(() => {
    const existingDate = new Date(item?.date);
    return !isNaN(existingDate.getTime()) ? existingDate : new Date();
  });
  const [dateFormat, setDateFormat] = useState(attributes?.globalDateFormat || "MM-dd-yyyy");

  const updateGalleryItems = (property, val, childProperty = null) => {
    const items = attributes[arrKey];
    if (!items?.[index]) return;

    const newItems = produce(items, (draft) => {
      if (childProperty !== null) {
        if (!draft[index][property]) draft[index][property] = {};
        draft[index][property][childProperty] = val;
      } else {
        draft[index][property] = val;
      }
    });

    setAttributes({ [arrKey]: newItems });
    if (setActiveIndex) setActiveIndex(index);
  };

  // Available format options
  const formatOptions = [
    { value: "MM-dd-yyyy", label: "MM-DD-YYYY" },
    { value: "yyyy-MM-dd", label: "YYYY-MM-DD" },
    { value: "dd/MM/yyyy", label: "DD/MM/YYYY" },
    { value: "MMMM d, yyyy ", label: "Month D, YYYY" },
  ];

  // Handle format change
  const handleFormatChange = (newFormat) => {
    setDateFormat(newFormat);
    try {
      updateGalleryItems("date", format(startDate, newFormat));
    } catch (e) {
      updateGalleryItems("date", startDate.toISOString());
    }
  };



  const updateImagePos = (index, newX, newY) => {
    const updatedImages = items.map((img, i) =>
      i === index ? { ...img, pos: `${newX}% ${newY}%` } : img
    );
    setAttributes({ images: updatedImages });
  };

  const [x = "50%", y = "50%"] = (items[index]?.pos || "50% 50%").split(" ");

  return (
    <div>
      <InlineMediaComponent
        label={__("Image", "image-gallery")}
        value={items[index]?.url}
        onChange={(image) => updateGalleryItems("url", image)}
        type="image"
        size="full"
        Component={InlineMediaUpload}
        {...premiumProps}
      />

      <div style={{ marginTop: "20px" }}></div>

      {styleSl === "styleFour" && (
        <>
          <BControlPro
            label={__("Background", "image-gallery")}
            value={item?.background || ""}
            onChange={(image) => updateGalleryItems("background", image)}
            type="image"
            size="full"
            Component={InlineMediaUpload}
            {...premiumProps}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {(styleSl === "styleOne" ||
        styleSl === "styleTwo" ||
        styleSl === "styleThree" ||
        styleSl === "styleFour" ||
        styleSl === "styleFive") && (
        <>
          <InputControlComponent
            type="text"
            label={__("Title", "image-gallery")}
            value={items[index]?.title}
            onChange={(title) => updateGalleryItems("title", title)}
            Component={InputControl}
            {...premiumProps}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {styleSl === "styleSix" && (
        <>
          <BControlPro
            label={__("Horizontal Position", "image-gallery")}
            min={0}
            max={100}
            value={parseInt(x)}
            onChange={(newX) => updateImagePos(index, newX, parseInt(y))}
            Component={RangeControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Vertical Position", "image-gallery")}
            min={0}
            max={100}
            value={parseInt(y)}
            onChange={(newY) => updateImagePos(index, parseInt(x), newY)}
            Component={RangeControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Image Link", "image-gallery")}
            value={items[index]?.link || ""}
            onChange={(val) => updateGalleryItems("link", val)}
            Component={TextControl}
            {...premiumProps}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {(styleSl === "styleOne" ||
        styleSl === "styleTwo" ||
        styleSl === "styleThree") && (
        <>
          <TextareaControlComponent
            type="text"
            label={__("Subtitle", "image-gallery")}
            value={items[index]?.description}
            onChange={(description) =>
              updateGalleryItems("description", description)
            }
            cols={10}
            rows={2}
            Component={TextareaControl}
            {...premiumProps}
          />
          <div style={{ marginTop: "20px" }}></div>
          <TextControl
            label={__("Custom Link", "image-gallery")}
            value={items[index]?.link || ""}
            onChange={(link) => updateGalleryItems("link", link)}
            help={__("If provided, clicking this item will open the link.", "image-gallery")}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {styleSl === "styleTwo" && (
        <>
          <PanelRow>
            <Label className="">{__("Image Width", "image-gallery")}</Label>
            <Device />
          </PanelRow>
          <BControlPro
            value={items[index]?.width?.[device]}
            onChange={(width) => updateGalleryItems("width", width, device)}
            Component={NumberControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <PanelRow>
            <Label className="">{__("Image Height", "image-gallery")}</Label>
            <Device />
          </PanelRow>
          <BControlPro
            value={items[index]?.height?.[device]}
            onChange={(height) => updateGalleryItems("height", height, device)}
            Component={NumberControl}
            {...premiumProps}
          />
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {/* Dropdown to select date format */}
      {styleSl === "styleOne" && (
        <>
          {(attributes?.showDate ?? premiumProps?.rootAttributes?.imagesData?.showDate) && (
            <div className="ig-item-date-section">
              <SelectControl
                label={__("Date Format", "image-gallery")}
                id={`format-select-${index}`}
                value={dateFormat}
                options={formatOptions}
                onChange={handleFormatChange}
              />
              
              <div style={{ marginTop: "10px" }}>
                <Label className="mb5">{__("Item Date:", "image-gallery")}</Label>
                <div style={{ width: "100%", marginTop: "4px" }}>
                  <DatePicker
                    className="ig-datepicker-input"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      try {
                        updateGalleryItems("date", format(date, dateFormat));
                      } catch (e) {
                        updateGalleryItems("date", date.toISOString());
                      }
                    }}
                    dateFormat={dateFormat}
                  />
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: "20px" }}></div>

          {premiumProps?.rootAttributes?.albums?.length > 0 && (
            <div className="ig-item-albums">
              <Label className="mb5">
                {__("Assign to Albums:", "image-gallery")}
              </Label>
              <div className="ig-item-album-list">
                {premiumProps.rootAttributes.albums.map((albumName) => {
                  const currentAlbs = Array.isArray(item?.albs) ? item.albs : [];
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
                        updateGalleryItems("albs", nextAlbs);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: "20px" }}></div>

      {styleSl === "styleFour" && (
        <>
          <BControlPro
            label={__("Image Top", "image-gallery")}
            value={item?.top || ""}
            onChange={(top) => updateGalleryItems("top", top)}
            isUnitSelectTabbable={true}
            allowEmpty={true}
            step={1}
            Component={UnitControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Image Left", "image-gallery")}
            value={item?.left || ""}
            onChange={(left) => updateGalleryItems("left", left)}
            isUnitSelectTabbable={true}
            allowEmpty={true}
            step={1}
            Component={UnitControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Image Right", "image-gallery")}
            value={item?.right || ""}
            onChange={(right) => updateGalleryItems("right", right)}
            isUnitSelectTabbable={true}
            allowEmpty={true}
            step={1}
            Component={UnitControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Image Height", "image-gallery")}
            value={item?.height || ""}
            onChange={(height) => updateGalleryItems("height", height)}
            isUnitSelectTabbable={true}
            allowEmpty={true}
            step={1}
            Component={UnitControl}
            {...premiumProps}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BControlPro
            label={__("Image Width", "image-gallery")}
            value={item?.width || ""}
            onChange={(width) => updateGalleryItems("width", width)}
            isUnitSelectTabbable={true}
            allowEmpty={true}
            step={1}
            Component={UnitControl}
            {...premiumProps}
          />
        </>
      )}
    </div>
  );
};

export default GalleryPanel;
