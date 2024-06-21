## 写在前面

此文是对[后端开发框架Spring Boot快速入门 ](C:\Users\李坤\OneDrive\桌面\swe2209523  li kun\learn\leovewc\GitHub\leo_blog\hexo\source\_posts\java-backend-1.md)一文的知识点补充与完善，如果是**新手小白建议两篇文章一起食用,上面那篇文章为主，本文为辅**，以达到最佳效果，大佬随意。

## http 五种与后端的交互方法

1. **Get**:主要用于请求数据。当客户端需要从服务器获取数据时，通常会使用**GET**方法。
2. **Post**:主要用于提交数据，特别是在创建新的资源或提交表单时。
3. **Put**:用于更新资源。与**POST**不同，**PUT**请求通常用于替换整个资源的内容。
4. **Delete**:用于删除资源。
5. **Patch**:用于部分更新资源。与PUT不同，PATCH请求只更新资源的部分属性，而不是整个资源。

## queryString 格式与 urlencoded 格式区别

`queryString`格式就像是我们给网站地址“附加”一些额外的信息。比如，我们想在搜索引擎里搜索“苹果”，我们可能会输入`http://search.com/?q=苹果`。这里的`?q=苹果`就是`queryString`，它告诉我们搜索引擎要搜索的关键字是“苹果”。这种方式很适合传递少量、简单的信息，并且通常用于GET请求。

`x-www-form-urlencoded`格式则更像是我们把一个完整的表单数据“打包”起来发送给服务器。

**两者区别在于前者存放在`url路径`后面，后者存放在`请求体`里面。**

## 登录认证

> 除了登录接口，其他接口在用户访问前都必须对用户的登录状态进行检查(**作用:保护数据,防止数据泄露**),这个检查过程就叫作**登录认证**。

### 令牌技术

**令牌技术**就是用来实现登录认证的，浏览器访问登录接口，用户登录成功后，就会生成一个令牌响应给浏览器，浏览器拿到令牌后，访问其他接口时都必须拿上这个令牌，其他接口在用户访问前都会检查该令牌，令牌有效，则允许访问。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd0c71222ddf4267b95df81b3073b3eb~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1073&h=550&s=175774&e=png&b=fbf3f3)

### 令牌的要求

令牌技术需要的令牌是要满足一定要求的。

> - **令牌**其实就是一个字符串。
> - **令牌**必须能承担一定的业务数据，如令牌上可以存放具体用户的用户信息(`用户要访问的目标接口如果需要，能直接使用该用户的个人信息，减少查询数据库的次数，提高效率`)等。
> - **令牌**必须要防止篡改，保证其中的信息合法和安全。

具体要求如下图:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b395fcadb5c846159aa8614b1bb2ed1d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=627&h=214&s=54129&e=png&b=fdfafa)

### JWT令牌规范

**JWT 规范**是`Web`开发中最常用的一种令牌规范，具体介绍如下。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac1e9cd05ae446739e680b6bbfb067a5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1369&h=676&s=346663&e=png&b=fdf8f8)

如上图,JWT 令牌分为三部分组成,每个部分都是由对应的**JSON格式数据**通过**Base64编码方式**(`国际通用编码方式`)编码过的。

- 第一个部分(**头**) `"alg"`是该令牌使用的数据加密算法的类型，`"type"`是该令牌的规范的类型。
- 第二部分(**有效载荷**) 用于携带一些用户自定义信息(`为了防止泄露，此处不建议携带私密数据`)。
- 第三部分(**签名**)根据该令牌前两个部分的内容，利用**加密算法**(就是头部记录的那个算法)进行数据加密。`浏览器接口就是通过签名来判断前面两个部分的数据是否被篡改的。`

### 令牌示例

**使用该类前提是引入依赖**:

