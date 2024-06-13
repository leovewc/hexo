---
title: java-spring
date: 2024-06-13 23:03:40
tags:
---

# java spring

## hello world

MainApp.java

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
        HelloWorld obj = (HelloWorld) context.getBean("helloWorld");
        obj.getMessage();
    }
}
```

HelloWorld.java

```java
public class helloWorld {
    private String message;
    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage() {
        System.out.println(message);
        return message;
    }
}
```

beans.xml

this should be put under mian.resource

```xml
<?xml version="1.0" encoding="utf-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http//www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/beans
       http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <beans id="helloWorld" class="main.java.com.HelloWorld">
        <property name="message" value="Hello World"/>
    </beans>

</beans>
```



## Spring BeanFactory

这个容器我用不了，因为在 spring 5.x中被移除了，我的是spring 6.18

```java
package com.tutorialspoint;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.ClassPathResource;

public class MainApp {
    public static void main(String[] args) {
        XmlBeanFactory factory = new xmlBeanFactory(new ClassPathResource("Beans.xml"));
        HelloWorld obj = (HelloWorld) factory.getBean("helloWorld");
        obj.getMessage();
    }
}
```

## spring bean 后置处理器

多添加一个

```xml
<?xml version="1.0" encoding="utf-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="helloWorld" class="com.tutorialspoint.HelloWorld"
    init-method="init" destroy-method="destroy">
        <property name="message" value="likun"/>
    </bean>

    <bean class="com.tutorialspoint.InitHelloWorld" />

</beans>
```

HelloWorld 加一个`init`一个`destroy`

```java
package com.tutorialspoint;

public class HelloWorld {
    private String message;
    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage() {
        System.out.println("your :" + message);
        return message;
    }
    public void init(){
        System.out.println("init");

    }
    public void destroy(){
        System.out.println("destroy");
    }
}
```

Mainapp 用 `context.registerShutdownHook()`来正确关闭

```java
package com.tutorialspoint;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.core.SpringVersion;

public class MainApp {
    public static void main(String[] args) {
        AbstractApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        HelloWorld obj = (HelloWorld) context.getBean("helloWorld");
        obj.getMessage();
        context.registerShutdownHook();
    }
}
```

InitHelloWorld.java 

```java
package com.tutorialspoint;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.beans.BeansException;
public class InitHelloWorld implements BeanPostProcessor {
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("before init" +beanName);
        return bean;
    }
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("after init" +beanName);
        return bean;
    }
}
```

