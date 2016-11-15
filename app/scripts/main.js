(function(win) {
    //配置baseUrl
    var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

    /*
     * 文件依赖
     */
    var config = {
        baseUrl: baseUrl,
        paths: {
            jquery: './scripts/libs/jquery',
            router: './scripts/router',
            appData: "./scripts/app/appData"
        },
        shim: {}
    };

    require.config(config);
    require(['jquery', 'router', 'appData'], function($, router, appData) {
        win.appView = $('#container'); //用于模块控制视图变化
        win.$ = $;
        win.appData = appData;
        win.rootScope = {};
        rootScope.viewsChange = router.init; //监控views变化
        rootScope.viewsChange();
    });


})(window);