```xml
xml复制代码<!--java JWT令牌规范 起步依赖-->
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>4.4.0</version>
</dependency>
java复制代码
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTest {

    
    //获取token
    public void testGen(){

        //创建了一个集合,Object 是所有类的根基，这意味着该集合中的值可以
        //是任意类型
        Map<String,Object>claim =new HashMap<>();

        //为claim集合插入数据
        claim.put("id",1);
        claim.put("username","张三");

        //生成JWT 的代码
        String token= JWT.create()
                .withClaim("user",claim)   
                //添加负荷  withClaim(键,值)
                
                .withExpiresAt(new 
                Date(System.currentTimeMillis()+1000*60*60*12))    
                //添加过期时间，即JWT失效时间(这里是12小时)
                
                .sign(Algorithm.HMAC256("it"));   .
                //指定加密算法，配置密钥(密钥是自定义的)
                
 
//密钥（Key）主要用于加密和解密数据

//new Date()是用来创建一个新的 Date 对象，该对象表示当前日期和时间
// (自1970年1月1日00:00:00 GMT以来的毫秒数，然后可能跟随一个特定的时区表示)
//System.currentTimeMillis() 获得当前毫秒值(与new Date()效果相同)
//上面代码外面套了个new Date()是因为withExpiresAt()函数要求参数必须
//是一个Date对象

    }

    
    //验证token
    public void testP(){

        //用户传过来的token
        String token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
                ".eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IuW8oOS4iSJ9LCJleHAiOjE3MTIxMDQxMjR9" +
                ".i7XygJGq-DwNQOv0L89ZL1NrUSccRARsBaMqzb-yRWY";

        JWTVerifier  jwtVerifier=JWT.require(Algorithm.HMAC256("it"))
        .build();
        //获得token的验证器,加密算法要与token的一致

        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        //验证token,生成一个解析后的JWT对象

        Map<String, Claim> claims = decodedJWT.getClaims();
        //获得解析后的JWT对象的所有载荷

        System.out.println(claims.get("user"));

    }
}
```

## token令牌生成和校验工具类(JWT令牌规范)

**使用该类前提是引入依赖**:

```xml
xml复制代码<!--java JWT令牌规范 起步依赖-->
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>4.4.0</version>
</dependency>
```

**使用此类**:

```java
java复制代码
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.Map;

public class JwtUtil {

    private static final String KEY = "itheima";
   
   //接收业务数据,生成token并返回
    public static String genToken(Map<String, Object> claims) {
        return JWT.create()
                .withClaim("claims", claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 12))
                .sign(Algorithm.HMAC256(KEY));
    }

   //接收token,验证token,并返回业务数据
    public static Map<String, Object> parseToken(String token) {
        return JWT.require(Algorithm.HMAC256(KEY))
                .build()
                .verify(token)
                .getClaim("claims")
                .asMap();
    }

}
```

## 拦截器

### 定义拦截器(此处用于登录认证)

该类是一个**拦截器**，能拦截前端发出的**http**请求，进行预处理，再决定放不放行。其中，有两个需要重写的方法，如下:

- `preHandle()` 方法位于 Controller层对应接口的方法调用之前执行,可以用来拦截请求，对请求进行预处理，如验证token令牌等。
- `afterCompletion()` 方法用于在整个请求结束之后进行一些清理工作，或者记录一些请求处理完成后的信息。在Controller层对应接口的方法处理完请求后调用。

**定义拦截器**:(该拦截器用来进行**登录认证**)

```java
java复制代码
import com.example.two_project.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Map;

//该类是一个拦截器，能拦截前端发出的http请求，进行预处理，
//再决定放不放行


//@Component是一个通用注解，可以将标记的类实例作为Bean
//注入IOC容器中
@Component
public class LoginInterceptors implements 
HandlerInterceptor {

   //HttpServletRequest类的对象表示一个 HTTP 请求
   //当你与前端页面交互时，收到了一个Http请求，你
   //可以用一个 HttpServletRequest 对象来当作这个http请求

   //HttpServletResponse类的对象表示一个 HTTP 响应
   //当你与前端页面交互时，收到了一个Http请求，你
   //可以用一个 HttpServletResponse 对象来当作这
   //个http请求响应
   

   //preHandle() 方法位于 Controller层对应接口的方法调用
   //之前执行

   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

       //从该http请求中获取token
       String token = request.getHeader("Authorization");

       //验证token
       try {
           Map<String, Object> claims = JwtUtil.parseToken(token);

           //将该请求放行
           return true;
       } catch (Exception e) {

           //根据接口文档，要求http状态响应码为401
           response.setStatus(401);

           //将该请求不放行
           return false;
       }
   }
   
   
//afterCompletion() 方法用于在整个请求结束之后进行一些
//清理工作，或者记录一些请求处理完成后的信息。
//在Controller层对应接口的方法处理完请求后调用
@Override
public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
   //使用完业务数据后，清除数据,防止内存泄露
   ThreadLocalUtil.remove();

   }
}
```

