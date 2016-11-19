define(function() {
    function _page() {
        return `
            <div>
                <ul>
                    <li class="animated slideInDown" j-for="v in menu" data-url="{{v.url}}">
                    {{v.name}}
                    </li>
                </ul>
            </div>

            <button>to menu</button>
        `;
    }

    return {
        "page": (function() {
            return _page();
        })()
    };
});