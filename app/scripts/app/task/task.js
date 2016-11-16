define(["./tmpl", '../tmplEngine', '../viewEngine'], function(tmpl, tempEngine, vE) {
    function _init() {
        loadTmpl();
        loadTable();
        loadEvent();
    }

    function loadTmpl() {
        appView.html(tmpl.page);
    }

    function bindData(data) {
        vE(data.content);
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

    return {
        "init": function() {
            return _init();
        }
    }
});