### 注册拦截器

该类用来**注册拦截器**，即将拦截器添加到系统中,以便系统能识别和使用它。

**拦截器注册**:

```java
java复制代码
import com.example.two_project.interceptors.LoginInterceptors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//该类用来注册拦截器，即将拦截器添加到系统中,以便系统
//能识别和使用它

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    LoginInterceptors loginInterceptors;   
    //获取已定义好的拦截器

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptors)
                .excludePathPatterns("/user/login","/user/register");

 //registry是一个注册器,  addInterceptor()方法用来
 //注册拦截器，注册过后，默认拦截所有请求
 
 //excludePathPatterns()方法设置保护路径，即该路径
 //的请求，系统不拦截
    }
}
```

## ThreadLocal(线程局部变量)

`ThreadLocal `提供线程局部变量,用`set()/get()`来存取数据,它存储的数据都具有线程隔离,即同一变量,在不同线程中取出来的值是不同的,如下图。 ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f5b496c38a34c5d89d0bf9b14fc3ab6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=803&h=678&s=139244&e=png&b=f7f4f3) 上图,蓝色线程里`get()`到的就是"萧炎",绿色线程里`get()`到的就是"药尘"。

**应用场景**:

当同时有多个用户访问系统时,Tomcat就会为每个用户自动创建一个对应的线程，来执行各自的用户操作。

当系统中多个接口或多个层都要使用同一个变量时，可以直接将该变量设置为一个全局变量,**设置一个全局threadlocal变量,既保证所有线程均可调用(`普通的全局变量所有的线程均可调用和修改`)，又保证每个线程拿到的值不同**，如下图。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/997b5a0681a2429fbbbf339cb4d0c745~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1407&h=689&s=256050&e=png&b=efe8e4)

## ThreadLocal工具类(线程局部变量)

该类直接拿去使用即可。

```java
java复制代码
import java.util.HashMap;
import java.util.Map;

/**
 * ThreadLocal 工具类
 */
@SuppressWarnings("all")
public class ThreadLocalUtil {
    //提供ThreadLocal对象,
    private static final ThreadLocal THREAD_LOCAL = new ThreadLocal();

    //根据键获取值
    public static <T> T get(){
        return (T) THREAD_LOCAL.get();
    }
   
    //存储键值对
    public static void set(Object value){
        THREAD_LOCAL.set(value);
    }


    //清除ThreadLocal 防止内存泄漏
    public static void remove(){
        THREAD_LOCAL.remove();
    }
}
```

## 密码加密工具类(md5加密)

该类直接拿去使用即可。

- 通过该**类的静态方法** `getMD5String(String password) `:传入普通密码(String类型)来获得加密后的新密码(String类型),无需解密。
- 通过该**类的静态方法**`checkPassword(String password, String md5PwdStr)`来判断用户输入的普通密码与存放在数据库中的加密后的新密码是否相同,返回值为Boolean类型。

```java
java复制代码
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Md5Util {
    /**
     * 默认的密码字符串组合，用来将字节转换成 16 进制表示的字符,apache校验下载的文件的正确性用的就是默认的这个组合
     */
    protected static char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

    protected static MessageDigest messagedigest = null;

    static {
        try {
            messagedigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException nsaex) {
            System.err.println(Md5Util.class.getName() + "初始化失败，MessageDigest不支持MD5Util。");
            nsaex.printStackTrace();
        }
    }

    /**
     * 生成字符串的md5校验值
     *
     * @param s
     * @return
     */
    public static String getMD5String(String s) {
        return getMD5String(s.getBytes());
    }

    /**
     * 判断字符串的md5校验码是否与一个已知的md5码相匹配
     *
     * @param password  要校验的字符串
     * @param md5PwdStr 已知的md5校验码
     * @return
     */
    public static boolean checkPassword(String password, String md5PwdStr) {
        String s = getMD5String(password);
        return s.equals(md5PwdStr);
    }


    public static String getMD5String(byte[] bytes) {
        messagedigest.update(bytes);
        return bufferToHex(messagedigest.digest());
    }

    private static String bufferToHex(byte bytes[]) {
        return bufferToHex(bytes, 0, bytes.length);
    }

    private static String bufferToHex(byte bytes[], int m, int n) {
        StringBuffer stringbuffer = new StringBuffer(2 * n);
        int k = m + n;
        for (int l = m; l < k; l++) {
            appendHexPair(bytes[l], stringbuffer);
        }
        return stringbuffer.toString();
    }

    private static void appendHexPair(byte bt, StringBuffer stringbuffer) {
        char c0 = hexDigits[(bt & 0xf0) >> 4];// 取字节中高 4 位的数字转换, >>>
        // 为逻辑右移，将符号位一起右移,此处未发现两种符号有何不同
        char c1 = hexDigits[bt & 0xf];// 取字节中低 4 位的数字转换
        stringbuffer.append(c0);
        stringbuffer.append(c1);
    }

}
```

