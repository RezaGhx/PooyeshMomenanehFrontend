const fs = require("fs");

  class DeletingCss {

    apply(compiler) {
        compiler.plugin('done' , this.deleting);
    }

    deleting() {
          fs.unlink('dist/assets/css/app.css', (err) => {
            if (err) throw err;
          });
          fs.unlink('dist/assets/css/core.css', (err) => {
            if (err) throw err;
          });
    }
}

module.exports = DeletingCss;