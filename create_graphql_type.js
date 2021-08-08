// ===============graphql类型构造器：自动将dubbo端返回的数据结构转换成graphql对应的类型定义=====================
let path={},fs={
    appendFile:()=>{},
    writeFile:()=>{},
};  
if(!window){ //兼容纯前端调用，即在浏览器里面执行
     path = require('path');
     fs = require('fs');
}

// 对js类型和graphql类型做映射  graphql类型：String、Int、Float、Boolean 、 ID ,[Int]
const TYPES = {
    string: 'String',
    int: 'Int',//如果typeof是number，且不含有小数点，就设置类型为Int类型
    float: 'Float', //如果typeof是number，且含有小数点，就设置类型为Float类型
    boolean: 'Boolean',
    // 下面的2个类型graphql是没有的，需要单独处理
    array: 'Array', 
    object: 'Object' 
};


// 根据后端数据结构，构造graphql类型
function getReturnObject({ typeWay, typeName, typeObj }) {
    // typeWay:input|type 表示是输入类型还是输出类型, typeName：类型的名字, typeObj：实际类型对象
    // 逻辑：先递归遍历整个对象，针对每个对象，定义对应类型（名字就从外面一层层传下去，用下划线分隔开）
    // 在从高层遍历时，就先生成对应的名字进行占位，后面再以此名字为类型名进行生成真正的类型定义

    createGraphqlType.index++; //一旦进入一次此函数，就执行一次，下标++，从而保证执行顺序
    let theIndex = createGraphqlType.index;
    if (typeWay != 'input' && typeWay != 'type') {
        throw '据后端数据构造graphql类型是失败：无效的类型方式 ' + typeWay + ' typeWay仅能为input|type';
    }

    let typeDefine = `${typeWay} ${typeName} {` + '\n';
    for (let key in typeObj) {
        let typev = getGraphqlType(typeObj[key]);
        if (typev == 'Array') { //数组
            typeDefine += `  ${key}:${deepResolveArryType(typeObj[key], typeName + '_' + key, typeWay)}` + '\n';
        }
        else if (typev == 'Object') { //对象
            // 创建对象名
            let obj = {};
            obj.typeName = typeName + '_' + key + 'Obj';
            obj.typeWay = typeWay;
            obj.typeObj = typeObj[key];
            getReturnObject(obj); //递归调用
            typeDefine += `  ${key}:${obj.typeName}` + '\n';
        }
        else { //其他普通类型
            typeDefine += `  ${key}:${typev}` + '\n';
        }
    }
    typeDefine += '}' + '\n';

    // 放进任务队列,通过自执行函数写法将变量当时的值传入环境中
    let fn = (function (filePath, typeDefine, theIndex) {
        return function () {
            return new Promise(function (resolve, reject) {
                if (filePath) {
                    // 将生成的文件写入到磁盘中
                    fs.appendFile(filePath, typeDefine, function (err) {
                        console.log('=====theIndex=========', theIndex);
                        if (err) {
                            // console.error('文件内容写入失败', err);
                            reject('文件内容写入失败', err);
                        }
                        console.log(`${typeWay} ${typeName}` + ':内容写入文件成功');
                        resolve(`${typeWay} ${typeName}` + ':内容写入文件成功');
                    });
                }
                else {
                    createGraphqlType.returnStrQue.push(typeDefine);//直接返回字符串
                    resolve(typeDefine);
                }
            });
        };

    })(createGraphqlType.filePath, typeDefine, theIndex);
    createGraphqlType.taskQue[theIndex] = fn;

}

// 传入一个值，返回这个值对应的graphql类型
function getGraphqlType(val) {
    let typev = typeof val;
    if (val == null) {
        throw '对于值为null的字段，无法识别其具体类型，请给上含有具体类型的值';
    }
    else if (val instanceof Array) { //数组
        typev = 'array';
    }
    else if (typev == 'object' && !(val instanceof Array)) { //对象(数组会在上面过滤掉)
        typev = 'object';
    }
    else if (typev == 'number') {
        let flag = (val + '').includes('.');
        if (flag) { //小数
            typev = 'float';
        }
        else { //整数
            typev = 'int';
        }
    }
    return TYPES[typev] || typev;
}

// 递归解析数组类型
function deepResolveArryType(arr, typeName, typeWay) {
    if (arr.length > 0) {
        let t = getGraphqlType(arr[0]);
        if (t == 'Object') { //对象
            // 创建对象名
            let obj = {};
            obj.typeName = typeName + 'Obj';
            obj.typeWay = typeWay;
            obj.typeObj = arr[0];
            getReturnObject(obj); //递归调用,生成一个类型定义
            return '[' + obj.typeName + ']';
        }
        else if (t == 'Array') {
            return '[' + deepResolveArryType(arr[0], typeName + '_arr', typeWay) + ']';
        }
        else {
            return '[' + t + ']';
        }
    }
    else {
        throw '数组类型不能为空，否则无法构建对应的graphql类型';
    }
}


// 导出此函数供用户使用
async function createGraphqlType(parObj) {
    let { filePath = false, rewrite = false } = parObj;
    createGraphqlType.taskQue = [];// 创建一个任务队列数组
    createGraphqlType.returnStrQue = [];// 创建一个承接返回字符串的队列数组
    createGraphqlType.index = -1;//下标，为了有序执行文件创建
    createGraphqlType.filePath = filePath;
    createGraphqlType.rewrite = rewrite;
    getReturnObject(parObj);
    if (filePath) {
        if(window){
            throw "此为浏览器客户端，无法将graphql写入文件，只能将其作为字符串返回！" ;
        }
        console.log("=======类型文件路径：", filePath);
        // 如果本地不存在这个文件，那么就会重新创建一个文件，如果存在此文件，那么在写入前，就清空原文件所有内容
        if (rewrite == true) {
            await new Promise(function (resolve, reject) {
                fs.writeFile(filePath, "", function (err) {
                    if (err) {
                        return console.error("文件内容写入失败", err);
                    }
                    console.log("=======清空文件内容：", filePath);
                    resolve();
                });
            })
        }
    }
    // 依次执行任务队列
    for (let i = 0; i < createGraphqlType.taskQue.length; i++) {
        await createGraphqlType.taskQue[i]();
    }
    if (!filePath) {  //没有传路径，返回字符串
        return createGraphqlType.returnStrQue.join("\n");
    }
}

module.exports = createGraphqlType;


