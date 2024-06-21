## 写在前面

推荐将本文与[Spring Boot 相关知识和工具类 ](C:\Users\李坤\OneDrive\桌面\swe2209523  li kun\learn\leovewc\GitHub\leo_blog\hexo\source\_posts\java-relevant-tool-knowledge.md)一文结合起来看，**本文为主，上面那篇文章为辅**，一起食用，以达到最佳效果，当然，大佬随意。

## IDEA创建Spring Boot工程

关于`Spring Boot`框架项目，**IDEA**为我们提供了比较快捷的创建方式，如下:

1. 点击右上角的`file`,选择`Project Structure`,如下图:

![捕获40.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02aa1631028b4f04b508e6a52f20a63b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=672&h=579&s=57129&e=png&b=3b3e40)

1. 选择左侧的`Modules`,点击上面的**加号**,如下图:

![捕获39.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7595574fefd4704b2206013ab39fb0e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1305&h=865&s=134723&e=png&b=3d4043)

1. 选择`New Module`

![捕获38.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16c3a7526974f32bb039d3a1a73f021~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1211&h=868&s=125635&e=png&b=3d4043)

1. 左边一栏选择`Spring Initializr`,右边一栏配置项目相关属性，如下图:

![捕获37.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c433de485a1d43f7998e5b117ab792bd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1083&h=813&s=76668&e=png&b=3d4042)

> 项目工程名，项目工程存储地址自定义，项目工程类型**Type**选择`Maven`,语言**Language**选择`Java`,后面三项建议不要改，直接默认即可，项目工程的软件开发工具包**project SDK**选择你自己安装的`java JDK版本`(我安装的是**JDK 17**)，**字段java** 选择你自己安装的`java JDK版本号`，我这里选择的是17,包类型 **Packaging**选择`Jar`。

5.点击Next后，选择该工程需要的依赖，这里我因为需要来开发**Web应用**，因此添加了Spring Web的依赖，又因为我选择了**MySQL数据库**来存储数据，因此我又添加了MySQL的依赖。

![捕获38.PNG](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96e5001212f84eafaeda2a41488f6ed5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1048&h=806&s=59859&e=png&b=3c3f41) ![捕获39.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f76cea60bc204eebbbfe5c4264789186~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1069&h=803&s=58957&e=png&b=3c3f41)

1. 选好依赖后，点击Finish,整个`Spring Boot`项目创建就完成了。

## Spring Boot整合Mybatis

具体的整合步骤请看[这个我的步骤](C:\Users\李坤\OneDrive\桌面\swe2209523  li kun\learn\leovewc\GitHub\leo_blog\hexo\source\_posts\spring boot integrate MyBatis-Plus.md)

在**SpringBoot**的配置文件`pom.xml`中引入`Mybatis`的起步依赖

![捕获34.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0dd5bcae5564b95bbe7eb9ec2c42cf8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=832&h=256&s=33454&e=png&a=1&b=2c2c2c) 引入好配置后，就可以正常使用`Mybatis`了。

### Mybatis 前后端交互详解

![图片1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4000262ab8644ad3a0659520863cc787~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1599&h=238&s=34696&e=png&b=fefefe) 如上图所示:

- `controller层`是故意暴露出来的，里面是一些接口，用来与前端页面进行交互。
- `service层`全是各种方法的接口，用来保护后端方法逻辑的具体实现，防止其源码泄露，该层作用类似于反向代理，每个接口都对应着一个具体方法的实现。
- `service层`后面是`implement逻辑层`，它是整个系统的核心部分，用来与数据库进行交互，实现对应的所有后端逻辑，与前面的`service层`中的接口一一对应，保证程序的正常进行。
- 再往后面走，就是`dao层`，即数据库，该层用于存放所有**可以与数据库进行交互**的方法接口，是十分重要的地方。
- `mapper层`是`dao层`中数据库方法接口的具体实现,与`dao层`方法接口一一对应。

### 前后端交互代码具体实现

**项目的具体结构图**:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17cb3af7d3d74917ae283456d5f9ee29~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=608&h=496&s=40785&e=png&b=3a3d3f) **`OneSpringbootApplication` 是启动类，运行该文件，整个项目就启动了**。

**连接数据库**:

