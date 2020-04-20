const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Notifier = require("./dev_modules/webpack/Notifier");
const Manifest = require("./dev_modules/webpack/Manifest");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ImageComperssor = require("./dev_modules/webpack/ImageComperssor");
const WebpackMonitor = require("webpack-monitor");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
// const {
//    BaseHrefWebpackPlugin
// } = require('base-href-webpack-plugin');

// var f = require('ng-input-filter')
const merge = require("webpack-merge");
const targer = process.env.npm_lifecycle_event;
const common = {
  entry: {
    vendor: [
      "angular",
      "angular-messages",
      "oclazyload",
      "@uirouter/angularjs",
      "angular-resource",
      "angular-animate",
      "angular-loading-bar",
      "ng-file-upload",
      "angular-aria",
      "chart.js",
      "tc-angular-chartjs",
      "chartjs-plugin-labels",
      "angular-permission",
      "popper.js",
      "bootstrap",
      "angular-cookies",
      "angular-moment-picker",
      "./dev_modules/angularBusy/angular-busy",
      "angular-promise-buttons",
      "./dev_modules/DatePicker/ADM-dateTimePicker",
      "./dev_modules/ngTable/ng-table",
      "./scss/vendor.scss",
      "./dev_modules/angularPagination/angular-pagination.min",
      "angular1-star-rating"
    ],
    app: "./app/app.module.js"
  },
  resolve: {
    modules: [
      path.resolve("./app/shared/"),
      path.resolve("./node_modules"),
      path.resolve("./temp/sprite")
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: [/dev_modules/, /node_modules/],
        use: {
          loader: `webpack-jshint-loader`,
          options: {
            esversion: 6
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          { loader: "ng-annotate-loader" },
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "stage-0"],
              plugins: [
                [
                  "transform-runtime",
                  {
                    polyfill: false,
                    regenerator: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",

            options: {
              limit: 10 * 1024,
              fallback: "file-loader",

              // fallback options
              name: "[name].[ext]",
              outputPath: "assets/images/"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      Waves: "node-waves",
      iziToast: "iziToast",
      moment: "jalali-moment"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "assets/js/[name].js.map",
      exclude: ["vendor.js"]
    }),
    // new CleanWebpackPlugin(['dist', 'temp'], {
    //    root: __dirname,
    //    verbose: true,
    //    dry: false,
    // }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "./app/shared/constant.js"
      },
      {
        from: "./app/shared/files/employeesSampleFile.xlsx"
      }
    ]),
    new Notifier()
  ]
};

if (targer === "build") {
  module.exports = merge(common, {
    module: {
      rules: [
        {
          test: /app\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../../"
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
                minimize: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [
                  require("path").resolve(__dirname, "node_modules")
                ]
              }
            }
          ]
        },
        {
          test: /vendor\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
                minimize: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [
                  require("path").resolve(__dirname, "node_modules")
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html"
      }),
      // new BaseHrefWebpackPlugin({
      //    baseHref: '/Admin/'
      // }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ["constant.js"],
        append: false
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/[name].css"
      })
    ],
    output: {
      filename: "assets/js/[name].js",
      chunkFilename: "assets/js/[name].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      compress: false,
      port: 21001,
      historyApiFallback: true,
      stats: "errors-only",
      hot: true,
      open: true
    },
    devtool: "inline-source-map"
  });
}

if (targer === "production") {
  module.exports = merge(common, {
    output: {
      filename: "assets/js/[name].[hash].js",
      chunkFilename: "assets/js/[name].[chunkhash].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          uglifyOptions: {
            compress: {
              // inline: false,
              warnings: false, // Suppress uglification warnings
              pure_getters: true,
              unsafe: false,
              unsafe_comps: true,
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true
            },
            output: {
              comments: false
            },
            ie8: true,
            safari10: true,
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
          }
        })
      ],
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor_app",
            chunks: "all",
            minChunks: 2
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /app\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "../../"
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [
                  require("path").resolve(__dirname, "node_modules")
                ]
              }
            }
          ]
        },
        {
          test: /vendor\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: false
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
                includePaths: [
                  require("path").resolve(__dirname, "node_modules")
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new FaviconsWebpackPlugin({
        logo: "./favicon.png",
        prefix: "assets/favicon/",
        background: "#f00", // For Phone
        title: "Webpack App", // For Phone
        theme_color: "#000", // For Phone
        icons: {
          android: false, // Create Android homescreen icon. `boolean` or `{ offset, background }`
          appleIcon: false, // Create Apple touch icons. `boolean` or `{ offset, background }`
          appleStartup: false, // Create Apple startup images. `boolean` or `{ offset, background }`
          coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background }`
          favicons: true, // Create regular favicons. `boolean`
          firefox: false, // Create Firefox OS icons. `boolean` or `{ offset, background }`
          windows: false, // Create Windows 8 tile icons. `boolean` or `{ background }`
          yandex: false // Create Yandex browser icon. `boolean` or `{ background }`
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, "app/shared/images"),
          glob: "*.png"
        },
        target: {
          image: path.resolve(__dirname, "dist/assets/images/sprite.png"),
          css: [
            [
              path.resolve(__dirname, "temp/sprite/style.scss"),
              {
                format: "custom_handlebars_based_template"
              }
            ]
          ]
        },
        customTemplates: {
          custom_handlebars_based_template: path.resolve(
            __dirname,
            "dev_modules/webpack/scss.template.handlebars"
          )
        },
        apiOptions: {
          cssImageRef: "dist/assets/images/sprite.png"
        }
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          removeComments: true,
          removeEmptyAttributes: true,
          minifyCSS: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }),
      // new BaseHrefWebpackPlugin({
      //    baseHref: '/Admin/'
      // }),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: ["constant.js"],
        append: false
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/[name].[contenthash].css"
      }),
      new BundleAnalyzerPlugin(),
      new WebpackMonitor({
        capture: true,
        launch: true
      }),
      new Manifest(),
      new ImageComperssor(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new HtmlCriticalWebpackPlugin({
        base: path.resolve(__dirname, "dist"),
        src: "index.html",
        dest: "index.html",
        inline: true,
        minify: true,
        extract: false,
        width: 375,
        height: 565,
        penthouse: {
          blockJSRequests: false
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
  });
}
