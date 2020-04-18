module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")({
      preset: "default",
      zindex: false,
      reduceIdents: false,
      discardComments: { removeAll: true }
    }),
	    require('postcss-color-hex-alpha'),
    require("postcss-pxtorem")({
      rootValue: 16,
      unitPrecision: 5,
      propList: ["font", "font-size", "line-height", "letter-spacing","padding*","margin*","height","width","border*","background*","left","right","bottom","top"],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    })
  ]
};
