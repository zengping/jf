define(function() {

    return function() {
        var url = sessionStorage.page;
        if (!url) {
            url = "index/index";
        }
        require(["./scripts/app/" + url], function(event) {
            event();
        });
    };
});