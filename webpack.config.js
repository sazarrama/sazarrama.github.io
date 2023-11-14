// webpack.config.js
const autoprefixer = require('autoprefixer');

module.exports = {
  // other configurations...

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
