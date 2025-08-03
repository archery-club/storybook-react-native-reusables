const { getDefaultConfig } = require("expo/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// Apply Storybook configuration
module.exports = withStorybook(defaultConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  onDisabledRemoveStorybook: true,
  configPath: path.resolve(__dirname, './.rnstorybook'),
});

// Enable unstable_allowRequireContext for dynamic story imports
module.exports.transformer = {
  ...module.exports.transformer,
  unstable_allowRequireContext: true,
};
