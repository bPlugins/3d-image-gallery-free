import { registerBlockType } from "@wordpress/blocks";

import "./editor.scss";
import metadata from "./block.json";
import Edit from "./Components/Backend/Edit";
import { imageGalleryIcon } from "./utils/icons";

registerBlockType(metadata, {
  icon: imageGalleryIcon,
  edit: Edit,
  save: () => null,
});
