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
                        console.log(tE);
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
                    if ((new RegExp(/\<span j\-if\=\"(.*?)\">/, 'g')).test(f[i].outerHTML)) {
                        h += f[i].innerHTML;
                    } else {
                        h += f[i].outerHTML;
                    }
                    h += "{{/if}}";
                    hstr = hstr.replace(new RegExp(f[i].outerHTML, 'g'), h);
                }
            }
            str.innerHTML = hstr;
            return str;
        }

        function jFor(str) {
            var fc = str.getAttribute("j-for");
            var v, K;
            if ((new RegExp(/\(/, 'g')).test(fc)) {
                v = fc.replace(/\(([a-z]{1,10})\,\s?([a-z]{1,10})(\)\sin\s[a-zA-Z0-9]{1,10})/g, '$2');
                k = fc.replace(/\(([a-z]{1,10})(\,\s?[a-zA-Z0-9]{1,10}\)\sin\s[a-zA-Z0-9]{1,10})/g, '$1');
            } else {
                v = fc.replace(/([a-z]{1,10})\s(in\s[a-zA-Z0-9]{1,10})/g, '$1');
                k = "x";
            }
            return vFor(k, v, str.outerHTML);
        }

        function vFor(k, v, str) {
            return new Function('data',
                'var arr = [];' +
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