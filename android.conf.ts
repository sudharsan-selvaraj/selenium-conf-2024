import { join } from "node:path";
import { config as baseConfig } from "./wdio.conf.ts";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs: ["./src/tests/**/uiautomator.spec.ts"],
  capabilities: [
    {
      // capabilities for local Appium web tests on an Android Emulator
      platformName: "Android",
      // "appium:automationName": "FlutterIntegration",
      "appium:automationName": "uiautomator2",
      "appium:orientation": "PORTRAIT",
      "appium:app":
        process.env.APP_PATH || join(process.cwd(), "app-debug.apk"),
      "appium:newCommandTimeout": 240,
      "appium:flutterServerLaunchTimeout": 3000,
      "df:recordVideo": true,
      "df:liveVideo": true,
      "df:saveDeviceLogs": true,
      "appium:intercept": true,
    },
  ] as any,
};
