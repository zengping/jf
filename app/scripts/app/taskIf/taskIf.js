define(["./tmpl", '../viewEngine', '../jLibs'], function(tmpl, vE, jLibs) {

    function loadTmpl() {
        appView.html(tmpl.page);
    }

    function bindData(data) {
        jLibs.pubsub.subscribe("taskIfDataBind", function(topic, data) {
            vE(data);
        });
        jLibs.pubsub.publish("taskIfDataBind", {
            name: "obj",
            data: data
        });
        loadEvent();
    }

    function loadTable() {

        var ad = appData;

        ad.selectList("T_TASKIF", {}, function(data) {

            bindData(data);

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
        loadTable();
    };
});