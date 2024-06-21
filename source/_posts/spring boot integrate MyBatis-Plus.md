# spring boot 整合 [MyBatis-Plus](https://baomidou.com/getting-started/)

[参考资料](https://blog.csdn.net/weixin_48279836/article/details/115048463)

## fix bug

```yml
spring:
  application:
    name: study2
  datasource:
    url: jdbc:mysql://localhost:3306/car?useSSL=false&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 064584
server:
  port: 8150
```

主要就是注意url里面`?`前面要换成自己的数据表名

然后因为我的表名叫`test` ,但是一般表名都要是首字母大写，所以我只能多引入`TableName`and`TableId`来改变名字：

```java
package com.example.study2.pojo;
import com.baomidou.mybatisplus.annotation.TableId;     #
import com.baomidou.mybatisplus.annotation.TableName;   #
import lombok.Data;

@Data
@TableName("test")                  #
public class User {
    @TableId                        #
    private Integer id;
    private String name;
    private Integer age;
    private String sex;
}
```