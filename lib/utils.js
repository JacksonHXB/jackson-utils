module.exports = {
    isEmpty,                                //判断是否为空 
    isNotBlank,                             //判断是否不为空
    getHasValObj,                           //获取有值的对象
    pxToRpx,                                //px单位转换为rpx
    rpxToPx,                                //rpx转换为px
    parseURL,                               //解析路径
    getValueByStr,                          //链式获取值
    isNotBlankByStr,                        //根据属性字符串检测是否不为空
    isEmptyByStr,                           //根据属性字符串检测是否为空
    queryValueByStr,                        //检测对象是否满足搜索条件
    objToUrlParams,                         //将对象转为url传递参数
    copyProperties,                         //复制对象属性
}

//复制属性
function copyProperties(source, operator){
    if(operator instanceof Array){   //operatoer是数组，则根据属性进行赋值
        let item = {}
        for(let key in source){
            if(operator.indexOf(key) != -1){
                item[key] = source[key]
            }
        }
        return item
    }else{  //operatr是其他对象，就将原对象全部赋值(覆盖)给目标对象
        for(let key in source){
            operator[key] = source[key]
        }
        return operator
    }
}

//将对象转为url传递参数
function objToUrlParams(obj){
    let params = Object.values(obj).reduce((a, b, i) => b ? `${a}${Object.keys(obj)[i]}=${b}&` : `${a}`, '?');
    return params.substring(0, params.length - 1);
}

//根据属性字符串检测有没有值
function isNotBlankByStr(obj, str){
    return !isEmptyByStr(obj, str)
}

//根据属性字符串检测有没有值
function isEmptyByStr(obj, str){
    return isEmpty(getValueByStr(obj, str))
}

//检测对象是否满足搜索条件
function queryValueByStr(obj, properties, keyword){
    if (typeof (properties) == 'string') properties = properties.split(",")
    for(let i in properties){
        let value = getValueByStr(obj, properties[i])
        if(value.indexOf(keyword) != -1){
            return true
        }
    }
    return false
}

//根据字符串属性，递归出某对象的属性
function getValueByStr(obj, propertyArrStr, index){
    let propertyArr = propertyArrStr.split(".")
    index = index ? index : 0
    if (!obj || !obj.hasOwnProperty(propertyArr[index])) return ""     //当对象没有值时或者这个对象没有改属性时，直接返回null
    if (index >= propertyArr.length - 1) return obj[propertyArr[index]]  //当数组遍历完了之后，直接返回该对象值
    obj = obj[propertyArr[index]]
    index++
    return getValueByStr(obj, propertyArrStr, index)
}

//判断是否为空
function isNotBlank(data, ...vars) {
    return !isEmpty(data, ...vars)
}

//获取有值的对象
function getHasValObj(obj){
    for(let key in obj){
        //[]或者{}或者string
        if ((typeof (obj[key]) == "object" && Object.keys(obj[key]).length == 0) || !obj[key]) delete obj[key]
    }
    return obj
}

//解析URL
function parseURL(url) {
    if (!url) return;
    url = decodeURI(url);
    var url = url.split("?")[1];
    var para = url.split("&");
    var len = para.length;
    var res = {};
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr = para[i].split("=");
        res[arr[0]] = arr[1];
    }
    return res;
}

//px单位转换为rpx
function pxToRpx(px){
    var winWidth = wx.getSystemInfoSync().windowWidth
    return px * (750 / winWidth)
}

//rpx转换为px
function rpxToPx(rpx){
    var winWidth = wx.getSystemInfoSync().windowWidth
    return rpx / (750 / winWidth)
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