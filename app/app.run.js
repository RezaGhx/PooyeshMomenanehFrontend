import { tooltip } from "bootstrap/js/dist/tooltip";

AppRun.$inject = ["$http", "$cookies", "$rootScope", "$state", "$transitions", "$auth"];

function AppRun(http, cookies, rootScope, state, $transitions, auth) {

    iziToast.settings({
        displayMode: 1
    });

    rootScope.claims = cookies.getObject('cached-claims');

    //when change state scroll to top with animation

    let userHandler = function () {
        let user = auth.user();
        
        if (!user) {
            return auth.logOut();
        }
        http.defaults.headers.common.Authorization = 'Bearer ' + user.auth_token;
    }

    userHandler();
    rootScope.$on('$locationChangeStart', function (event, next, current) {
        userHandler();
    });


    rootScope.$on('$locationChangeSuccess', function (event, next, current) {
        // rootScope.menuHandler()
        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip();
        }, 500);

    });


    $transitions.onError({}, function (transition) {
        console.log('error', transition.error().message, transition);
    });

    $transitions.onBefore({
        to: 'parent'
    }, function (trans) {
        console.log(trans.targetState().name());
        return trans.router.stateService.target('parent.child', trans.targetState().params());
    });

    var config = {
        // How long Waves effect duration 
        // when it's clicked (in milliseconds)
        duration: 2000,

        // Delay showing Waves effect on touch
        // and hide the effect if user scrolls
        // (0 to disable delay) (in milliseconds)
        delay: 200
    };
    // Initialise Waves with the config
    Waves.init(config);

}

export default AppRun;