define([
        "./scripts/app/appApi",
        "./scripts/app/appController"
    ],
    function(api, appController) {
        var appC = appController;
        var appApi = api.appApi;
        var appType = api.appType;
        var appJoin = api.appJoin;

        // 增例
        function _insert(url, params, callback) {

            appC[appType.insert](appApi(url), params, function(data) {

                callback(data);
            });
        }

        // 删例
        function _del(url, params, callback, $this) {

            appC[appType.del](appApi(url) + appJoin + "/" + params.id, null, function(data) {

                callback(data, $this);
            });
        }

        // 改例
        function _update(url, params, callback, $this) {

            appC[appType.update](appApi(url) + appJoin + "/" + params.id, params, function(data) {

                callback(data, $this);
            });
        }

        // 查例
        function _sel(url, params, callback, $this, loading) {

            appC[appType.sel](appApi(url) + appJoin + "/" + params.id, params, function(data) {

                callback(data, params, $this);
            }, loading);
        }

        // 查例
        function _selectList(url, params, callback, $this, loading) {

            appC[appType.sel](appApi(url), params, function(data) {

                callback(data);
            }, loading);
        }

        // 有回调之查询
        function _selCallback(url, params, callback, $this, loading) {

            appC[appType.sel](appApi(url) + appJoin + "/" + params.id, params.param, function(data) {

                callback(data, params.callbackParam, $this);
            }, loading);
        }

        /**
         * 查询菜单
         */
        function _selectMenu(url, params, callback) {

            appC[appType.sel](appApi(url), params, function(data) {

                callback(data);
            });
        }

        return {

            "insert": function(url, params, callback) {

                return _insert(url, params, callback);
            },

            "del": function(url, params, callback, $this) {

                return _del(url, params, callback, $this);
            },

            "update": function(url, params, callback, $this) {

                return _update(url, params, callback, $this);
            },

            "sel": function(url, params, callback, $this, loading) {

                return _sel(url, params, callback, $this, loading);
            },

            "selectList": function(url, params, callback, $this, loading) {

                return _selectList(url, params, callback, $this, loading);
            },

            "selectMenu": function(url, params, callback) {

                return _selectMenu(url, params, callback);
            },

            "selCallback": function(url, params, callback, $this, loading) {

                return _selCallback(url, params, callback, $this, loading);
            }
        };
    });