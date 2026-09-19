import React from "react";
import { __ } from "@wordpress/i18n";

const ImageFilter = ({
  albums = [],
  filter = {},
  activeAlbum = "*",
  setActiveAlbum,
}) => {
  if (!filter?.display || !Array.isArray(albums) || albums.length === 0) {
    return null;
  }

  const { allText = __("All", "image-gallery"), align = "center", margin = {} } =
    filter;

  return (
    <div
      className="igFilterBar"
      style={{
        textAlign: align,
        marginBottom: margin?.bottom || "25px",
      }}
    >
      <button
        type="button"
        className={`igFilterBtn ${activeAlbum === "*" ? "active" : ""}`}
        onClick={() => setActiveAlbum("*")}
        aria-pressed={activeAlbum === "*"}
      >
        {allText}
      </button>
      {albums.map((album, index) => {
        if (!album || !album.trim()) return null;
        const isCurrent = activeAlbum === album;
        return (
          <button
            key={index}
            type="button"
            className={`igFilterBtn ${isCurrent ? "active" : ""}`}
            onClick={() => setActiveAlbum(album)}
            aria-pressed={isCurrent}
          >
            {album}
          </button>
        );
      })}
    </div>
  );
};

export default ImageFilter;
