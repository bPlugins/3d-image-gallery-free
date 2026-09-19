import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.scss";
import Style from "./Components/Common/Style";
import Gallery from "./Components/Common/Gallery";
import PolaroidImageGallary from "./Components/Common/PolaroidImageGallery/PolaroidImageGallary";
import ImageFilter from "./Components/Common/ImageFilter";

const FrontendGallery = ({ attributes }) => {
  const [activeAlbum, setActiveAlbum] = useState("*");
  const {
    cId,
    gallery,
    slideSpeed,
    columns,
    styleSl,
    albums = [],
    filter = {},
    watermark = {},
  } = attributes;

  return (
    <>
      <Style attributes={attributes} clientId={cId} />

      {styleSl === "styleDefault" && (
        <div className={`bigbImageGallery ${styleSl}`}>
          <ImageFilter
            albums={albums}
            filter={filter}
            activeAlbum={activeAlbum}
            setActiveAlbum={setActiveAlbum}
          />
          <Gallery
            gallery={gallery}
            slideSpeed={slideSpeed}
            columns={columns}
            activeAlbum={activeAlbum}
            watermark={watermark}
            disableRightClick={attributes?.disableRightClick}
            enableLightbox={attributes?.enableLightbox}
            showLightboxCounter={attributes?.showLightboxCounter}
            showLightboxFullscreen={attributes?.showLightboxFullscreen}
            showLightboxDownload={attributes?.showLightboxDownload}
            showLightboxShare={attributes?.showLightboxShare}
            enableLoadMore={attributes?.enableLoadMore}
            imagesPerLoad={attributes?.imagesPerLoad}
            loadMoreBtnText={attributes?.loadMoreBtnText}
            loadMoreBtnColors={attributes?.loadMoreBtnColors}
            loadMoreBtnTypo={attributes?.loadMoreBtnTypo}
          />
        </div>
      )}

      {styleSl === "styleOne" && (
        <>
          <ImageFilter
            albums={albums}
            filter={filter}
            activeAlbum={activeAlbum}
            setActiveAlbum={setActiveAlbum}
          />
          <PolaroidImageGallary
            attributes={attributes}
            activeAlbum={activeAlbum}
          />
        </>
      )}
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const allImageGallery = document.querySelectorAll(
    ".wp-block-bigb-image-gallery",
  );

  allImageGallery.forEach((imageGallery) => {
    const raw = imageGallery?.dataset?.attributes;

    if (!raw || raw === "undefined") return;

    let attributes;
    try {
      attributes = JSON.parse(raw);
    } catch (e) {
      return e;
    }

    createRoot(imageGallery).render(<FrontendGallery attributes={attributes} />);

    imageGallery?.removeAttribute("data-attributes");
  });
});
