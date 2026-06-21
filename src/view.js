import { createRoot } from "react-dom/client";
import "./style.scss";
import Style from "./Components/Common/Style";
import Gallery from "./Components/Common/Gallery";
import PolaroidImageGallary from "./Components/Common/PolaroidImageGallery/PolaroidImageGallary";

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
      // console.error("Failed to parse data-attributes JSON", e);
      return e;
    }

    const { cId, gallery, slideSpeed, columns, styleSl } = attributes;

    createRoot(imageGallery).render(
      <>
        <Style attributes={attributes} clientId={cId} />

        {styleSl === "styleDefault" && (
          <div className={`bigbImageGallery ${styleSl}`}>
            <Gallery
              gallery={gallery}
              slideSpeed={slideSpeed}
              columns={columns}
            />
          </div>
        )}

        {styleSl === "styleOne" && (
          <PolaroidImageGallary attributes={attributes} />
        )}
      </>,
    );

    imageGallery?.removeAttribute("data-attributes");
  });
});
