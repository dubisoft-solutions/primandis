const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');

const distDir = path.join(__dirname, 'dist');

module.exports = {
  context: __dirname,
  entry: './src/js/main.js',
  devtool: 'source-map',
  output: {
    path: path.join(distDir, 'assets'),
    publicPath: '',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          "sass-loader",
        ],
      },
    ]
  },
  plugins: [
    new WebpackIconfontPluginNodejs({
      fontName: 'IconsFont',
      template: path.join(__dirname, 'src/font_icons/templates/_icons.njk'),
      cssPrefix: 'icon',
      svgs: path.join(__dirname, 'src/font_icons/icons/*.svg'),
      fontsOutput: path.join(distDir, 'fonts/'),
      cssOutput: path.join(__dirname, 'src/style/theme/_icons.scss'),
      cssFontPath: path.join(distDir, 'fonts/'), //"../fonts",
      htmlOutput: path.join(distDir, 'fonts/_font-preview.html'),
      jsOutput: path.join(distDir, 'fonts/fonts.js'),
      namesOutput: path.join(distDir, 'fonts/names.txt'),
      notWatchFile: true,
    }),
    new MiniCssExtractPlugin({ 
      filename: 'styles.css' 
    }),
  ]
};