![捕获40.PNG](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a92f6eb03df4f20bd1336ce10c6d9da~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1907&h=816&s=164796&e=png&b=2c2c2c) 打开resource目录下的application.properties文件,在里面配置数据库相关信息，如上图红框所示。

- `spring.datasource.driver-class-name`作用:设置JDBC驱动类的完全限定名。`com.mysql.cj.jdbc.Driver` 是MySQL Connector/J 8.0+的JDBC驱动类，它告诉Spring Boot应用程序要使用哪个类来加载和连接MySQL数据库。
- `spring.datasource.url`作用:设置数据库连接的URL(即数据库所在路径),`jdbc:mysql://localhost:3306/test233` 表示数据库服务器运行在本地主机（localhost），使用3306端口，并且想要连接名为test233的数据库。
- `spring.datasource.username`和`spring.datasource.password`作用是用来记录数据库的用户名和密码。
- `mybatis.configuration.map-underscore-to-camel-case=true` 作用是开启驼峰名与下划线命名之间的转换(**驼峰命名eatFood,下划线命名eat_food**)
- **使用上述数据库配置前提是你已经将数据库驱动依赖添加到了项目的配置文件中**(Maven的pom.xml)

**controller 层**:

```java
java复制代码
//注解@RestController用于标记一个类，表明该类是一个
//控制器，并且其下的方法都将前端页面的返回数据作为响应
//(即处理前端页面的http请求)

@RestController
public class HelloController {

    //注解@RequestMapping用于将http请求和处理请求的控制器方法(类方法)
    //关联起来，建立映射关系，
    // 该注解有一个参数value，其作用就是设置请求路径，设置当客户端发送何种请求时，
    //下面的方法才会处理该请求
    
    //该注解的参数value是一个String类型的数组，也就是其中可以存放多个数据
    
    //当前端向"/hello"发出请求时,下面的函数就会接收到请求，
    //并自动调用来处理该请求
    @RequestMapping("/hello")
    public String hello() {
        return "hello world!";
    }


   
//@Autowired 注解用于将下面的对象(已经通过组件扫描注册到了IOC容器中)通过
//依赖注入 从IOC容器中注入到字段(这里字段是“userService”)中以供使用，
// 该对象必须被IOC容器视为一个Bean

    @Autowired
    private UserService userService;

    @RequestMapping("/findById")
    public book findById(Integer ID){
        return userService.findById(ID);
    }
}
```

**service 层的项目结构**:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47810a15905942a6991d87f638dddff1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=524&h=116&s=5917&e=png&b=3b3e40) **service层的接口**:

```java
java复制代码
//该接口只是一个普通的接口，因此需要一个专门的类来实现这个接口中的方法
public interface UserService {
    public book findById(Integer ID);
}
```

**service层的接口的具体实现(impl层)**:

```java
java复制代码//@Service注解用于标识一个类作为服务层组件
@Service
public class UserServiceImpl implements UserService {

    //IOC容器通俗解释就是一个负责管理对象生命周期和对象间关系的“大管家”,
    //具体来说，当我们需要某个对象时，我们不再直接在代码中创建它，而是告诉
    //IOC容器我们需要这个对象,容器会根据我们的请求和配置信息，自动创建对象，
    //并处理对象之间的依赖关系,以及一切与项目本身业务逻辑无关的东西
    //(这个对象在项目开始运行时就已经提前创建好了)
    
    // 我们想要使用直接从容器的取出即可，并且容器中已创建的对象可以被本项目其他
    //地方共享和使用，这种对象就是统称为Bean
    //一般被Spring框架提供的注解标注了的类，它们的对象都会被Spring容器视为Bean
    //(Spring容器就是IOC容器)
    //类本身不是Bean,类对应的实例才是Bean




    //@Autowired 注解用于将下面的对象(已经通过组件扫描注册到了IOC容器中)
    //通过依赖注入 从IOC容器中注入到字段(这里字段是“userMapper”)中以供使用，
    // 该对象必须被IOC容器视为一个Bean
    
    @Autowired
    private UserMapper userMapper;

    //当子类继承父类并重写父类的方法时，@Override注解可以帮助编译器检查该方法
    //是否确实重写了父类中的方法
    // 如果子类的方法名、参数列表和返回类型与父类中的方法不一致，那么编译器会
    //报错，提示重写失败,这有助于开发者及时发现并修正重写错误，避免运行时错误
    //的发生
    
    //简单来说，该注解作用就是表明其下面的方法为重写的方法
    @Override
    public book findById(Integer ID) {   
    //对UserService接口中的方法进行重写(即接口方法的具体实现)
        return userMapper.findById(ID);
    }
}
```

