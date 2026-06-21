import { useState, useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { useBlockProps } from "@wordpress/block-editor";
import { tabController } from "../../../../bpl-tools/utils/functions";
import Settings from "./Settings/Settings";
import Style from "../Common/Style";
import Gallery from "../Common/Gallery";
import PolaroidImageGallary from "../Common/PolaroidImageGallery/PolaroidImageGallary";
import {
  migrateStyleOneAttributes,
  needsMigration,
} from "../../utils/attributeMigration";

const Edit = (props) => {
  const { attributes, setAttributes, clientId, isSelected, device } = props;
  const { gallery = [], slideSpeed, columns, styleSl } = attributes || {};
  const [activeIndex, setActiveIndex] = useState(null);
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

      <div {...useBlockProps({ className: "" })} id={`bigbImageGallery-${clientId}`}>
        <Style
          attributes={attributes}
          // id={`bigbImageGallery-${clientId}`}
          clientId={clientId}
        />

        {styleSl === "styleDefault" && gallery.length > 0 && (
          <div className={`bigbImageGallery ${styleSl}`} ref={bigbImageGallery}>
            <Gallery
              gallery={gallery}
              slideSpeed={slideSpeed}
              columns={columns}
              isPopup={false}
              editActiveIndex={activeIndex}
              setEditActiveIndex={setActiveIndex}
            />
          </div>
        )}

        {styleSl === "styleDefault" && gallery.length === 0 && (
          <h3 className="addGalleryFirst">
            {__("Default style requires gallery items.", "image-gallery")}
          </h3>
        )}

        {styleSl === "styleOne" && (
          <PolaroidImageGallary attributes={attributes} />
        )}
      </div>
    </>
  );
};

export default withSelect((select) => {
  const { getDeviceType } = select("core/editor");
  return {
    isEditorSidebarOpened: !!select("core/edit-post")?.isEditorSidebarOpened(),
    device: getDeviceType()?.toLowerCase(),
  };
})(Edit);
