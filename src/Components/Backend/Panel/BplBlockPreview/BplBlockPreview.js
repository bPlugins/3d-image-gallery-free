import React, { useState } from "react";
import { Button, Popover } from "@wordpress/components";
import "./style.scss";

const BPlBlockPreview = ({ options, value, onChange, premiumProps = {} }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const {
    isPremium = false,
    // setIsProModalOpen = () => {},
    proValues = [],
  } = premiumProps;

  const handleButtonClick = (blockValue, idx) => {
    // const isPro = proValues.includes(blockValue);

    // if (isPro && !isPremium) {
    //   setIsProModalOpen(true);
    //   return;
    // }

    onChange(blockValue);
    setActiveIndex(idx);
  };

  const handleMouseInteraction = (idx, isEnter) => {
    setActiveIndex(isEnter ? idx : null);
  };

  return (
    <div className="bPlBlockPreviewWrapper">
      {options?.map((theme, idx) => {
        // console.log(theme, "theme");
        const isSelected = value === theme.value;
        const isPro = proValues.includes(theme.value);

        return (
          <div key={theme.value || idx}>
            <div>
              <Button
                className={`bPl-previewBtn ${
                  isSelected ? "bPl-activeBtn" : ""
                }`}
                onClick={() => handleButtonClick(theme.value, idx)}
                onMouseEnter={() => handleMouseInteraction(idx, true)}
                onMouseLeave={() => handleMouseInteraction(idx, false)}>
                <span className="bplOpacity75">{theme.label}</span>
                {isPro && !isPremium && (
                  <span
                    className={` ${isSelected ? "activeProBtn" : "labelPro"}`}
                    // className="labelPro"
                  >
                    Pro
                  </span>
                )}
              </Button>
            </div>

            {activeIndex === idx && (
              <Popover
                style={{ cursor: "pointer" }}
                onClick={() => handleButtonClick(theme.value, idx)}>
                <div
                  onMouseEnter={() => handleMouseInteraction(idx, true)}
                  onMouseLeave={() => handleMouseInteraction(idx, false)}
                  style={{ height: theme.height, width: theme.width }}>
                  <img
                    src={theme.img}
                    alt={theme.label || "Preview"}
                    style={{
                      minHeight: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Popover>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BPlBlockPreview;