**dao层与mapper层**:

```java
java复制代码//@Mapper注解用于标识一个接口为MyBatis的Mapper接口
// 这样，MyBatis就能知道这个接口是专门用于操作数据库的，进而能够自动为这个
//接口创建一个代理实现类
// 这意味着你可以直接在应用程序中注入这个接口的实例，并调用它的方法来执行SQL语句，
//而不需要自己手动实现这个接口
// 即直接拿来使用，不需要再手动的去定义一个类来专门实现这个接口
@Mapper
public interface UserMapper {

    //@Select注解在MyBatis框架中用于直接在Mapper接口的方法上编写SQL查询语句，
    // 从而取代了传统的在XML映射文件中编写SQL语句的方式
    
    //@Select注解内部可以编写具体的SQL查询语句，用于从数据库中查询数据,
    //@Select注解下方的对应方法函数与上面SQL语句成映射关系
    //调用方法函数就会自动执行上面的SQL语句，并将SQL语句的结果作为该方法函数的
    //返回值进行return
    //在@Select注解的SQL语句中，可以使用占位符（如#{param}）来绑定
    //下面方法中的参数
    @Select("select * from test233.book where ID=#{ID}")
    public book findById(Integer ID);
}
```

通过上面**注解**`@Select`和`@Mapper`来将传统的**Dao层**和**Mapper层**合在了一起。

**实体类层---entity层**:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/503323531c8f41d6bc7417aebff0319c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=405&h=114&s=4687&e=png&b=3c3f41)

```java
java复制代码public class book {

    private Integer ID;

    private String name;


    public book() {

    }

    public book(Integer ID,String name){
        this.ID=ID;
        this.name=name;
    }

    public Integer getID(){
        return this.ID;
    }

    public void setID(Integer ID){
        this.ID=ID;
    }

    public String getname(){
        return this.name;
    }

    public void setname(){
        this.name=name;
    }
}
```

该层的作用是**用于存放一些实体类，这些实体类将会被用来接收数据库中对应表的数据，**`一个类对应一张表，表的字段就是类的成员变量`，在前后端数据交互的过程中，这些实体类对象接收的数据会被系统自动转换成`JSON`数据格式。

## 文件上传(multipartfile)

`MultipartFile`是`Spring Boot`框架中的一个类，用于接收和处理前端上传的文件(**HTTP请求**),该类中提供了一些与文件操作相关的类方法:

![捕获.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bdee3ca4c254211aa694c9c2caf93a3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=821&h=298&s=139054&e=png&b=fbf6e8)

- `getOriginalFilename()` 获取到前端上传文件的文件名
- `transferTo(File dest)` 将前端上传文件的保存到目标文件dest中
- `getSize()` 获取前端上传文件的大小，单位:字节
- `getBytes()` 获取前端上传文件内容的字节数组
- `getInputStream()` 获取前端上传文件的输入流，可以将文件内容转换为字节数组或其他格式

## 常用注解

- **注解**`@Component`是一个通用注解，可以将标记的类实例作为`Bean`注入`IOC容器`中。
- **注解**`@ComponentScan("包路径")`用于**组件扫描**，扫描对应路径下的包当没有包路径时，默认扫描启动类同级的包和各自下面的子包。

> **组件扫描**:如果遇见被`Spring Boot`提供的注解标记了的类，那么这些类的对象会被视为`Bean`，`SpringBoot`会自动将这些类实例化并注入`IOC容器`之中，供应用程序在运行时使用，若存在组件未被扫描到，则系统不会创建组件当中的`Bean实例`，也不会创建该组件，与之相关联的`其他Bean`将会注入失败，与之相关联的功能组件将缺失。

