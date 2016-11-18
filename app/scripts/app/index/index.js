define(["./tmpl", '../tmplEngine', '../viewEngine', '../jLibs'], function(tmpl, tempEngine, vE, jLibs) {

    function loadTmpl() {
        appView.html(tmpl.page);

    }

    function bindData(data) {
        jLibs.pubsub.subscribe("bindData", "menuData", function(topic, data) {
            vE(data);
        });
        // jLibs.pubsub.publish("bindData", "menuData", {
        //     name: "data",
        //     data: data
        // });
    }

    function loadMenu() {
        var menuLeft = tempEngine(tmpl.menuLeft);

        var ad = appData;

        // TODO: 查询菜单
        ad.selectMenu("INDEX_MENU", {}, function(data) {

            var menuLeftData = [];

            for (var i in data) {
                if (data[i].moduleType != 1) menuLeftData.push(data[i]);
            }

            bindData(menuLeftData);

            $("#menuLeft").html(menuLeft(menuLeftData));
        });
    }

    function loadEvent() {
        $("button").on("click", function() {
            sessionStorage.page = "task/task";
            rootScope.viewsChange();
        });
    }

    return function() {
        loadTmpl();
        loadMenu();
        loadEvent();
    };
});