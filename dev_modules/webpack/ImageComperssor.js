const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminSvgo = require('imagemin-svgo');
const imageminOptipng = require('imagemin-optipng');
const imageminGifsicle = require('imagemin-gifsicle');


class ImageComperssor {
    apply(compiler) {
        compiler.plugin('done' , this.comperssor);
    }
    
    comperssor() {

        (async () => {
            const files = await imagemin(['dist/assets/images/*.{jpg,png,gif,svg,}'], 'dist/assets/images', {
                plugins: [
                    imageminJpegtran(),
                    imageminPngquant({quality: '65-80'}),
                    imageminGifsicle(),
                    imageminOptipng(),
                    imageminSvgo({
                        plugins: [
                            {removeViewBox: false}
                        ]
                    }),
                    imageminMozjpeg()

                ]
            });
        
           // console.log("Finished Comperssoring Image File");
        })();
    }
}

module.exports = ImageComperssor;