- **注解**`@Bean`作用:将标记的方法的返回值交给`IOC容器`，成为`IOC容器`的`bean`对象(当`Spring容器`启动时，它会查找`@Configuration`**注解**的类，并调用这些类中的`@Bean`注解的方法，将返回的实例注册为`Bean`,注入到`IOC容器`当中)。
- **注解**`@RestController`用于标记一个类，表明该类是一个控制器，并且其下的方法都将前端页面的返回数据作为响应(**即处理前端页面的http请求**)。
- **注解**`@RequestMapping`和**注解**`@PostMapping`都是用于将`http请求`和处理请求的控制器方法(类方法)关联起来，建立映射关系，这两个注解都有一个`参数value`，其作用就是设置请求路径，设置当客户端发送何种请求时，下面的方法才会处理该请求,该注解的`参数value`是一个String类型的数组，也就是其中可以存放多个数据。
- 注解：

> Post 与 Requst 的区别:
>
> - **Post** 它要求被请求服务器要对它所提交的请求进行确认或者处理后才能给予响应，相对更加安全，效率也相对低点
> - **Requst** 它是更广泛地用于发送和接收数据,会将参数暴露在Url中，相对不安全，效率相对高点

- **注解**`@Autowired` 用于将其标记的对象(**已经通过组件扫描注册到了`IOC容器`中**)通过**依赖注入** 从`IOC容器`中注入到字段(**这里字段是“userService”**)中以供使用。该对象必须被`IOC容器`视为一个Bean，因为只有这样才能保证IOC容器中拥有该对象。
- **注解**`@Service`用于标识一个类作为服务层组件。
- **注解**`@Override`可以帮助编译器检查该方法是否确实重写了父类中的方法。
- **注解**`@Mapper`用于标识一个接口为`Mapper`接口,这样，`MyBatis`就能知道这个接口是专门用于操作数据库的，进而能够自动为这个接口创建一个代理实现类,这意味着你可以直接在应用程序中注入这个接口的实例，并调用它的方法来执行SQL语句，而不需要自己手动实现这个接口;**即直接拿来使用，不需要再手动的去定义一个类来专门实现这个接口**。
- **注解**`@RestControllerAdvice` **主要用于标注一个类来进行全局异常处理和全局数据绑定,该类中的方法会被同项目的其他程序自动调用**,可以用于定义全局响应结果处理程序，确保应用程序返回给客户端的响应具有统一的格式和结构,总之，该注解作用就是标记其下面的类为一个全局的异常处理和所有数据预处理的"中央处理器"。
- **注解**`@ExceptionHandler(异常类类名.class) `用来标注处理 异常类 的方法,此处的异常类可以是自定义的异常类,**使用该注解可以捕获指定的异常，并按照自定义的方法处理该异常,一般与上面的注解配合使用**。
- **注解**`@RequestBody`用于将 HTTP **请求体**中的数据绑定到对应的方法参数上。

```java
java复制代码 @PostMapping("/create")  
    public String create(@RequestBody MyObject myObject) {  
   // 在这里，myObject 已经被自动填充了请求体中的数据  
  // 你可以直接操作这个对象，而不需要手动解析请求体  
          
        // ... 处理 myObject 的逻辑 ...  
          
        return "Object created successfully";  
    }  
```

- **注解**`@ResponseBody`:用于标记一个方法的返回值应该被绑定到**响应体**。然而**注解**`@RestController`已经默认组合了**注解**`@ResponseBody`，也就是说**注解**`@RestController`标记的类下面的所有方法的返回值都会自动绑定到了响应体中。

> 在HTTP通信中，请求体（**Request Body**）和响应体（**Response Body**）是两个重要的概念，它们分别代表了HTTP请求和响应中携带的数据部分,里面可以携带的数据类型主要是**JSON**格式和**表单数据**。
>
> **表单数据**：当发送一个包含表单字段的HTTP POST请求时，请求体可能包含`application/x-www-form-urlencoded`类型的数据。这种格式将表单字段和值编码为键值对，并使用`&`符号分隔,将这些数据放在请求体当中,一同发送给服务器。
>
> **queryString格式数据**就像是我们给网站地址“附加”一些额外的信息。比如，我们想在搜索引擎里搜索“苹果”，我们可能会输入`http://search.com/?q=苹果`。这里的`?q=苹果`就是`queryString`，它告诉我们搜索引擎要搜索的关键字是“苹果”。这种方式很适合传递少量、简单的信息。

