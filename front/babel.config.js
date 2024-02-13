module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env.local",
      "blacklist": null,
      "whitelist": null,
      "safe": true,
      "allowUndefined": true
    }]
  ],

};