## 前端统一响应数据类

**不同项目，要求不同**

要求:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f78a3f14ab5346838b5f762325037a6d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=750&h=193&s=12549&e=png&b=fbfbfb)

统一的响应数据类:

```java
java复制代码//该类用于统一接收要返回给前端页面的数据,系统会自动将该类型转换成JSON格式

//统一响应结果

//下面两个注解是lombok中的，能在在编译阶段，自动为实体类生成对应的无参构造方法
//和有参构造方法
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    //java泛型类,T 可以是任何类型


    private Integer code;//业务状态码  0-成功  1-失败
    private String message;//提示信息
    private T data;//响应数据

    //快速返回操作成功响应结果(带响应数据)
    public static <E> Result<E> success(E data) {
        return new Result<>(0, "操作成功", data);
    }

    //第一个<E> 是类型参数声明，它告诉编译器这个方法里面有一个类型参数 E，
    //Result<E>表示该方法的返回值是一个叫Result的泛型类



    //快速返回操作成功响应结果(无响应数据)
    public static Result success() {
        return new Result(0, "操作成功", null);
    }

    public static Result error(String message) {
        return new Result(1, message, null);
    }
}
```

**上面类叫泛型类，类似C++中的模板类**。

## lombok 依赖

lombok 作用:在编译阶段，自动为实体类生成对应的基本方法,如setXXX(),getXXX()等。

使用条件:

- 在`pom.xml`文件引入依赖
- 在实体类上添加**注解**`@Data`

**在`pom.xml`引入依赖**:

```xml
xml复制代码<!-- lombok依赖  -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

在类上添加**注解**`@Data`

```java
java复制代码@Data
public class User {
    private Integer id;//主键ID
    private String username;//用户名
    private String password;//密码
    private String nickname;//昵称
    private String email;//邮箱
    private String userPic;//用户头像地址
    private LocalDateTime createTime;//创建时间
    private LocalDateTime updateTime;//更新时间
}
```

## Spring Validation依赖(参数校验)

### 常规校验

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/880ea0baf39f49bbb3fcae4917a7245c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1107&h=462&s=221905&e=png&b=fdfdfd) 如图，该依赖是由`Spring`提供,用于对指定参数进行合法性校验(**合法的条件是自定义的**)。

1. **安装依赖**

```xml
xml复制代码<!-- Spring Validation起步依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

1. 在要进行校验的参数前加上**注解**`@Pattern(regexp="")`;**参数**`regexp`接收的是一个**正则表达式**，即对参数合法性的判断

![捕获33.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b372a5e6a474f1c8fa03c57a1eb4e3f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1309&h=606&s=62209&e=png&b=2c2c2c) 3. 在Controller类上添加**注解**`@Validated`，如下图

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b460b4b60c3e4f279943e742a52abfa6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=970&h=406&s=57267&e=png&b=2b2b2b)

若参数合法，程序照常进行，若参数不合法，则程序会向前端抛出异常。这时就需要结合**注解**`@RestControllerAdvice`和**注解**`@ExceptionHandler(异常类类名.class)`来共同处理该异常，保证该异常返回给前端时，能符合前端要求的数据格式。

4.参数校验相关的其他注解:

![捕获28.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ef14e5525b34b17a2a4c8b2e04eb857~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1337&h=618&s=349978&e=png&b=fcfbfb)

- **注解**`@NotNull`该注解标记的变量的值不能为null。
- **注解**`@NotEmpty`该注解标记的变量的值不能为null,且如果是字符串的话,不能为空字符串。
- **注解**`@Email`该注解标记的变量必须满足邮箱格式

