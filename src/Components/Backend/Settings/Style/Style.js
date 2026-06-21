import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  __experimentalNumberControl as NumberControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import {
  Background,
  BoxControl,
  ColorControl,
  Device,
  Label,
  ShadowControl,
  Typography,
} from "../../../../../../bpl-tools/Components";

import { updateData } from "../../../../../../bpl-tools/utils/functions";
import CustomShadowControl from "../../../../utils/functions";

const Style = ({ setAttributes, attributes, device }) => {
  const { styles } = attributes;
  const {
    title,
    description,
    container,
    columns,
    shadow,
    hoverShadow,
    date,
    modal,
    card,
  } = styles || {};

  const {
    background,
    shadow: galleryShadow,
    hoverShadow: galleryHoverShadow,
    titleTypo,
    subtitleTypo,
    styleSl,
  } = attributes;

  return (
    <>
      {styleSl === "styleDefault" && (
        <>
          <PanelBody
            className="bPlPanelBody"
            title={__("Gallery", "image-gallery")}
            initialOpen={true}>
              <Background
                value={background}
                onChange={(val) => setAttributes({ background: val })}
                defaults={{
                  type: "gradient",
                  gradient: "linear-gradient(#ff5f6d, #ffc371)",
                }}
                isImage={false}
              />

              <CustomShadowControl
                label={__("Shadow", "image-gallery")}
                value={galleryShadow}
                onChange={(val) => setAttributes({ shadow: val })}
                defaults={[
                  {
                    vOffset: "4px",
                    blur: "4px",
                    spreed: "0px",
                    color: "#000a1459",
                  },
                ]}
              />

              <CustomShadowControl
                label={__("Hover Shadow", "image-gallery")}
                value={galleryHoverShadow}
                onChange={(val) => setAttributes({ hoverShadow: val })}
                defaults={{
                  vOffset: "12px",
                  blur: "20px",
                  spreed: "-12px",
                  color: "#000a14cc",
                }}
              />
            </PanelBody>

            <PanelBody
              className="bPlPanelBody"
              title={__("Title & Subtitle", "image-gallery")}
              initialOpen={false}>
              <Typography
                label={__("Title Typography", "image-gallery")}
                value={titleTypo}
                onChange={(val) => setAttributes({ titleTypo: val })}
                defaults={{
                  fontSize: { desktop: 48, tablet: 40, mobile: 32 },
                }}
              />

              <Typography
                label={__("Subtitle Typography", "image-gallery")}
                value={subtitleTypo}
                onChange={(val) => setAttributes({ subtitleTypo: val })}
                defaults={{
                  fontSize: { desktop: 20, tablet: 18, mobile: 16 },
                }}
              />
            </PanelBody>
          </>
        )}

        {styleSl === "styleOne" && (
          <>
            <PanelBody
              className="bPlPanelBody"
              title={__("Gallery", "image-gallery")}
              initialOpen={true}>
              <PanelRow>
                <Label className="">{__("Cards Width", "image-gallery")}</Label>
                <Device />
              </PanelRow>
            <UnitControl
              value={card?.width?.[device]}
              onChange={(value) => {
                setAttributes({
                  styles: updateData(styles, value, "card", "width", device),
                });
              }}
              min={0}
              max={1000}
              step={1}
              allowReset
              resetFallbackValue={100}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">{__("Images Height", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <UnitControl
              value={card?.height?.[device]}
              onChange={(value) => {
                setAttributes({
                  styles: updateData(styles, value, "card", "height", device),
                });
              }}
              min={0}
              max={1000}
              step={1}
              allowReset
              resetFallbackValue={100}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">{__("Cards Gap", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <UnitControl
              value={card?.gap?.[device]}
              onChange={(value) => {
                setAttributes({
                  styles: updateData(styles, value, "card", "gap", device),
                });
              }}
              min={0}
              max={1000}
              step={1}
              allowReset
              resetFallbackValue={10}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">{__("Columns", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <NumberControl
              style={{ width: "100%" }}
              id="columns-select"
              value={columns?.[device]}
              onChange={(columns) => {
                setAttributes({
                  styles: updateData(styles, columns, "columns", device),
                });
              }}
              min={1}
              max={12}
              step={1}
            />

            <div style={{ marginTop: "20px" }}></div>

            <Typography
              label={__("Title Typography", "image-gallery")}
              value={title?.typography}
              onChange={(newTypo) => {
                setAttributes({
                  styles: updateData(styles, newTypo, "title", "typography"),
                });
              }}
              defaultTypo={title?.typography}
            />

            <div style={{ marginTop: "20px" }}></div>

            <ColorControl
              label={__("Title Color", "image-gallery")}
              value={title?.color}
              onChange={(newColor) => {
                setAttributes({
                  styles: updateData(styles, newColor, "title", "color"),
                });
              }}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">{__("Title Margin", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <BoxControl
              values={title?.margin?.[device]}
              onChange={(values) =>
                setAttributes({
                  styles: updateData(styles, values, "title", "margin", device),
                })
              }
            />

            <div style={{ marginTop: "20px" }}></div>

            <Typography
              label={__("Description Typography", "image-gallery")}
              value={description?.typography}
              onChange={(newTypo) => {
                setAttributes({
                  styles: updateData(
                    styles,
                    newTypo,
                    "description",
                    "typography"
                  ),
                });
              }}
              defaultTypo={description?.typography}
            />

            <div style={{ marginTop: "20px" }}></div>

            <ColorControl
              label={__("Description Color", "image-gallery")}
              value={description?.color}
              onChange={(newColor) => {
                setAttributes({
                  styles: updateData(styles, newColor, "description", "color"),
                });
              }}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">
                {__("Description Margin", "image-gallery")}
              </Label>
              <Device />
            </PanelRow>
            <BoxControl
              values={description?.margin?.[device]}
              onChange={(values) =>
                setAttributes({
                  styles: updateData(
                    styles,
                    values,
                    "description",
                    "margin",
                    device
                  ),
                })
              }
            />

            <div style={{ marginTop: "20px" }}></div>

            <Typography
              label={__("Date Typography", "image-gallery")}
              value={date?.typography}
              onChange={(newTypo) => {
                setAttributes({
                  styles: updateData(styles, newTypo, "date", "typography"),
                });
              }}
              defaultTypo={date?.typography}
            />

            <div style={{ marginTop: "20px" }}></div>

            <ColorControl
              label={__("Date Color", "image-gallery")}
              value={date?.color}
              onChange={(newColor) => {
                setAttributes({
                  styles: updateData(styles, newColor, "date", "color"),
                });
              }}
            />

            <div style={{ marginTop: "20px" }}></div>

            <PanelRow>
              <Label className="">{__("Date Margin", "image-gallery")}</Label>
              <Device />
            </PanelRow>
            <BoxControl
              values={date?.margin?.[device]}
              onChange={(values) =>
                setAttributes({
                  styles: updateData(styles, values, "date", "margin", device),
                })
              }
            />

            <div style={{ marginTop: "20px" }}></div>

            {/* Hover Shadow */}
            <ShadowControl
              label={__("Card Hover Shadow", "image-gallery")}
              value={hoverShadow}
              onChange={(value) => {
                setAttributes({
                  styles: updateData(styles, value, "hoverShadow"),
                });
              }}
              type="box"
              defaultValue={hoverShadow}
            />

            <div style={{ marginTop: "20px" }}></div>

            {/* Shadow control */}
            <ShadowControl
              label={__("Card Shadow", "image-gallery")}
              value={shadow}
              onChange={(value) => {
                setAttributes({
                  styles: updateData(styles, value, "shadow"),
                });
              }}
              type="box"
              defaultValue={shadow}
            />

            <div style={{ marginTop: "20px" }}></div>

            {/* Modal */}
            <Typography
              label={__("Modal Title Typography", "image-gallery")}
              value={modal?.title?.typography}
              onChange={(newTypo) => {
                setAttributes({
                  styles: updateData(
                    styles,
                    newTypo,
                    "modal",
                    "title",
                    "typography"
                  ),
                });
              }}
              defaultTypo={modal?.title?.typography}
            />

            <div style={{ marginTop: "20px" }}></div>

            <ColorControl
              label={__("Modal Title Color", "image-gallery")}
              value={modal?.title?.color}
              onChange={(newColor) => {
                setAttributes({
                  styles: updateData(
                    styles,
                    newColor,
                    "modal",
                    "title",
                    "color"
                  ),
                });
              }}
            />

            <div style={{ marginTop: "20px" }}></div>

            <Typography
              label={__("Modal Description Typography", "image-gallery")}
              value={modal?.description?.typography}
              onChange={(newTypo) => {
                setAttributes({
                  styles: updateData(
                    styles,
                    newTypo,
                    "modal",
                    "description",
                    "typography"
                  ),
                });
              }}
              defaultTypo={modal?.description?.typography}
            />

            <div style={{ marginTop: "20px" }}></div>

            <ColorControl
              label={__("Modal Description Color", "image-gallery")}
              value={modal?.description?.color}
              onChange={(newColor) => {
                setAttributes({
                  styles: updateData(
                    styles,
                    newColor,
                    "modal",
                    "description",
                    "color"
                  ),
                });
              }}
            />
            </PanelBody>
          </>
        )}

      {styleSl === "styleOne" && (
        <PanelBody
          className="bPlPanelBody"
          title={__("Container", "image-gallery")}
          initialOpen={false}>
          <PanelRow>
            <Label className="">{__("", "image-gallery")}</Label>
            <Device />
          </PanelRow>
          <Background
            value={container?.bg?.[device]}
            onChange={(value) => {
              setAttributes({
                styles: updateData(styles, value, "container", "bg", device),
              });
            }}
          />

          <div style={{ marginTop: "20px" }}></div>

          <BoxControl
            label={__("Border Radius", "image-gallery")}
            values={container?.borderRadius}
            onChange={(values) =>
              setAttributes({
                styles: updateData(styles, values, "container", "borderRadius"),
              })
            }
          />

          <div style={{ marginTop: "20px" }}></div>

          <PanelRow>
            <Label className="">{__("Margin", "image-gallery")}</Label>
            <Device />
          </PanelRow>
          <BoxControl
            values={container?.margin?.[device]}
            onChange={(values) => {
              setAttributes({
                styles: updateData(
                  styles,
                  values,
                  "container",
                  "margin",
                  device
                ),
              });
            }}
          />

          <div style={{ marginTop: "20px" }}></div>

          <PanelRow>
            <Label className="">{__("Padding", "image-gallery")}</Label>
            <Device />
          </PanelRow>
          <BoxControl
            values={container?.padding?.[device]}
            onChange={(values) => {
              setAttributes({
                styles: updateData(
                  styles,
                  values,
                  "container",
                  "padding",
                  device
                ),
              });
            }}
          />
        </PanelBody>
      )}
    </>
  );
};

export default Style;
