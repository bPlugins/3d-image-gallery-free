import React from "react";

const Watermark = ({ watermark, location = "gallery" }) => {
  if (!watermark || !watermark.enable) return null;

  const {
    type = "text",
    text = "",
    image = "",
    position = "bottom-right",
    opacity = 0.7,
    fontSize = 14,
    color = "#ffffff",
    applyOn = "both",
  } = watermark;

  // Check if watermark should display at this location
  if (applyOn === "gallery" && location === "popup") return null;
  if (applyOn === "popup" && location === "gallery") return null;

  const posClass = `igWatermark--${position}`;
  const style = {
    opacity: Number(opacity) || 0.7,
  };

  if (type === "image" && image) {
    return (
      <div className={`igWatermark igWatermark--image ${posClass}`} style={style}>
        <img src={image} alt="Watermark" />
      </div>
    );
  }

  if (text) {
    return (
      <div
        className={`igWatermark igWatermark--text ${posClass}`}
        style={{
          ...style,
          fontSize: `${fontSize || 14}px`,
          color: color || "#ffffff",
        }}
      >
        <span>{text}</span>
      </div>
    );
  }

  return null;
};

export default Watermark;
