// ========以覆盖原文件内容的方式将graphql类型写入到文件中=========
const createGraphqlType = require("../create_graphql_type");
// 调用示例（注意：为了获取到正确的类型，数据示例的字段值不能为undefined或者null）
let parObj = {
    filePath: __dirname + '/test.graphql', //值为false:将类型定义输出到此路径文件， 值为false:返回字符串到函数调用处，默认为false
    rewrite: true,//表示是否以覆盖原文件内容的方式写入。true表示是,false表示以追加的方式写入文件. 默认为false:追加
    typeObj: {
        "code": 200,
        "data": {
            "ext": {},
            "size": 10,
            "items": [
                {
                    "ext": "",
                    "resourceId": "",
                    "mediaAssetInfo": "",
                    "productId": "python工程师",
                    "reportData": {
                        "eventClick": true,
                        "data": {
                            "mod": "popu_895",
                            "extra": "{\"utm_medium\":\"distribute.pc_search_hot_word.none-task-hot_word-alirecmd-1.nonecase\",\"hotword\":\"python工程师\"}",
                            "dist_request_id": "1628386601938_69042",
                            "index": "1",
                            "strategy": "alirecmd"
                        },
                        "urlParams": {
                            "utm_medium": "distribute.pc_search_hot_word.none-task-hot_word-alirecmd-1.nonecase",
                            "depth_1-utm_source": "distribute.pc_search_hot_word.none-task-hot_word-alirecmd-1.nonecase"
                        },
                        "eventView": true
                    },
                    "recommendType": "ali",
                    "index": 1,
                    "style": "word_1",
                    "strategyId": "alirecmd",
                    "productType": "hot_word"
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
    .then(() => {
        console.log("执行完成")
    })

