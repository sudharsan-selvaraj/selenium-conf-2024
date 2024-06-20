import type { Options } from "@wdio/types";

export const config: Options.Testrunner = {
  runner: "local",
  hostname: "127.0.0.1",
  port: 4723,
  path: "/wd/hub",
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: "tsconfig.json",
      transpileOnly: true,
    },
  },

  maxInstances: 1,
  capabilities: [],
  logLevel: "info",
  connectionRetryCount: 0,
  services: [["flutter-by", {}]],
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
