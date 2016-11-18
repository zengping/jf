define(function() {
    var appControllerLoadings = 0;

    function dataHandle(url, params, callback, async, method, loading) {

        if (!loading) $("#loading").show();
        appControllerLoadings += 1;
        if (!method) {
            throw 'method 参数未设置';
        }

        if (typeof params == 'function') {
            callback = params;
            params = null;
        }

        params = params || {};
        async = async || true;

        $.ajax({
            async: async,
            url: url,
            dataType: 'json',
            data: params,
            type: method,
            contentType: 'application/json;charset=UTF-8',
            complete: function complete(xhr) {

                appControllerLoadings -= 1;
                if (!appControllerLoadings) $("#loading").hide();
                if (xhr.responseText.indexOf("<!DOCTYPE html>") != -1) {
                    if (xhr.responseText.indexOf("<title>系统 v2.0</title>") != -1) {
                        _as.jAlert("<p>登录超时，请重新登录！</p>", function() {
                            window.location.href = "login.html";
                        });
                        return false;
                    }
                    _as.jAlert("<p>对不起，服务器接口出错！</p><p>请联系技术人员！</p>");
                    return false;
                }

                var result = JSON.parse(xhr.responseText),
                    code = parseInt(result.status.code),
                    message = result.status.message;

                if (code !== 200 && code !== 900) {
                    if (typeof code == "undefined") {
                        console.log('错误码：0000\n异常信息：频繁操作 操作拒绝');
                        return;
                    }
                    _as.jAlert("<p>异常信息：</p><p>" + message + "</p>");
                    return;
                } else if (code === 900) {
                    _as.jAlert("<p>" + result.data[0].message + "</p>", function(dom) {

                        $("#" + dom).focus();
                        _as.shake(dom, _as.fadeOut, 5, 500, "noShowRed");
                    }, result.data[0].id);
                    return;
                } else {
                    callback(result.data);
                }
            }
        });
    }

    // TODO: 需要添加请求未成功的验证

    return {
        'insert': function(url, params, callback, async) {

            return dataHandle(url, JSON.stringify(params), callback, async, 'post');
        },
        'del': function(url, params, callback, async) {

            return dataHandle(url, JSON.stringify(params), callback, async, 'delete');
        },
        'update': function(url, params, callback, async) {

            return dataHandle(url, JSON.stringify(params), callback, async, 'put');
        },
        'sel': function(url, params, callback, loading, async) {

            return dataHandle(url, params, callback, async, 'get', loading);
        }
    };
});