上面这三个**注解**是放在实体类中的,当实体类作为方法参数时，外部有**注解**`@Validated`标记且参数本身又是请求体的映射(**@RequestBody**)时，其内部的上面这三种注解才会生效，**这只对实体类内部`Validation依赖`相关的注解有效**。

### 分组校验

在满足**常规校验**的前提下，当我们开发多个功能接口时，可能需要对实体类内部的不同字段进行校验，但是实体类只有一个，因此校验之间可能会产生冲突(**功能1需要校验此字段,功能2不需要**)，为了解决这种情况，我们就要用到**分组校验**，如下图所示。 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48a363c116da4c6bae21db6bb7045bd4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1359&h=678&s=313751&e=png&b=fdfdfd)

1. 在实体类中添加接口,想分几组就添加几个接口(**接口名自定义**);
2. 在该实体类的注解标记后面添加上该注解的组名,**格式**:`@注解(groups={接口名.class,接口名.class})`;**有冲突的字段就将它们分到不同组中**。
3. 外面的方法在进行参数校验时，同样需要在`@Validated`后面添加对应的组名,以便采用不同的校验规则,**格式**:`@Validated(接口名.class)`

**注意**:

```java
java复制代码//若某个校验项未指定分组,则默认属于Default
//分组间是可以继承的，A extends B,那么A中拥有B中所有校验项

//public interface AA extends BB{}      
//分组AA继承自分组BB
```

### 自定义校验

当我们遇见**已有的注解不能满足所有的校验需求，此时特殊的情况就需要自定义校验(自定义校验注解)**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d87cf5c5f3645c2ad3b8fd1f549d292~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1327&h=666&s=495080&e=png&b=fcfbfb)

1. 首先自定义一个注解(`上面自定义了一个注解State`)。

![捕获40.PNG](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1798dd74d3bd497586556d68a5ddaab6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=848&h=399&s=50387&e=png&b=2c2c2c)

2.进入该自定义的注解的文件中，**该文件中的注解类上的四个注解和类当中的三个类方法缺一不可**，具体代码如下。

```java
java复制代码
import com.example.two_project.Validation.StateValidation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotEmpty;

import java.lang.annotation.*;


//这是一个名叫State的自定义校验注解

@Documented   
//元注解，让该自定义注解的信息能够包含在第三方软件生成的
//java文档中

@Constraint(
        validatedBy = {StateValidation.class}      
        //指定提供校验规则的类
)

@Target({ElementType.METHOD, ElementType.FIELD, 
ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, 
ElementType.PARAMETER, ElementType.TYPE_USE})
//元注解,标记本自定义注解可以用在什么地方
//(如类上,方法的参数上等)(FIELD 表示可以用在属性字段上)


@Retention(RetentionPolicy.RUNTIME)   
//表明该注解会保留到运行阶段

public @interface State {

    //用来提供校验失败的提示信息
    String message() default "{状态只能是草稿或者已发布}";

    //指定分组
    Class<?>[] groups() default {};

    //负载，可以获取到本注解的附加信息(不常用)
    Class<? extends Payload>[] payload() default {};

}
```

> 上面是**自定义校验注解State**的代码,该代码当中的**注解**`@Constraint`需要一个提供校验规则的类，而这个类也需要我们自定义，即**校验规则需要自定义**

```java
java复制代码

//这是一个自定义的校验规则(已经与上面的@State注解绑定)

import com.example.two_project.anno.State;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StateValidation implements ConstraintValidator<State,String> {

    //ConstraintValidator 接口有两个泛型,第一个泛型表示给
    //哪个注解提供校验，第二个泛型表示给什么类型的数据提供校验

    //该方法就是来提供校验规则的,如果该方法返回false，
    //就是校验不通过，返回true，就是校验通过
    @Override
    public boolean isValid(String s, 
    ConstraintValidatorContext constraintValidatorContext) {

        //参数 s 就是系统自动传入的要进行校验的数据
        if(s==null){
            return false;
        }

        if (s.equals("草稿")||s.equals("已发布")){     
        //注解标记的变量的值为"草稿"或者"已发布",则校验通过
        
            return  true;
        }

        return false;
    }
}
```

如上面所示,校验规则需要继承一个接口，并重写其中的方法,**该规则必须要通过`注解@Constraint`来与对应的自定义校验注解绑定才能使用**。

