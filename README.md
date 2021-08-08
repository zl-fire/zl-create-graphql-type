
cdn:
https://cdn.jsdelivr.net/npm/zl-create-graphql-type@1.0.0/create_graphql_type.js

# zl-create-graphql-type

  在使用node编写graphql接口时：自动解析数据结构，动态生成对应的graphql类型

## 1. 模块基本说明
* 此模块即可在浏览器环境下运行，也可在node环境下运行
* 在浏览器环境下运行，将会返回生成的graphql类型字符串内容
* 在node环境下运行，即可返回字符串内容也可直接生成文件到需要的位置处

## 2. 起因

在开发中，需要将一个项目原本的rest风格接口转换为graphql方式的接口，如下：

  * java的dubbo接口----》node中间层处理生成rest接口----》前端页面调node的http接口
   **变为**
  * java的dubbo接口----》node中间层处理生成graphql接口----》前端页面调node的graphql接口

由于graphql中每个接口的参数，返回值等，都需要显示的声明graphql对应的类型，且grahpql的类型就 String、Int、Float、Boolean 和 ID 几种，比较单调. 

而手动构建graphql接口所需要的类型也比较麻烦,所以这里写了个 graphql类型生成器，自动解析数据结构，然后生成相应的graphql类型。
