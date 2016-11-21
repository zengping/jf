define(function() {
    return function(obj) {
        var pc = Math.ceil(obj.totalRecord / 10);
        console.log(pc);
        if (pc > 1) {
            return;
        }
    };
});