- **注解**`@CookieValue`:用于绑定cookie值到方法参数。

```java
java复制代码@GetMapping("/cookie") 
public String cookie(
@CookieValue("JSESSIONID") String sessionId) { 
// ... 
}
//将cookie中的键JSESSIONID对应的值赋给sessionId
```

- **注解**`@RequestHeader`:用于绑定请求头到方法参数。

```java
java复制代码@GetMapping("/header") 
public String header(
@RequestHeader("User-Agent") String userAgent) { 
// ... 
}
//将请求头中的键User-Agent对应的值赋给userAgent
```

- **注解**`@Validated` 主要用于触发方法参数的校验,将它标记在类上，告诉系统该类中有方法需要进行参数校验。
- **注解**`@Pattern` 用于验证一个字符串是否符合指定的正则表达式(**参数regexp**存放指定的正则表达式),通常应用于类的字段、属性或方法的参数上，以确保输入的数据满足特定的格式要求。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20c803a4ba90479d9a6fda977b4d4be2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1272&h=129&s=20940&e=png&b=2c2c2c)

- **注解**`@NotNull`该注解标记的变量的值不能为null。
- **注解**`@NotEmpty`该注解标记的变量的值不能为null,且如果是字符串的话,不能为空字符串。
- **注解**`@Email`该注解标记的变量必须满足邮箱格式

> 上面这三个**注解**是放在实体类中的,当实体类作为方法参数时，外部有**注解**`@Validated`标记且参数本身又是请求体的映射(`@RequestBody`)时，其内部的注解才会生效(**这只对实体类内部`Validation依赖`相关的注解有效**)。

![捕获28.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/633c09b47883416c8d1020e5173a33d4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1337&h=618&s=349978&e=png&b=fcfbfb)

- **注解**`@URL` 用来判断其标记的参数是否是一个合法的**url**地址。

![捕获36.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/103a3eb41c4c41f38e83c5fba9fab809~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=591&h=141&s=16055&e=png&b=2c2c2c)

- **注解**`@Test` 用于标记一个方法是测试方法，这样测试框架就能自动识别并运行它。
- **注解**`@JsonIgnore`,该注解标记的成员变量，当系统将数据转换成`JSON格式`时,将会忽略掉该成员变量的值(保护密码不被泄露)
- **注解**`@JsonFormat(pattern = "yyyy-MM-dd HH-mm-ss")`   用来指定存放时间的字段的时间输出的格式(**年-月-日 时-分-秒**)

> **数据库相关注解**在`MyBatis`框架中用于直接在**Mapper接口**的方法上编写SQL语句，从而取代了传统的在XML映射文件中编写SQL语句的方式，这些**数据库相关注解**，其内部可以编写具体的SQL查询语句，用于从数据库中增删查改数据,**数据库相关注解**下方的对应方法函数与上面SQL语句成**映射关系**,调用方法函数就会自动执行上面的SQL语句，并将SQL语句的结果作为该方法函数的返回值进行`return`,**在数据库相关注解的SQL语句中，可以使用占位符（如`#{param}`）来绑定标记的方法中的参数。**

数据库相关注解有:

- **注解**`@Select`用于标注查询语句
- **注解**`@Insert`用于标注插入语句
- **注解**`@Update`用于标注更新语句
- **注解**`@Delete`用于标注删除语句

## 传统xml文件映射(配置动态的SQL语句)

在`Mapper`接口层,可以直接使用注解来将`SQL语句`映射绑定到对应方法上，如下:

```java
java复制代码
@Mapper
public interface CategoryMapper {

    //新增文章分类
    @Insert("insert into big_event.category(category_name, category_alias, create_user, create_time, update_time) " +
            "value(#{category.categoryName},#{category.categoryAlias},#{category.createUser},now(),now())")
    public void addCategory(Category category);


    //通过文章的分类名查找分类
    @Select("select * from big_event.category where category_name=#{categoryName}")
    public Category findByCategoryName(String categoryName);

    //通过文章的分类ID查找分类
    @Select("select * from big_event.category where id=#{id}")
    public Category findById(Integer id);

    //通过用户ID获得其创建的所有分类
    @Select("select * from big_event.category where create_user=#{userId}")
    public List<Category> findByCreateUser(Integer userId);
 }
```

