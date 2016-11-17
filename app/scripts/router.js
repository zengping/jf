define(function() {
    function _init() {
        var url = sessionStorage.page;
        if (!url) {
            url = "index/index";
        }
        require(["./scripts/app/" + url], function(event) {
            event();
        });
    }

    return {
        "init": function() {
            return _init();
        }
    };
});