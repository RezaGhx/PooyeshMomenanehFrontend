const notifier = require('node-notifier');
const path = require('path');

class Notifier {
    apply(compiler) {
        compiler.plugin('done' , this.notification);
    }
    
    notification(stats) {

        const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2)
        notifier.notify({
            title : 'Pooyesh Momenaneh FrontEnd Modified!',
            //appID: 'Test',
            message: `Build Project Is Done!\n${stats.compilation.errors.length} Errors In ${time}s`,
            icon: path.join(__dirname, 'icon.png'),
         });
    }
}

module.exports = Notifier;