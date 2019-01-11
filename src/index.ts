const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

import Middleware from "./middleware";
import Holiday from "./resources/holiday";

process.version;

const App = {
  version,
  platformVersion,

  beforeRequest: [],

  afterResponse: [
    Middleware.HandleHttpError
  ],

  resources: {},

  triggers: {},

  searches: {},

  creates: {
    [Holiday.key]: Holiday
  }
};

export default App;
