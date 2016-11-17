define(['./tmplEngine'], function(tE) {

    return function(obj) {
        createHtml();
        getObjName(obj);

        function createHtml() {
            cFor();
        }

        function getObjName(obj) {
            var tmpObj = { obj };
        }

        function cFor() {
            var f = document.querySelectorAll("[j-for]");
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    var h = "<span class=\"j-for\">";
                    var fc = f[i].getAttribute("j-for");
                    h += "\"+for(" + fc + "){+\"";
                    h += f[i].outerHTML;
                    h += "\"+}+\"</span>";
                    f[i].parentNode.innerHTML = h;
                }
            }
        }

        function bindData() {
            var f = document.querySelectorAll(".j-for");
        }

        function jFor() {
            var $1 = i.substr(0, 1);
            return new Function('data',
                'var arr = [];' +
                'for(x in data) {' +
                'var ' + $1 + ' = data[x];' +
                'arr.push("' +
                str.replace(/[\r\t\n]/g, ' ')
                .replace(/"/g, '\\"')
                .replace(/{{\s?(.*?)\s?}}/g, '");arr.push($1);arr.push("') +
                '")}return arr.join("");');
        }
    };
});