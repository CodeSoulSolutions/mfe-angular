const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'host',

  exposes: {
    './Component': './projects/host/src/app/app.component.ts',
  },

  remotes: {
    'api-demo': `http://localhost:4201/remoteEntry.js`,
    'tictactoe': `http://localhost:4202/remoteEntry.js`,
    'demo': `http://localhost:4203/remoteEntry.js`,
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
