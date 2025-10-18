// This config file is for Metro Bundler only. Do not import in app code.
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
