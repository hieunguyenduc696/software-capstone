import { IEnvironment } from "types/common/env";

const defaultConfig = require(`./config.development`).default;

const appConfig = {
  ...defaultConfig,
} as IEnvironment;

export { appConfig };
