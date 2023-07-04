const { JSDOM } = require("jsdom");
const Handlebars = require("handlebars");
const fs = require("fs");

const { window } = new JSDOM('<div id="app"></div>', {
  url: "http://localhost:3000",
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.XMLHttpRequest = window.XMLHttpRequest;
global.FormData = window.FormData;

require.extensions[".hbs"] = function (module, filename) {
  const contents = fs.readFileSync(filename, "utf-8");

  module.exports = Handlebars.compile(contents);
};
require.extensions[".pscss"] = function () {
  module.exports = () => ({});
};