但是，上面却无法映射绑定**动态的SQL语句**到对应方法上，要想映射`动态的sql语句`，就只要采用**传统的数据库映射方式----xml文件映射**。

### xml映射文件要求

`xml配置文件`必须放在`resources` 目录下,在该目录下，它的路径必须与`Mapper层接口`所在路径一致。

> 例如`Mapper层接口`路径:**com.example.two_project.mapper**,那么对应的`xml文件`路径就必须是**resources/com/example/two_project/mapper**

### xml文件配置动态SQL语句

```xml
xml复制代码<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.two_project.mapper.ArticleMapper">
<!-- namespace 必须是对应的Mapper层接口的全类名   -->
 
    
    <select id="list" resultType="com.example.two_project.entity.Article">
        select * from big_event.article
        <where>
            <if test="state!=null">
                state=#{state}
            </if>

            <if test="categoryId">
                and category_id=#{categoryId}
            </if>

            and create_user=#{id}
        </where>
    </select>

</mapper>
```

> `<select> 标签`就表示**Select语句**,属性`id`为该条SQL语句对应的函数的函数名, 属性`resultType`为数据库查询结果的每一条数据的返回类型(即该表对应的实体类的全类名)

> `<where> 标签`就是SQL语句中的**where**,与一般的where相比，它的区别是它可以通过**if**的判断来动态地改变查询条件

> `<if> 标签`中的`test参数`为判断条件，如果条件满足，则将标签内的语句加入**where**当中且若这是**where**中的第一个条件， 那么该条件前面的**and**将会被省略,若不满足，则不将标签内的语句加入.

**文件对应的映射方法中的参数可以直接在标签中使用**

### xml映射文件的配置

```xml
xml复制代码<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="">
```

## Spring Boot 配置文件

### 配置文件的格式

**Spring Boot**的配置文件有两种格式，分别是`.properties`和`.yaml`/`yml`,两种配置文件的作用并没有什么区别，只是写法上有所不同:

![捕获1.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7367fc08e314e5cb650e9aec5db4780~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=609&h=429&s=82492&e=png&b=fef8f5)

**在企业级开发中，更加常用的是.yml格式的文件**

![捕获2.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ecdfc6729ae4ec38b06a941da0247ba~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=527&h=325&s=61515&e=png&b=fffefe)

### 书写配置信息

不只是`.yml`格式的配置文件，`.properties`格式也是一样的，它们都可以用来书写第三方技术配置信息也可以来书写自定义的配置信息；当书写自定义配置信息时，如下图:

![捕获3.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/808edad7e5eb4fdc885cb54fbd165109~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1131&h=472&s=268458&e=png&b=fdf7f4)

将程序中的一些静态属性放在一起，写成一个配置文件，这样当属性发生变化时就不用改代码，只需要修改配置文件，然后重启服务器即可。 ![捕获4.PNG](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28e81095f7014999986de84e5a68f994~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=942&h=447&s=109183&e=png&b=fefaf9) 如上图所示，是书写`.yml`配置文件的一些要求。

![捕获5.PNG](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4cf1541bb4d1499fb82bdb025372cd8a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1238&h=466&s=255922&e=png&b=faf9f9) 如上图中的属性`"hobbies"`,表示该属性是一个数组类型，格式:` "-"+" "+数组中的元素`

### 获取配置信息

当属性写入属性文件后，在代码中，我们该如何获取这些属性呢?

![捕获6.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c16035eefdc94e079612e68eda1326c5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1174&h=468&s=229332&e=png&b=fdf9f8) 如上图所示，通过**注解**`@Value("{键名}")`来获得对应的属性，该注解下面的变量就是用来接收对应属性(键)的值的。但是如果属性过多，又不想给每一个变量都写注解，则可以采用下面这种方法:

![捕获7.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b189a6589b349b0916354d0372e8cd6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1175&h=475&s=222527&e=png&b=fdf9f8)

