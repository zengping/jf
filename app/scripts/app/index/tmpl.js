define(function() {
    function _page() {
        return `<div><ul id="menuLeft"></ul></div><button>to task page</button>`;
    }

    function _menuLeft() {
        return `<li class="animated slideInDown">
            <a class="sys-sidebar-item" href="javascript:void(0);">{{= value.name}}</a>
            <ul class="sys-sidebar-child">
                {{each(i,val) value.child}}
                <li class="" data-url="{{= val.url}}">
                    <a href="javascript:void(0);">
                        <i class="{{= val.icon}}"></i>
                        {{= val.name}}
                    </a>
                </li>
                {{/each}}
            </ul>
        </li>`;
    }

    return {
        "page": (function() {
            return _page();
        })(),
        "menuLeft": (function() {
            return _menuLeft();
        })()
    };
});