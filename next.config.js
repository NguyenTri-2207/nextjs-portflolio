const path = require("path");

module.exports = {
  trailingSlash: false,
  sassOptions: {
    // includePaths: [path.join(__dirname, "styles")],
  },

  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
    };
  },
};