如上图，在对应的类上面加**注解**`@ConfigurationProperties(prefix="前缀")`(**这里的前缀也是在配置文件中由用户自定义的**),当使用了该注解后，其类下面对应的成员变量名必须与配置文件中**同一前缀**的属性名相同且一一对应。

## Bean 注册

第三方若想注册为`Bean`(即被`SpringBoot`自动创建实例并注入`IOC容器`)，只靠在对应类上添加一般的注解是不行的，这里就需要特殊的注解了。

### 第三方注册为Bean方式一

**方式一**，在启动类中添加方法，并在该方法上面添加**注解**`@Bean`,如下图:

![捕获21.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43017814a1a44972a9afeb8d80860730~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=641&h=343&s=94217&e=png&b=fef7f0)

> `@Bean`**注解**作用:将标记的方法的返回值交给`IOC容器`，成为`IOC容器`的`bean`对象(当`Spring容器`启动时，它会查找`@Configuration`**注解**的类，并调用这些类中的`@Bean`注解的方法，将返回的实例注册为`Bean`)

也可以单独开一个配置类(**注解**`@configuration`标记的类)的文件，将所有想注册为`Bean`的第三方集中处理，如下图:

![捕获22.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/553cb2c6ada84b02b009af27be9cc94e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=583&h=286&s=51056&e=png&b=fef9ec)

如果在**注解**`@Bean`标记的方法中想使用在`IOC容器`中已经注册的`Bean对象`，那么只需要在方法上声明即可，`spring`会自动的注入，如下图(`country`是已经在`IOC容器`中注册好的Bean对象)。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/562bf4e5d9844e4ca8f262c97e3e2429~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=965&h=389&s=108448&e=png&b=fdfcfc)

### 第三方注册为Bean方式二

**方式二**, 通过**注解**`@Import`将对应的第三方类引入，`Spring容器`会自动将其类的对象注册为`Bean`，注入`IOC容器`中。

- **引入格式**:`@Import(xxx.class)`
- **引入位置**:整个项目的启动文件当中。

![捕获24.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86c010fc56b474fad78d300f02e04cc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=665&h=283&s=65075&e=png&b=fef8ec)

`@Import(类名.class)`，其中引入的这个类可以普通类，也可以是配置类(`@configuration`标记了的类),或者是`ImportSelector接口实现类`。

**ImportSelector接口实现类**: ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7dcdc54e81f43868a592bc4b169c4a0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=712&h=228&s=97822&e=png&b=fcf7ea) 如上图所示，我们首先要实现`ImportSelector`这个接口，重写其中的 `selectImports()`方法(该方法是自动调用的)，返回值**返回一个字符串类型的数组**，该数组中的每一个字符串都是用户需要注册为Bean对象的类的地址(全类名)。然后**注解**`@Import`只需要引入这个接口实现类的类名即可，这样就避免了因引入的类太多，导致代码不美观的问题。

**在一般开发中，`ImportSelector`接口实现类的方法的返回值的这个字符串数组一般不是写死的，而是从配置文件中读出来的**。

