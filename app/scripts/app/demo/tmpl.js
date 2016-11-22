define(function() {
    return `
            <input type="text" class="myName" j-model="myName"> name: <span j-bind="myName"></span>
    <button>清除</button>
<script>
    var pubsub = (function() {
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
        //取消订阅就不写了，遍历topics，然后通过保存前面返回token，删除指定元素
    })();
    //触发的事件
    var changeUI = function(topic, data) {
            var input = document.querySelector("[j-model]");
            if (input.getAttribute("j-model") == data.model) {
                input.value = data.value;
            }
            var span = document.querySelector("[j-bind]");
            if (span.getAttribute("j-bind") == data.model) {
                span.innerHTML = data.value;
            }
        }
        //监听指定的消息'msgName'
    var sub = pubsub.subscribe('change', changeUI);
    //发布消息'msgName'

    //发布无人监听的消息'msgName1'
    pubsub.publish('anotherMsgName', 'me too!');

    //addEventListener：绑定函数 
    var input = document.querySelector(".myName");
    input.addEventListener("input", function() {
        pubsub.publish('change', {
            model: 'myName',
            value: this.value
        });
    });

    var btn = document.querySelector("button");
    btn.addEventListener("click", function() {
        pubsub.publish('change', {
            model: 'myName',
            value: ""
        });
    });
</script>
        `;
});