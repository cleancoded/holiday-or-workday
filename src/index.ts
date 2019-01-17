const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

import Middleware from "./middleware";
import IsHoliday from "./resources/is-holiday";
import Holiday from "./resources/holiday";

process.version;

const App = {
  version,
  platformVersion,

  beforeRequest: [],

  afterResponse: [
    Middleware.HandleHttpError
  ],

  resources: {
    [Holiday.key]: Holiday
  },

  triggers: {},

  searches: {},

  creates: {
    [IsHoliday.key]: IsHoliday
  }
};

export default App;