在**Resources/META-INF/spring/** 目录下，创建**后缀名**为`.imports`的配置文件，里面书写上所有自定义的需要注册为Bean的类的地址(全类名)，一个类占一行。

读取配置文件中的信息，示例如下图:

![捕获29.PNG](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f2b8a4c9ba43499032c111105cdd91~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1070&h=363&s=158990&e=png&b=f3f2f2) ![捕获30.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d186c4719d2b4f3aa1b77e3f87780b27~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1014&h=290&s=65980&e=png&b=fdfbfb) 如图，**imports**是设置的一个字符串列表，用于存放配置文件中的各个类的全类名;**is** 是获取到的输入流，后面的 **"common.imports"** 是配置文件名,整行代码的作用就是**将配置文件中的数据转换成输入流存入变量`is`中**，下面的变量**br**是对输入流的一个封装，将其封装成一个缓冲字符流。`while`循环是用来按照每一行来读取缓冲字符流当中的数据，并用字符串变量`line`来接收，将每一行数据添加至字符串列表`imports`当中，所有数据读取完毕后，要关闭缓冲字符流`br`；最后，将字符串列表转换成字符串数组返回回去。

### 自定义组合注解

![捕获31.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa05a3281d574a7b820c0732603c6e44~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1234&h=555&s=186154&e=png&b=fdfcfc) **如上图所示，选择`Annotation`,创建自定义的组合注解**。

![捕获32.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/328cd49d2aac4c1f868e7954a0079e2b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=896&h=353&s=82047&e=png&b=fdfbfb) 如上图所示，上面两个注解都是必不可少的。第一个是表明该自定义注解可以在类上使用，第二个表明该自定义注解在系统运行期间，一直存在。除了这两个注解，其他的均可以自定义。若要使用这个注解，就像普通注解一样直接使用即可，注解名为创建的组合注解的文件名。常用于实现下图第三条:

![捕获33.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9487cbb2a7e1490b8f50418fc8da0cbe~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=453&h=246&s=26432&e=png&b=fefefe)

## Bean 的注册条件

用户可以通过**注解**`@Conditional`的衍生注解来设置对象注册为Bean的条件，常用的注解如下图所示。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/859c5fc47ac64d4ea984da3218335175~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1063&h=350&s=125831&e=png&b=f5f4f4)

在配置类中，**注解**`@Bean`所标记的方法，其返回值会被注册为Bean，我当然可以提前为要注册为Bean的对象赋值，如下图，在方法的参数上通过**注解**`@Value("${键名}")`来确保每个参数被传入指定的值。**注解**`@ConditionalOnProperty(prefix="前缀",name={"键名1","键名2"})`  来判断配置文件中是否存在对应属性，若不存在，则其下面整个方法的返回值将不再被注册为Bean。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30f46e5bacac4fb781da0d4f612b6aba~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1040&h=287&s=120452&e=png&b=fdfcfc) **注解**`@ConditionalOnMissingBean(类名.class)`,如下图所示,如果`IOC容器`中不存在`Country类`的Bean对象，则执行下面的方法，注入`Province`,否则不注入。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddb4a4bba3b64dd2aef1e7b46a7d8a55~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=464&h=156&s=46898&e=png&b=fefaf9)

**注解**`@ConditionalOnClass(name="类的完整路径名")`,如下图所示，如果当前配置环境存在指定的类，则执行下面的方法，注入`Province`,否则不注入。 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1dc944ecc3a4faf80354c76197ee2d3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1062&h=290&s=106142&e=png&b=fcfafa)

## 自动配置的原理

**自动配置**就是在`SpringBoot`程序启动后，起步依赖中的一些`Bean对象`会自动注入到`IOC容器`之中。

> 原理:**在`jar`包内定义了一些类，目的是想要这些类的实例作为Bean注入到`IOC容器`中，即自动注入**;首先定义一个**配置类**，配置类中用**注解**`@Bean`来标记方法，通过这些方法，`SpringBoot`会将它们返回的实例作为Bean注入到`IOC容器`中，再定义一个自动配置类，加上两个**注解**`@import(配置类类名.class)`和`@AutoConfiguration`;前者引入了配置类,保证其在不同级目录下也可以使用，后者标识这是一个自动配置类。最后在项目的**resources**目录下的**META-INF**目录下的**spring**目录下再定义一个后缀名为`.imports`的文件，在文件中加入该自动配置类的全类名;当系统启动时，系统会在该目录下(**"/resources/META-INF/spring/xxx.imports"**)的配置文件中找是否有自动配置类(**注解**`@AutoConfiguration`标记的类)，有就自动调用实例化该类。实例化该类，会导致系统通过`@import`访问到配置类，配置类中的方法会被自动调用，这样就自动配置就搞定了。

**`@Configuration`与`@AutoConfiguration`注解的区别**:

1.` @Configuration` 必须通过组件扫描，才能自动配置Bean，若不在启动类的同级目录或子目录下，则需要`@ComponentScan("路径")`来专门指定扫描。

1. `@AutoConfiguration` 会被加载执行两次，一次是由`@ComponentScan`（如果配置了的话），另一次是由自动配置机制，也就是说只要该类在该项目下，且**配置文件`.imports`** 里有该类的全类名,该类就会被系统自动调用，自动配置Bean。
2. `@Configuration`与`@AutoConfiguration`**注解**一般配合使用。

作者：freejackman
链接：https://juejin.cn/post/7352144724294516790
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。