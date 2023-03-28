import { Platform } from "react-native";

const liveHost = "https://us-central1-foodlocal-47d64.cloudfunctions.net";
const localHost = "http://localhost:5001/foodlocal-47d64/us-central1";
export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = false;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
