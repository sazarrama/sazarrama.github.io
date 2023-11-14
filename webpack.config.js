const path = require('path');
const autoprefixer = require('autoprefixer');

plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
]

module.exports = {
  resolve: {
    alias: {
      // Add Bootstrap and jQuery aliases
      'bootstrap': 'bootstrap/dist/js/bootstrap.bundle.js',
      'jquery': 'jquery',
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
        ],
      },
    ],
  },
};
