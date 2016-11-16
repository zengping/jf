define(function() {
    return function(str, i) {
        var $1 = i.substr(0, 1);
        return new Function('data',
            'var arr = [];' +
            'for(x in data) {' +
            'var ' + $1 + ' = data[x];' +
            'arr.push("' +
            str.replace(/[\r\t\n]/g, ' ')
            .replace(/"/g, '\\"')
            .replace(/{{\s?(.*?)\s?}}/g, '");arr.push($1);arr.push("') +
            '")}return arr.join("");');
    };
});