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
            topics[topic](topic, args);
            return this;
        };
        //订阅事件
        q.subscribe = function(topic, func) {
            topics[topic] = topics[topic] ? topics[topic] : func;
            return true;
        };
        return q;
    }

    return {

        "pubsub": _pubsub()
    };
});