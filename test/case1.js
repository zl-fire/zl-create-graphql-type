// ========以覆盖原文件内容的方式将graphql类型写入到文件中=========
const createGraphqlType = require("../create_graphql_type");
let parObj = {
    filePath: __dirname + '/test.graphql', 
    rewrite: true,
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

