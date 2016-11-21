define(["./tmpl", '../tmplEngine', '../viewEngine', '../jLibs'], function(tmpl, tempEngine, vE, jLibs) {

    function loadTmpl() {
        appView.html(tmpl.page);

    }

    function bindData(data) {
        jLibs.pubsub.subscribe("menuDataBind", function(topic, data) {
            vE(data);
        });
        jLibs.pubsub.publish("menuDataBind", {
            name: "data",
            data: data
        });
        loadEvent();
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
        var button = document.querySelector("button");
        button.onclick = function(event) {
            sessionStorage.page = "menu/menu";
            rootScope.viewsChange();
            event.stopPropagation();
        };
    }

    return function() {
        loadTmpl();
        loadMenu();
    };
});