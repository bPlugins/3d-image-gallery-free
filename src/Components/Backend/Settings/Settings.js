import { __ } from "@wordpress/i18n";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import {
  TabPanel,
  ToolbarGroup,
  ToolbarButton,
  Dashicon,
} from "@wordpress/components";
import {
  galleryAttr,
  generalStyleTabs,
  styleItems,
  toolTipPresets,
} from "../../../utils/options";
import General from "./General/General";
import Style from "./Style/Style";
import BPlBlockPreview from "../Panel/BplBlockPreview/BplBlockPreview";

const Settings = ({
  attributes,
  setAttributes,
  activeIndex,
  setActiveIndex,
  device,
  clientId,
}) => {
  const { gallery = [], styleSl } = attributes;

  const props = {
    attributes,
    setAttributes,
    device,
    activeIndex,
    setActiveIndex,
  };

  // Add new gallery item
  const addGalleryItem = () => {
    const newGallery = [
      ...gallery,
      {
        title: `Title ${gallery.length + 1}`,
        subtitle: `Subtitle ${gallery.length + 1}`,
        images: [],
        colors: {
          color: "#fff",
          bgType: "solid",
          bg: "#505a64d9",
        },
        btnColors: {
          color: "#fff",
          bgType: "solid",
          bg: "#000a1480",
        },
      },
    ];
    setAttributes({ gallery: newGallery });
    setActiveIndex(newGallery.length - 1);
  };

  const updateStyle = (newStyle) => {
    if (newStyle === "styleDefault") {
      setAttributes({
        ...attributes,
        styleSl: newStyle,
        gallery: galleryAttr || {},
        imagesData: { images: [] },
        styles: {},
      });
    } else {
      setAttributes({
        ...attributes,
        styleSl: newStyle,
        gallery: [],
        imagesData: styleItems[newStyle]?.imagesData || { images: [] },
        styles: styleItems[newStyle]?.styles || {},
      });
    }
  };

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}>
          {(tab) => (
            <>
              {"general" === tab.name && <General {...props} />}
              {"style" === tab.name && <Style {...props} />}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <BlockControls>
        {styleSl === "styleDefault" && (
          <ToolbarGroup className="bPlToolbar">
            <ToolbarButton
              label={__("Add New Gallery Item", "image-gallery")}
              onClick={addGalleryItem}>
              <Dashicon icon="plus" />
            </ToolbarButton>
          </ToolbarGroup>
        )}

        <BPlBlockPreview
          clientId={clientId}
          value={styleSl}
          options={toolTipPresets}
          onChange={(newStyle) => updateStyle(newStyle)}
          previewHeight="auto"
          viewportWidth={1200}
        />
      </BlockControls>
    </>
  );
};

export default Settings;
