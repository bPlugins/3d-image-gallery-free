import { useState } from "react";
import { __ } from "@wordpress/i18n";
import {
  Dropdown,
  PanelRow,
  ToggleControl,
  __experimentalUnitControl as UnitControl,
  Button,
  Dashicon,
} from "@wordpress/components";
import { produce } from "immer";

import { Label, ColorControl, BButtonGroup } from "../../../bpl-tools/Components";
import { pxUnit, emUnit, remUnit } from "../../../bpl-tools/utils/options";
import { gearIcon } from "../../../bpl-tools/utils/icons";

const CustomShadowControl = (props) => {
  const {
    className = "",
    label = __("Shadow"),
    value,
    onChange,
    type = "box",
    defaults = [],
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const defaultVal = [
    {
      hOffset: "0px",
      vOffset: "0px",
      blur: "0px",
      spreed: "0px",
      color: "#7090b0",
      isInset: false,
    },
  ];

  // 🔁 Normalize input value (object → array, array → same)
  const normalizeToArray = (input) => {
    if (Array.isArray(input)) return input;
    if (typeof input === "object" && input !== null) return [input];
    return defaultVal;
  };

  // 🔁 Normalize output for saving (array → object if only one and originally was object)
  const normalizeToOutput = (shadows) => {
    if (!Array.isArray(value)) {
      return shadows?.[0] || {};
    }
    return shadows;
  };

  const shadow = normalizeToArray(value);

  const getDefault = (property) =>
    defaults?.[activeIndex]?.[property] || defaultVal[0][property];

  const resetValue = (property) => (
    <Button
      icon="image-rotate"
      className="bPlResetVal"
      onClick={() => updateShadow(property, getDefault(property))}
    />
  );

  const updateShadow = (property, val) => {
    const newShadow = produce(shadow, (draft) => {
      draft[activeIndex][property] = val;
    });
    onChange(normalizeToOutput(newShadow));
  };

  const duplicateShadow = (e) => {
    e.preventDefault();
    const newShadow = [
      ...shadow.slice(0, activeIndex),
      { ...shadow[activeIndex] },
      ...shadow.slice(activeIndex),
    ];
    setActiveIndex(activeIndex + 1);
    onChange(normalizeToOutput(newShadow));
  };

  const removeShadow = (e) => {
    e.preventDefault();
    const newShadow = [
      ...shadow.slice(0, activeIndex),
      ...shadow.slice(activeIndex + 1),
    ];
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
    onChange(normalizeToOutput(newShadow));
  };

  const addNewShadow = () => {
    const newShadow = [...shadow, defaultVal[0]];
    onChange(normalizeToOutput(newShadow));
  };

  const {
    hOffset = "",
    vOffset = "",
    blur = "",
    spreed = "",
    color = "",
    isInset = false,
  } = shadow[activeIndex] || {};

  return (
    <PanelRow className={`bPlDropdown ${className}`}>
      <Label className="mt5">{label}</Label>

      <Dropdown
        className="bPlDropdownContainer"
        contentClassName="bPlDropdownPopover"
        popoverProps={{ placement: "bottom-end" }}
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            icon="edit"
            onClick={() => {
              onToggle();
              setActiveIndex(0);
            }}
            aria-expanded={isOpen}
          />
        )}
        renderContent={() => (
          <>
            {shadow.length > 1 && (
              <PanelRow>
                <Label>{__("Shadow:")}</Label>
                <BButtonGroup
                  value={activeIndex}
                  onChange={(val) => setActiveIndex(val)}
                  options={shadow.map((_, i) => ({
                    label: (i + 1).toString(),
                    value: i,
                  }))}
                  borderRadius="5px"
                />
              </PanelRow>
            )}

            {shadow[activeIndex] && (
              <>
                <PanelRow>
                  <UnitControl
                    label={__("Horizontal Offset:")}
                    labelPosition="left"
                    value={hOffset}
                    onChange={(val) => updateShadow("hOffset", val)}
                    units={[pxUnit(), emUnit(), remUnit()]}
                  />
                  {hOffset &&
                    hOffset !== getDefault("hOffset") &&
                    resetValue("hOffset")}
                </PanelRow>

                <PanelRow>
                  <UnitControl
                    label={__("Vertical Offset:")}
                    labelPosition="left"
                    value={vOffset}
                    onChange={(val) => updateShadow("vOffset", val)}
                    units={[pxUnit(), emUnit(), remUnit()]}
                  />
                  {vOffset &&
                    vOffset !== getDefault("vOffset") &&
                    resetValue("vOffset")}
                </PanelRow>

                <PanelRow>
                  <UnitControl
                    label={__("Blur:")}
                    labelPosition="left"
                    value={blur}
                    onChange={(val) => updateShadow("blur", val)}
                    units={[pxUnit(), emUnit(), remUnit()]}
                  />
                  {blur && blur !== getDefault("blur") && resetValue("blur")}
                </PanelRow>

                <small>{__("Blur cannot be negative value!")}</small>

                {type === "box" && (
                  <PanelRow>
                    <UnitControl
                      label={__("Spreed:")}
                      labelPosition="left"
                      value={spreed}
                      onChange={(val) => updateShadow("spreed", val)}
                      units={[pxUnit(), emUnit(), remUnit()]}
                    />
                    {spreed &&
                      spreed !== getDefault("spreed") &&
                      resetValue("spreed")}
                  </PanelRow>
                )}

                <ColorControl
                  label={__("Color:")}
                  value={color}
                  onChange={(val) => updateShadow("color", val)}
                  defaultColor={getDefault("color")}
                />

                {type === "box" && (
                  <ToggleControl
                    label={__("Shadow Inset?")}
                    checked={isInset}
                    onChange={(val) => updateShadow("isInset", val)}
                  />
                )}

                <PanelRow className="itemAction mt20">
                  {shadow.length > 1 && (
                    <Button className="removeItem" onClick={removeShadow}>
                      <Dashicon icon="no" /> {__("Remove")}
                    </Button>
                  )}

                  <Button className="duplicateItem" onClick={duplicateShadow}>
                    {gearIcon}
                    {__("Duplicate")}
                  </Button>
                </PanelRow>
              </>
            )}

            <br />
            <div className="addItem">
              <Button onClick={addNewShadow}>
                <Dashicon icon="plus" /> {__("Add New Shadow")}
              </Button>
            </div>
          </>
        )}
      />
    </PanelRow>
  );
};

export default CustomShadowControl; 
