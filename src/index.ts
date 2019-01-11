const { version } = require("../package.json");
import { version as platformVersion } from "zapier-platform-core";

process.version;

const App = {
  version,
  platformVersion,

  beforeRequest: [],

  afterResponse: [],

  resources: {},

  triggers: {},

  searches: {},

  creates: {}
};

export default App;
