// ========以字符串形式返回graphql类型内容=========
const createGraphqlType = require("../create_graphql_type");
// 调用示例（注意：为了获取到正确的类型，数据示例的字段值不能为undefined或者null）
let parObj = {
    filePath: false, //值为false:将类型定义输出到此路径文件， 值为false:返回字符串到函数调用处，默认为false
    typeObj: {
        "code": 200,
        "data": {
            "ext": {},
            "size": 10,
            "items": [
                {
                    "ext": ""
                }
            ]
        },
        "message": "success"
    },
    typeWay: 'type',
    typeName: 'testType'
};

// 执行
createGraphqlType(parObj)
    .then((d) => {
        console.log("执行完成", d)
    })

