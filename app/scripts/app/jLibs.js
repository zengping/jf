define(function() {
    // 发布，订阅者模式
    function _pubsub() {
        var q = {},
            topics = {},
            subUid = -1;
        //发布消息
        q.publish = function(topic, id, args) {
            if (!topics[topic] || !topics[topic][id]) {
                return;
            }
            // var subs = topics[topic],
            //     len = subs.length;
            // console.log(subs);
            // while (len--) {
            //     subs[len].func(topic, args);
            // }
            topics[topic][id](topic, args);
            return this;
        };
        //订阅事件
        q.subscribe = function(topic, id, func) {
            topics[topic] = topics[topic] ? topics[topic] : {};
            topics[topic][id] = func;
            // var token = (++subUid).toString();
            // topics[topic].push({
            //     token: token,
            //     func: func
            // });
            // console.log(token);
            // return token;
            return true;
        };
        return q;
    }

    return {

        "pubsub": (function() {

            return _pubsub();
        })()
    };
});