define(['./tmplEngine'], function(tE) {

    return function(obj) {
        createHtml();

        function createHtml() {
            cFor();
        }

        function cFor() {
            var f = document.querySelectorAll("[j-for]");
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    var reg = new RegExp(obj.name, 'g');
                    var fc = f[i].getAttribute("j-for");
                    if (reg.test(fc)) {
                        var ic = cIf(f[i]);
                        var tE = jFor(ic);
                        f[i].parentNode.innerHTML = tE(obj.data);
                    }
                }
            }
        }

        function cIf(str) {
            var f = str.querySelectorAll("[j-if]");
            var hstr = str.outerHTML;
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    var ic = f[i].getAttribute("j-if");
                    var h = "";
                    h += "{{if " + ic + "}}";
                    if ((new RegExp("\<span j\-if\=\"(.*?)\">", 'g')).test(f[i].outerHTML)) {
                        h += f[i].innerHTML.replace(new RegExp("j-if\=\"" + ic + "\""), "");
                    } else {
                        h += f[i].outerHTML.replace(new RegExp("j-if\=\"" + ic + "\""), "");
                    }
                    h += "{{/if}}";
                    hstr = hstr.replace(new RegExp(f[i].outerHTML), h);
                }
            }
            str.innerHTML = hstr;
            return str;
        }

        function jFor(str) {
            var fc = str.getAttribute("j-for");
            var v, K, list;
            if ((new RegExp(/\(/, 'g')).test(fc)) {
                v = fc.replace(/\(([a-z]{1,10})\,\s?([a-z]{1,10})(\)\sin\s[a-zA-Z0-9]{1,10})/g, '$2');
                k = fc.replace(/\(([a-z]{1,10})(\,\s?[a-zA-Z0-9]{1,10}\)\sin\s[a-zA-Z0-9]{1,10})/g, '$1');
                list = fc.replace(/\(([a-z]{1,10})(\,\s?[a-zA-Z0-9]{1,10}\)\sin\s)([a-zA-Z0-9]{1,10})/g, '$3');
            } else {
                v = fc.replace(/([a-z]{1,10})\s(in\s[a-zA-Z0-9]{1,10})/g, '$1');
                k = "x";
                list = fc.replace(/([a-z]{1,10})\s(in\s)([a-zA-Z0-9]{1,10})/g, '$3');
            }
            return vFor(k, v, list, str.outerHTML);
        }

        function vFor(k, v, list, str) {
            return new Function(list,
                'var arr = [];' +
                'var data = ' + list + ';' +
                'for(' + k + ' in data) {' +
                'var ' + v + ' = data[' + k + '];' +
                'arr.push("' +
                str.replace(/[\r\t\n]/g, ' ')
                .replace(/"/g, '\\"')
                .replace(/{{if\s(.*?)\s?}}/g, '");if ($1) {arr.push("')
                .replace(/{{else}}/g, '");}else{arr.push("')
                .replace(/{{\/if}}/g, '");}arr.push("')
                .replace(/{{\s?(.*?)\s?}}/g, '");arr.push($1);arr.push("') +
                '")}return arr.join("");');
        }
    };
});