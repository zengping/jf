define(function() {
    function _page() {
        return `
            <div j-if="obj.name">{{obj.name}}</div>
            <button>to menu page</button>
        `;
    }

    return {
        "page": (function() {
            return _page();
        })()
    };
});