`使用自定义校验注解`:

![捕获37.PNG](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0dbc6f71274d4a77b350e134d793ff4b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=835&h=395&s=38988&e=png&b=2c2c2c)

## 分页查询

**分页查询**，简单来说，就是将数据库中的大量数据分成多个页面进行展示，以便用户能够更方便地浏览和处理这些数据。其中，一般是围绕这几个参数:**数据库表中的总的记录数**，**当前页数**，**每页显示的记录数**，**总页数**。

### 分页查询插件PageHelper

```xml
xml复制代码<!--PageHelper 依赖  -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.6</version>
</dependency>
```

使用.**startPage()** 方法,传入`当前页数和每页展示的数据条数`开启分页查询，如下代码。(**分页查询必须在调用Mapper层之前开启！！！**)

```java
java复制代码//开启分页查询（借助Mybatis插件 PageHelper）
PageHelper.startPage(pageNum,pageSize);

//作用将pageNum(当前页数),pageSize(每页展示的数据条数)自动的
//添加到Mapper层中对应的SQL全表查询语句后面(limit …………),
//完成分页查询
```

**分页查询结束**:

```java
java复制代码//获取到查询结果
List<Article> as=articleMapper.list(id,categoryId,state);

//Article是该表对应的实体类,list为Mapper层中SQL全表查询语句
//映射绑定的方法



//Page类是List类的子类，其中拥有子类特有的方法，通过这些方法
//可以获取到PageHelper分页查询后，得到的总的记录数和当前页的数据
//这就是为什么要将List强转为Page
Page<Article> p= (Page<Article>) as;

//把数据依次填充到PageBean对象当中
pageBean.setTotal(p.getTotal());
pageBean.setItems(p.getResult());

//pageBean是根据接口文件要求，用来存放查询结果的自定义的实体类
```

### 分页实体类(统一返回分页查询结果)

```java
java复制代码
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//分页类，用来分页返回结果对象
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageBean <T>{
    private Long total;//总记录数
    private List<T> items;//当前页的数据集合
}
```

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

## UUID(通用唯一识别码)

**UUID是Universally Unique Identifier的缩写，意为通用唯一识别码**。UUID 作用:随机生成ID,且保证该ID在全局当中的唯一性。

**使用方法**:

```java
java

复制代码String ID = UUID.randomUUID().toString();
```

## 阿里云OSS(对象存储)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a06ced487873487d80ae4719bcd5b14a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1390&h=165&s=80824&e=png&b=fdfdfd) 阿里云对象存储OSS(`Object Storage Service`),是一款海量，安全，低成本，高可靠的云存储服务。使用OSS，可以通过网络随时存储和调用包括文本，图片，音频和视频等在内的各种文件。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0bbeeb2b03b45f4ad71ec0e61a09284~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1138&h=116&s=83212&e=png&b=fbeee8) OSS对象存储当中，**Bucket** 即存储对象的容器，所有的对象都必须隶属于某个存储空间(Bucket)。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4157a01914b346809729477e7a18f937~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1186&h=357&s=140985&e=png&b=ffffff)

**AccessKey**(`密钥`):个人身份凭证,向云上传文件的时候需要携带上该密钥，以便阿里云确认你的身份。

### OSS开通

（1）打开[www.aliyun.com/](https://link.juejin.cn?target=https%3A%2F%2Fwww.aliyun.com%2F) ，申请阿里云账号并完成实名认证。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5ccc52d35b4435fb7f894615b319a72~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1086&h=389&s=146392&e=png&b=fdfdfd)

（2）充值 (**可以不用做**)

（3）开通**OSS**

登录阿里云官网。 点击右上角的控制台。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/713ec6d21a0d4249945cfe79dc0ffad3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1513&h=408&s=329837&e=png&b=efeeee)

将鼠标移至产品，找到并单击`对象存储OSS`，打开`OSS`产品详情页面。在`OSS`产品详情页中的单击立即开通。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a69aaead24e9422e96bfce0f251fb164~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1302&h=502&s=94046&e=png&b=fdfdfd)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de93d322dc0c464c8e5d5d1107416e68~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1520&h=498&s=104466&e=png&b=fefefe)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/760be9b28be748aea66a19b891086c78~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1518&h=220&s=82218&e=png&b=fefdfd) 开通服务后，在`OSS`产品详情页面单击管理控制台直接进入`OSS`管理控制台界面。您也可以单击位于官网首页右上方菜单栏的控制台，进入阿里云管理控制台首页，然后单击左侧的对象存储`OSS`菜单进入`OSS`管理控制台界面。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1a9c6ea3ef34fe08da52ffc0f907051~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1526&h=673&s=485022&e=png&b=f7f7f7)

