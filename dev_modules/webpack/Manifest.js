//const fs = require('fs');
const path = require('path');

class Manifest {
    apply(compiler) {
        // compiler.plugin('done' , stats => {
        //     fs.writeFileSync(
        //         path.resolve('dist/manifest.json'),
        //         JSON.stringify(stats.toJson().assetsByChunkName)
        //     )
        // })

        compiler.plugin('emit' , (compilation , callback) => {
            let manifest = JSON.stringify(compilation.getStats().toJson().assetsByChunkName);

            compilation.assets['manifest.json'] = {
                source : () => manifest,
                size : () => manifest.length
            }

            callback()
        })
    }
}

module.exports = Manifest;