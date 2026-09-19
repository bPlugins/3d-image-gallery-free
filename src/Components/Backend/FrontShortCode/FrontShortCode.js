import { useRef } from "react";
import { __ } from "@wordpress/i18n";

import "./FrontShortCode.scss";

const FrontShortCode = ({ shortCode }) => {
  const inputRef = useRef(null);
  const tooltip = useRef(null);

  const handleCopyShortCode = () => {
    const input = inputRef.current;
    if (input) {
      input.select();
      navigator.clipboard.writeText(shortCode).then(() => {
        if (tooltip.current) {
          tooltip.current.innerHTML = __(
            "Copied Successfully!",
            "image-gallery",
          );
          setTimeout(() => {
            if (tooltip.current) {
              tooltip.current.innerHTML = __(
                "Copy To Clipboard",
                "image-gallery",
              );
            }
          }, 1500);
        }
      });
    }
  };

  return (
    <div className="igb-shortcode-bar">
      <div className="igb-shortcode-input-group">
        <input ref={inputRef} readOnly value={shortCode} />
        <button
          type="button"
          onClick={handleCopyShortCode}
          className="igb-copy-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span ref={tooltip} className="igb-tooltip">
            {__("Copy To Clipboard", "image-gallery")}
          </span>
        </button>
      </div>
      <span className="igb-shortcode-label">
        {__("Copy the shortcode and use it anywhere.", "image-gallery")}
      </span>
    </div>
  );
};
export default FrontShortCode;
