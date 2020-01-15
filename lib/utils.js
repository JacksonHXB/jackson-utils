module.exports = {
    isEmpty,                                 //判断是否为空 
}





/*判断是否为空*/
function isEmpty(data, ...vars) {
    if (vars.length == 0) return _isEmptyCore(data)
    return vars.some(item => { return _isEmptyCore(item) }) //当不定参数有一个为空就为空
}

function _isEmptyCore(data) {
    if (!data || data == 'undefined' || data == 'false' || data == 'null' || data == 'NaN' || data == "" || data == null || data == undefined ) {
        return true
    }
    if (typeof(data) == "object") { //判断对象/map
        if (JSON.stringify(data) == "{}" || JSON.stringify(data) == "[]") return true
    }
    return false
}