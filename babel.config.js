module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@app": "./src/app",
          "@buyer": "./src/buyer",
          "@components": "./src/components",
          "@services": "./src/services",
          "@hooks": "./src/hooks",
          "@store": "./src/store",
          "@assets": "./assets",
          "@constants": "./src/constants",
          "@types": "./src/types",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
