define(function() {
    var APP_DEV_ENV = 1,
        // 1开发环境 0生产环境
        appJoin = APP_DEV_ENV ? "?" : "",
        appType = {
            "insert": "insert",
            "del": "del",
            "sel": "sel",
            "update": "update"
        };

    if (APP_DEV_ENV) {
        appType.insert = "sel";
        appType.del = "sel";
        appType.update = "sel";
    }

    function _appApi(code) {

        var appApi = {

            // 分页
            "PAGE_SIZE": 10,

            // 查询菜单
            "INDEX_MENU": APP_DEV_ENV ? "./jsons/menu.json" : "./jsons/menu.json",
            /**
             *  监控 task > control 
             */
            // 任务监控
            "T_CONTROL_LIST": APP_DEV_ENV ? "./jsons/task/control/list.json" : "./jsons/task/control/list.json"
        };

        return appApi[code];
    }

    return {
        appJoin: appJoin,
        appType: appType,
        appApi: function(code) {
            return _appApi(code);
        }
    };
});