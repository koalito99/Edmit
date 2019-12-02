const { override, addWebpackAlias, removeModuleScopePlugin, babelInclude } = require('customize-cra')
const path = require('path')

module.exports = (config, ...rest) => {
  // TODO: fix fork-ts-checker not watching component-library changes
  // console.log("OLD CONFIG PLUGINS");
  // console.log(config.plugins[config.plugins.length - 1]);

  return override(
    removeModuleScopePlugin(),
    babelInclude([path.resolve('src'), path.resolve(__dirname, "../component-library")]),
    addWebpackAlias({
      "@edmit/component-library": path.resolve(__dirname, "../component-library")
    })
  )(config, ...rest);
}