（4）创建存储空间 新建`Bucket`，命名为 `hmleadnews`(**可以自定义**) ，读写权限为 **公共读**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5766eac14834c6e9fa162106253cb5d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=757&h=809&s=216180&e=png&b=fdf9f9)

### 文件上传阿里云工具类

> 该工具类用于将文件上传到阿里云，若想使用该类，则需要填入自己的阿里云服务器节点所在地址(`ENDPOINT`)，自己的密钥**ID**和密码(`OSS_ACCESS_KEY_ID`和`OSS_ACCESS_KEY_SECRET`),自己在阿里云上创建的**Bucket**名字(`BUCKET_NAME`)。

填写好上面的参数后就可以使用该类的类方法uploadFile()将文件上传到自己的阿里云上了:

```java
java复制代码
import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;

import java.io.InputStream;

public class AliOssUtil {

    //服务器所在的节点地址(阿里云OSS上创建Bucket时已经选好了)
    private static final String ENDPOINT = "https://";


    //存储访问阿里云的密钥ID和密钥密码(每个人均不同，这是访问阿里云的个人身份凭证)
    private static final String OSS_ACCESS_KEY_ID="";
    private static final String OSS_ACCESS_KEY_SECRET="";


    // 填写Bucket名称（在阿里云上已经提前创建好了的Bucket的名字）
    private static final String BUCKET_NAME = "";

    public static String uploadFile(String objectName, InputStream inputStream) throws Exception {
            //参数objectName是指要上传的对象(文件)的名字
            //参数inputStream是指要上传文件的输入流
            //返回值为文件上传后的访问地址


        // 创建OSSClient实例(OSS上传的客户端实例)
        OSS ossClient = new OSSClientBuilder().build(ENDPOINT, OSS_ACCESS_KEY_ID,OSS_ACCESS_KEY_SECRET);

        String url="";    //用于存放文件上传后的访问地址
        //url组成:https://bucket名称.区域节点/objectName

        try {

            // 创建PutObjectRequest对象（创建更新对象请求）
            PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME, objectName, inputStream);


            // 如果需要上传时设置存储类型和访问权限，请参考以下示例代码。
            // ObjectMetadata metadata = new ObjectMetadata();
            // metadata.setHeader(OSSHeaders.OSS_STORAGE_CLASS, StorageClass.Standard.toString());
            // metadata.setObjectAcl(CannedAccessControlList.Private);
            // putObjectRequest.setMetadata(metadata);



            // 上传文件
            PutObjectResult result = ossClient.putObject(putObjectRequest);

            //拼接文件上传后的访问地址
            url="https://"+BUCKET_NAME+"."+ENDPOINT.substring(ENDPOINT.lastIndexOf("/")+1)+"/"+objectName;

        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
        return url;
    }

}
```

## 常用函数

- **NOW()** :在数据库系统中，`NOW()` 是一个常用的函数，它用于返回当前的日期和时间,它的格式: `'YYYY-MM-DD HH:MM:SS'`**（年-月-日 时:分:秒）**
- **LocalDateTime.now()** :获得当前系统时间，它的格式`YYYY-MM-DDTHH:MM:SS.SSSSSSSSS`**（年-月-日T时:分:秒）**(**秒**保留小数点后九位)
- **substring()**  这是Java中String类的一个方法，**用于获取字符串的一个子串**。它有两种常见的用法：

> `substring(int beginIndex)`: 从指定的 `beginIndex` 开始，直到字符串的末尾，返回一个新的字符串。
>
> `substring(int beginIndex, int endIndex)`: 从指定的 `beginIndex` 开始，到 `endIndex`（不包括 `endIndex` 处的字符）结束，返回一个新的字符串。

- **lastIndexOf()**:是Java中String 类的一个方法，用于返回指定子串在此字符串中最后一次出现的索引，从指定的索引开始反向搜索。如果未找到子串，则返回 -1。

作者：freejackman
链接：https://juejin.cn/post/7353543714151940135
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。