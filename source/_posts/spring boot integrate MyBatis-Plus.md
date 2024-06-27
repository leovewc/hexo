# spring boot 整合 [MyBatis-Plus](https://baomidou.com/getting-started/)

[参考资料](https://blog.csdn.net/weixin_48279836/article/details/115048463)

## fix bug

###  标准连接



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

### 生成代码连接

直接在对应数据库表的旁边右键就可以使用图形化mybatis-plus生成`domain``mapper``service``resource.mapper`的一些东西，遇到了几个逆天bug

#### 目录问题

我的`Applicatioin`在`com.example`里面，然后用生成方法生成的代码`generator`跟我的`com.example`居然是同级的，所以我的`Application`在进行`MapperScan`的时候扫不到完整的包，于是需要加上：

```java
@ComponentScan(basePackages = {"generator","com.example.study2"})
@MapperScan(basePackages = "generator.mapper")
```

来保证扫面到全部的包

#### MySQL问题

这个是真尼玛逆天

搞了半天是™的没开MySQL客户端导致程序搜不到 MySQL所以一直用的是H2（哪怕我把所有  H2的依赖都删完了），所以说还是不能直接用IDEA来编辑数据库，还是得开那个软件才有localhost.不知道以后能不能解决
