let sdCore = angular
    .module('sooranDesign.core', [
        'ngAnimate'
    ])
    .config(SdCoreConfigure)


/**
 * @ngInject
 */
function SdCoreConfigure($provide) {

    $provide.decorator('$$rAF', ['$delegate', rAFDecorator]);
    $provide.decorator('$q', ['$delegate', qDecorator]);
}

/**
 * @ngInject
 */
function rAFDecorator($delegate) {
    /**
     * Use this to throttle events that come in often.
     * The throttled function will always use the *last* invocation before the
     * coming frame.
     *
     * For example, window resize events that fire many times a second:
     * If we set to use an raf-throttled callback on window resize, then
     * our callback will only be fired once per frame, with the last resize
     * event that happened before that frame.
     *
     * @param {function} callback function to debounce
     */
    $delegate.throttle = function (cb) {
        var queuedArgs, alreadyQueued, queueCb, context;
        return function debounced() {
            queuedArgs = arguments;
            context = this;
            queueCb = cb;
            if (!alreadyQueued) {
                alreadyQueued = true;
                $delegate(function () {
                    queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
                    alreadyQueued = false;
                });
            }
        };
    };
    return $delegate;
}

/**
 * @ngInject
 */
function qDecorator($delegate) {
    /**
     * Adds a shim for $q.resolve for AngularJS version that don't have it,
     * so we don't have to think about it.
     *
     * via https://github.com/angular/angular.js/pull/11987
     */

    // TODO(crisbeto): this won't be necessary once we drop AngularJS 1.3
    if (!$delegate.resolve) {
        $delegate.resolve = $delegate.when;
    }
    return $delegate;
}

import UtilFactory from "./util/sdutil";

sdCore.factory("sdUtil", UtilFactory);


export default sdCore;