/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = {
  webpack: (config, env) => {
    alias({
      ...configPaths('tsconfig.paths.json'),
    })(config);

    return config;
  },
};
