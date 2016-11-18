define(["./tmpl", '../tmplEngine', '../viewEngine', '../jLibs'], function(tmpl, tempEngine, vE, jLibs) {

    function loadTmpl() {
        appView.html(tmpl.page);
    }

    function bindData(data) {
        jLibs.pubsub.subscribe("bindData", "taskData", function(topic, data) {
            vE(data);
        });
        jLibs.pubsub.publish("bindData", "taskData", {
            name: "data",
            data: data.content
        });
        jLibs.pubsub.publish("bindData", "taskData", {
            name: "list",
            data: data.content
        });
    }

    function loadTable() {
        var table = tempEngine(tmpl.table);

        var ad = appData;

        ad.selectList("T_CONTROL_LIST", {}, function(data) {

            bindData(data);

            $("#ControlTableBody").empty().html(table(data.content));
        });
    }

    function loadEvent() {
        $("button").on("click", function() {
            sessionStorage.page = "";
            rootScope.viewsChange();
        });
    }

    return function() {
        loadTmpl();
        loadTable();
        loadEvent();
    };
});