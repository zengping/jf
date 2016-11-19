define(['./tmplEngine'], function(tE) {

    return function(obj) {
        createHtml();

        function createHtml() {
            var str = document.querySelector("#container");
            str = cIf(str);
            // str = cFor(str);
            str.innerHTML = str.innerHTML;
            bindData();
        }

        function bindData() {
            var str = document.querySelectorAll("[j-for]");
            if (str.length > 0) {
                for (var m = 0; m < str.length; m++) {
                    var dc = str[m].getAttribute("j-for");
                    if (!(new RegExp(obj.name, "g").test(dc))) {
                        break;
                    }
                    var hstr = str[m].outerHTML;
                    var f = str[m].querySelectorAll("[j-for]");
                    if (f.length > 0) {
                        for (var i = 0; i < f.length; i++) {
                            var ic = f[i].getAttribute("j-for");
                            var fc = ic.replace(/\(?(.*?)\)?\sin\s(.*?)/g, '$2');
                            var h = "";
                            h += "{{each " + ic + "}}";
                            h += f[i].outerHTML.replace(" j-for\=\"" + ic + "\"", "");
                            h += "{{/each}}";
                            hstr = hstr.replace(f[i].outerHTML, h);
                        }
                    }
                    hstr = "{{each " + dc + "}}" + hstr.replace(" j-for\=\"" + dc + "\"", "") + "{{/each}}";
                    var vE = viewFunction(obj.name, hstr);
                    var pstr = str[m].parentNode.innerHTML;
                    str[m].parentNode.innerHTML = pstr.replace(str[m].outerHTML, vE(obj.data));
                }
            } else {
                var str = document.querySelector("#container");
                var vE = viewFunction(obj.name, str.innerHTML);
                str.innerHTML = vE(obj.data);
            }
        }

        function cFor(str) {
            var f = str.querySelectorAll("[j-for]");
            var hstr = str.innerHTML;
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    var ic = f[i].getAttribute("j-for");
                    var fc = ic.replace(/\(?(.*?)\)?\sin\s(.*?)/g, '$2');
                    var h = "";
                    h += "<tr class=\"" + fc + "\" j-for=\"" + ic + "\">";
                    h += f[i].outerHTML.replace("j-for\=\"" + ic + "\"", "");
                    h += "</tr>";
                    hstr = hstr.replace(f[i].outerHTML, h);
                }
            }
            str.innerHTML = hstr;
            return str;
        }

        function cIf(str) {
            var f = str.querySelectorAll("[j-if]");
            var hstr = str.innerHTML;
            if (f.length > 0) {
                for (var i = 0; i < f.length; i++) {
                    var ic = f[i].getAttribute("j-if");
                    var h = "";
                    h += "{{if " + ic + "}}";
                    if ((new RegExp("\<span j\-if\=\"(.*?)\">", 'g')).test(f[i].outerHTML)) {
                        h += f[i].innerHTML;
                    } else {
                        h += f[i].outerHTML.replace(" j-if\=\"" + ic + "\"", "");
                    }
                    h += "{{/if}}";
                    hstr = hstr.replace((new RegExp(f[i].outerHTML, 'g')), h);
                }
            }
            str.innerHTML = hstr;
            return str;
        }

        function viewFunction(list, str) {
            return new Function(list,
                'var arr = [];' +
                'arr.push("' +
                str.replace(/[\r\t\n]/g, ' ')
                .replace(/"/g, '\\"')
                .replace(/&amp;/g, '&')
                .replace(/{{each\s\((.*?)\,\s?(.*?)\)\sin\s(.*?)\s?}}/g, '");for(var $1 in $3){var $2=$3[$1];arr.push("')
                .replace(/{{each\s(.*?)\sin\s(.*?)\s?}}/g, '");for(var i in $2){var $1=$2[i];arr.push("')
                .replace(/{{\/each}}/g, '");}arr.push("')
                .replace(/{{if\s(.*?)\s?}}/g, '");if ($1) {arr.push("')
                .replace(/{{else}}/g, '");}else{arr.push("')
                .replace(/{{\/if}}/g, '");}arr.push("')
                .replace(/{{\s?(.*?)\s?}}/g, '");arr.push($1);arr.push("') +
                '");return arr.join("");');
        }
    };
});