var jLoad = {
    load: function(url) {
        var self = this;
        jLib.xhr('GET', url, function(data) {
            self.innerHTML = data;

            jLib.createJS(data);
        });
    },
    xhr: function(method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (callback) {
                    callback(xhr.responseText);
                }
            }
        };
    },
    createJS: function(str) {
        str = str.replace(/[\n\t\r]/g, '');
        var reg = new RegExp(/<script>(.*?)<\/script>/, 'g');
        if (reg.test(str)) {
            var jstr = str.match(/<script>(.*?)<\/script>/g);
            if (jstr.length > 0) {
                for (var i = 0; i < jstr.length; i++) {
                    var js = jstr[i].replace(/<script>(.*?)<\/script>/g, '$1');
                    new Function("'" + js + "'");
                }
            }
        }

        jLib.loadJS(str);

    },
    loadJS: function(str) {
        var reg = new RegExp(/<script src=\"(.*?)\"><\/script>/, 'g');
        if (reg.test(str)) {
            var jstr = str.match(/<script\ssrc\=\"(.*?)\">/g);

            if (jstr.length > 0) {
                for (var i = 0; i < jstr.length; i++) {
                    var js = jstr[i].replace(/<script\ssrc\=\"(.*?)\">/g, '$1');
                    var script = document.createElement("script");
                    script.src = js;
                    document.head.appendChild(script);
                }
            }
        }
    }
};