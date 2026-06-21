/**
 * Attribute Migration Utilities
 * Centralized functions for migrating block attributes
 */

/**
 * Default card attributes for styleOne
 */
export const DEFAULT_CARD_ATTRIBUTES = {
  width: {
    desktop: "18rem",
    tablet: "18rem",
    mobile: "18rem",
  },
  height: {
    desktop: "250px",
    tablet: "250px",
    mobile: "250px",
  },
  gap: {
    desktop: "2rem",
    tablet: "2rem",
    mobile: "2rem",
  },
};

/**
 * Migrate attributes for styleOne blocks
 * Adds missing card attributes with defaults
 * 
 * @param {Object} attributes - Block attributes
 * @returns {Object} - Migrated attributes
 */
export const migrateStyleOneAttributes = (attributes) => {
  const { styles = {}, styleSl } = attributes;

  // Only migrate styleOne blocks
  if (styleSl !== "styleOne") {
    return attributes;
  }

  const updatedStyles = { ...styles };
  let needsUpdate = false;

  // Ensure card object exists
  if (!updatedStyles.card) {
    updatedStyles.card = {};
    needsUpdate = true;
  }

  // Migrate each card attribute
  Object.keys(DEFAULT_CARD_ATTRIBUTES).forEach((key) => {
    if (!updatedStyles.card[key]) {
      updatedStyles.card[key] = DEFAULT_CARD_ATTRIBUTES[key];
      needsUpdate = true;
    }
  });

  return needsUpdate ? { ...attributes, styles: updatedStyles } : attributes;
};

/**
 * Check if attributes need migration
 * 
 * @param {Object} attributes - Block attributes
 * @returns {boolean} - True if migration needed
 */
export const needsMigration = (attributes) => {
  const { styles = {}, styleSl } = attributes;

  if (styleSl !== "styleOne") {
    return false;
  }

  if (!styles.card) {
    return true;
  }

  return Object.keys(DEFAULT_CARD_ATTRIBUTES).some(
    (key) => !styles.card[key]
  );
};
