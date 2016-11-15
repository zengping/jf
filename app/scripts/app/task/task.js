define(["./tmpl", '../tmplEngine'], function(tmpl, tempEngine) {
    function _init() {
        loadTmpl();
        loadTable();
        loadEvent();
    }

    function loadTmpl() {
        appView.html(tmpl.page);
    }

    function loadTable() {
        var table = tempEngine(tmpl.table);
        console.log(table);

        var ad = appData;

        ad.selectList("T_CONTROL_LIST", {}, function(data) {

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