import {
  __experimentalInputControl as InputControl,
  TextareaControl,
  __experimentalNumberControl as NumberControl,
  PanelRow,
  ToggleControl,
  __experimentalSpacer as Spacer,
  __experimentalUnitControl as UnitControl,
  TextControl,
  RangeControl,
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
import { useEffect, useMemo, useState } from "react";
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

  const [startDate, setStartDate] = useState(new Date());
  const [dateFormat, setDateFormat] = useState("MM-dd-yyyy");

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
    {
      value: "MM-dd-yyyy",
      label: "MM-DD-YYYY",
    },
    {
      value: "yyyy-MM-dd",
      label: "YYYY-MM-DD",
    },
    {
      value: "dd/MM/yyyy",
      label: "DD/MM/YYYY",
    },
    {
      value: "MMMM d, yyyy ",
      label: "Month D, YYYY",
    },
  ];

  // Handle format change
  const handleFormatChange = (event) => {
    setDateFormat(event.target.value);
  };

  const formattedDate = useMemo(() => {
    try {
      return format(startDate, dateFormat);
    } catch (error) {
      return "Invalid date";
    }
  }, [startDate, dateFormat]);

  useEffect(() => {
    updateGalleryItems("date", formattedDate);
  }, [formattedDate]);

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
          <ToggleControl
            label={__("Show Date", "image-gallery")}
            checked={attributes?.showDate}
            onChange={(showDate) => {
              setAttributes({ showDate });
            }}
          />

          <Spacer />

          {attributes?.showDate && (
            <>
              <label htmlFor="format-select">Select Date Format</label>
              <select
                style={{ marginTop: "8px", width: "100%" }}
                id="format-select"
                value={dateFormat}
                onChange={handleFormatChange}
              >
                {formatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <Spacer />

              <div style={{ width: "100%" }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat={dateFormat}
                />
              </div>
            </>
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
