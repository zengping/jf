define(function() {
    return function(str) {
        return new Function('data',
            'var arr = [];' +
            'var dataArr = [];' +
            'if (data.length > 0) { dataArr = data } ' +
            'if (data.length == undefined) { dataArr.push(data); } ' +
            'for(var x in dataArr) { ' +
            'var value = dataArr[x]; ' +
            'arr.push("' +
            str.replace(/[\r\t\n]/g, ' ')
            .replace(/"/g, '\\"')
            .replace(/{{=\s?(.*?)\s?}}/g, '");arr.push($1);arr.push("')
            .replace(/{{each\((\w)+\,\s?(.*?)\)\s(.*?)\s?}}/g, '");for(var $1 in $3){var $2=$3[$1];arr.push("')
            .replace(/{{\/each}}/g, '");}arr.push("')
            .replace(/{{if\s(.*?)\s?}}/g, '");if ($1) {arr.push("')
            .replace(/{{else}}/g, '");}else{arr.push("')
            .replace(/{{\/if}}/g, '");}arr.push("') +
            '");}return arr.join("");');
    }
});