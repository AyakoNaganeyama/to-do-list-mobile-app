import 'dotenv/config';

export default {
  expo: {
    name: "to-do-list",
    slug: "to-do-list",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    runtimeVersion: "1.1.0",
    updates: {
      url: process.env.EXPO_PUBLIC_URL,
    },
    extra: {
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      owner: process.env.EXPO_PUBLIC_OWNER,
    },
  },
};
