define(["./tmpl", '../tmplEngine', '../viewEngine', '../jLibs', '../pagePlugin'], function(tmpl, tempEngine, vE, jLibs, pPlugin) {

    function loadTmpl() {
        appView.html(tmpl.page);
    }

    function bindData(data) {
        jLibs.pubsub.subscribe("taskDataBind", function(topic, data) {
            vE(data);
        });
        jLibs.pubsub.publish("taskDataBind", {
            name: "data",
            data: data.content
        });
        jLibs.pubsub.publish("taskDataBind", {
            name: "list",
            data: data.content
        });
        loadEvent();
    }

    function loadTable() {
        // var table = tempEngine(tmpl.table);

        var ad = appData;

        ad.selectList("T_LIST", {}, function(data) {

            bindData(data);

            pPlugin(data);

            // $("#ControlTableBody").empty().html(table(data.content));
        });
    }

    function loadEvent() {
        var button = document.querySelector("button");
        button.onclick = function(event) {
            sessionStorage.page = "";
            rootScope.viewsChange();
            event.stopPropagation();
        };
    }

    return function() {
        loadTmpl();
        loadTable();
    };
});