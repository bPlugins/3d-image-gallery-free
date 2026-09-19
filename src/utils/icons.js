const iconColor = "#136EF5";

export const imageGalleryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className="ig-icon"
    style={{ fill: iconColor }}>
    <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
  </svg>
);

export const mediaHighlightsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" style={{ color: iconColor }}>
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.4" style={{ fill: "none" }} />
    <polygon points="10 8.2 16.5 12 10 15.8" style={{ fill: "currentColor" }} />
  </svg>
);
