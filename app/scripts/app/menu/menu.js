define(["./tmpl", '../tmplEngine', '../viewEngine', '../jLibs'], function(tmpl, tempEngine, vE, jLibs) {

    function loadTmpl() {
        appView.html(tmpl.page);

    }

    function bindData(data) {
        jLibs.pubsub.subscribe("bindData", "menuData", function(topic, data) {
            vE(data);
        });
        jLibs.pubsub.publish("bindData", "menuData", {
            name: "menu",
            data: data
        });
        loadEvent();
    }

    function loadMenu() {

        var ad = appData;

        // TODO: 查询菜单
        ad.selectMenu("ALL_MENU", {}, function(data) {

            bindData(data);

        });
    }

    function loadEvent() {
        var li = document.querySelectorAll("li");
        for (var i = 0; i < li.length; i++) {
            li[i].addEventListener("click", function(event) {
                page = this.getAttribute("data-url");
                if (page == undefined) {
                    return;
                }
                sessionStorage.page = page;
                rootScope.viewsChange();
                event.stopPropagation();
            });
        }
    }

    return function() {
        loadTmpl();
        loadMenu();
    };
});