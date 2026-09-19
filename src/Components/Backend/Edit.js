import { useState, useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { Placeholder, Button } from "@wordpress/components";
import { tabController } from "../../../../bpl-tools/utils/functions";
import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import Gallery from "../Common/Gallery";
import PolaroidImageGallary from "../Common/PolaroidImageGallery/PolaroidImageGallary";
import ImageFilter from "../Common/ImageFilter";
import FrontShortCode from "./FrontShortCode/FrontShortCode";
import {
  migrateStyleOneAttributes,
  needsMigration,
} from "../../utils/attributeMigration";

const Edit = (props) => {
  const {
    attributes,
    setAttributes,
    clientId,
    isSelected,
    device,
    currentPostId,
    currentPostType,
  } = props;
  const { gallery = [], slideSpeed, columns, styleSl } = attributes || {};
  const isGalleryPostType = currentPostType === "image-gallery";
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeAlbum, setActiveAlbum] = useState("*");
  const bigbImageGallery = useRef(null);

  useEffect(() => {
    if (clientId) {
      setAttributes((prev) => ({ ...prev, cId: clientId.substring(0, 10) }));
    }
  }, [clientId]);

  // Migrate old blocks to new structure
  useEffect(() => {
    if (needsMigration(attributes)) {
      const migratedAttributes = migrateStyleOneAttributes(attributes);
      setAttributes(migratedAttributes);
    }
  }, []); // Run only once on mount

  useEffect(() => tabController(), [isSelected]);

  useEffect(() => {
    setActiveIndex(!isSelected || !gallery.length ? null : 0);
  }, [isSelected, gallery.length]);

  const bulkAddFromPlaceholder = (media) => {
    const items = Array.isArray(media) ? media : [media];
    if (!items.length) return;
    const newItems = items.map((item, i) => ({
      title: item?.title || `Title ${i + 1}`,
      subtitle: "",
      images: [item?.url],
      colors: { color: "#fff", bgType: "solid", bg: "#505a64d9" },
      btnColors: { color: "#fff", bgType: "solid", bg: "#000a1480" },
      albs: [],
    }));
    setAttributes({ gallery: newItems });
    setActiveIndex(0);
  };

  const addSingleFromPlaceholder = () => {
    const newItem = {
      title: "Title 1",
      subtitle: "Subtitle 1",
      images: [],
      colors: { color: "#fff", bgType: "solid", bg: "#505a64d9" },
      btnColors: { color: "#fff", bgType: "solid", bg: "#000a1480" },
      albs: [],
    };
    setAttributes({ gallery: [newItem] });
    setActiveIndex(0);
  };

  return (
    <>
      <Settings
        attributes={attributes}
        setAttributes={setAttributes}
        clientId={clientId}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        device={device}
      />

      <div
        {...useBlockProps({ className: "" })}
        id={`bigbImageGallery-${clientId}`}>
        {isGalleryPostType && (
          <FrontShortCode shortCode={`[image_gallery id=${currentPostId}]`} />
        )}

        <Style
          attributes={attributes}
          // id={`bigbImageGallery-${clientId}`}
          clientId={clientId}
        />

        {styleSl === "styleDefault" && gallery.length > 0 && (
          <div className={`bigbImageGallery ${styleSl}`} ref={bigbImageGallery}>
            <ImageFilter
              albums={attributes?.albums}
              filter={attributes?.filter}
              activeAlbum={activeAlbum}
              setActiveAlbum={setActiveAlbum}
            />
            <Gallery
              gallery={gallery}
              slideSpeed={slideSpeed}
              columns={columns}
              isPopup={false}
              editActiveIndex={activeIndex}
              setEditActiveIndex={setActiveIndex}
              activeAlbum={activeAlbum}
              watermark={attributes?.watermark}
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

        {styleSl === "styleDefault" && gallery.length === 0 && (
          <Placeholder
            icon="format-gallery"
            label={__("Image Gallery", "image-gallery")}
            instructions={__(
              "Add photos to create your gallery or bulk import from your Media Library.",
              "image-gallery"
            )}>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Button variant="primary" onClick={addSingleFromPlaceholder}>
                {__("Add New Item", "image-gallery")}
              </Button>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={bulkAddFromPlaceholder}
                  allowedTypes={["image"]}
                  multiple="add"
                  render={({ open }) => (
                    <Button variant="secondary" onClick={open}>
                      {__("Bulk Add from Media Library", "image-gallery")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </Placeholder>
        )}

        {styleSl === "styleOne" && (
          <>
            <ImageFilter
              albums={attributes?.albums}
              filter={attributes?.filter}
              activeAlbum={activeAlbum}
              setActiveAlbum={setActiveAlbum}
            />
            <PolaroidImageGallary
              attributes={attributes}
              activeAlbum={activeAlbum}
            />
          </>
        )}
      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getDeviceType, getCurrentPostId, getCurrentPostType } =
    select("core/editor");
  return {
    isEditorSidebarOpened: !!select("core/edit-post")?.isEditorSidebarOpened(),
    device: getDeviceType()?.toLowerCase(),
    currentPostId:
      getCurrentPostId() || select("core").getEditedPostAttribute("id"),
    currentPostType:
      getCurrentPostType() || select("core").getEditedPostAttribute("type"),
  };
})(Edit);
