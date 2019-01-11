const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

import Middleware from "./middleware";

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

  creates: {}
};

export default App;
