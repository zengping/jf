define(function() {
    // 发布，订阅者模式
    function _pubsub() {
        var q = {},
            topics = {},
            subUid = -1;
        //发布消息
        q.publish = function(topic, args) {
            if (!topics[topic]) {
                return;
            }
            var subs = topics[topic],
                len = subs.length;
            while (len--) {
                subs[len].func(topic, args);
            }
            return this;
        };
        //订阅事件
        q.subscribe = function(topic, func) {
            topics[topic] = topics[topic] ? topics[topic] : [];
            var token = (++subUid).toString();
            topics[topic].push({
                token: token,
                func: func
            });
            return token;
        };
        return q;
    }

    return {

        "pubsub": (function() {

            return _pubsub();
        })()
    };
});