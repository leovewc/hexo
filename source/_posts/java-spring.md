---
title: java-spring
date: 2024-06-13 23:03:40
tags:
---

# java spring

## hello world

jdk 22  不能用，换成17能用

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

## 依赖注入

### 基于构造函数的依赖注入

MainApp.java

```java
package com.tutorialspoint;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("Beans.xml");
        TextEditor te = (TextEditor) context.getBean("textEditor");
        te.spellCheck();
    }
}
```

TextEditor.java

```java
package com.tutorialspoint;
public class TextEditor {
    private SpellChecker spellChecker;
    public TextEditor(SpellChecker spellChecker) {
        System.out.println("2");
        this.spellChecker = spellChecker;
    }
    public void spellCheck() {

        spellChecker.checkSpelling();
    }
}
```

SpellChecker.java

```java
package com.tutorialspoint;
public class SpellChecker {
    public SpellChecker() {
        System.out.println("1");

    }
    public void checkSpelling() {

        System.out.println("3");
    }
}
```

Beans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns ="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">

        <bean id ="textEditor" class="com.tutorialspoint.TextEditor">
            <constructor-arg ref="spellChecker"/>
        </bean> <!-- ref是引用，value是值-->
		<!--向TextEditor注入spellChecker-->
        <bean id="spellChecker" class="com.tutorialspoint.SpellChecker">
        </bean>

</beans>
```

### 基于设置函数的依赖注入

 在TextEditor.java中加入

```java
public SpellChecker getSpellChecker(){
return spellChecker;
}
```

把之前的类换成函数

```java
    public void setSpellChecker(SpellChecker spellChecker) {
        System.out.println("Inside setSpellChecker");
        this.spellChecker = spellChecker;
    }
```

Beans.xml

把`<constructor-arg/>`转成`<property name="spellChecker"`

### inner beans

在设置函数依赖注入的基础上修改Beans.xml

```java
        <bean id ="textEditor" class="com.tutorialspoint.TextEditor">
            <property name="spellChecker">
                <bean id="spellChecker"                		class="com.tutorialspoint.SpellChecker"/>
            </property>
        </bean>
```

## 注入集合

spring提供了四种类型的集合配置元素

![image-20240614200456490](https://raw.githubusercontent.com/leovewc/images/main/image-20240614200456490.png)

**JavaCollection.java** 

```java
package com.tutorialspoint;
import java.util.*;
public class JavaCollection {
   List addressList;
   Set  addressSet;
   Map  addressMap;
   Properties addressProp;
   // a setter method to set List
   public void setAddressList(List addressList) {
      this.addressList = addressList;
   }
   // prints and returns all the elements of the list.
   public List getAddressList() {
      System.out.println("List Elements :"  + addressList);
      return addressList;
   }
   // a setter method to set Set
   public void setAddressSet(Set addressSet) {
      this.addressSet = addressSet;
   }
   // prints and returns all the elements of the Set.
   public Set getAddressSet() {
      System.out.println("Set Elements :"  + addressSet);
      return addressSet;
   }
   // a setter method to set Map
   public void setAddressMap(Map addressMap) {
      this.addressMap = addressMap;
   }  
   // prints and returns all the elements of the Map.
   public Map getAddressMap() {
      System.out.println("Map Elements :"  + addressMap);
      return addressMap;
   }
   // a setter method to set Property
   public void setAddressProp(Properties addressProp) {
      this.addressProp = addressProp;
   } 
   // prints and returns all the elements of the Property.
   public Properties getAddressProp() {
      System.out.println("Property Elements :"  + addressProp);
      return addressProp;
   }
}
```

MainApp.java

```java
package com.tutorialspoint;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class MainApp {
   public static void main(String[] args) {
      ApplicationContext context = 
             new ClassPathXmlApplicationContext("Beans.xml");
      JavaCollection jc=(JavaCollection)context.getBean("javaCollection");
      jc.getAddressList();
      jc.getAddressSet();
      jc.getAddressMap();
      jc.getAddressProp();
   }
}
```

Beans.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

   <!-- Definition for javaCollection -->
   <bean id="javaCollection" class="com.tutorialspoint.JavaCollection">

      <!-- results in a setAddressList(java.util.List) call -->
      <property name="addressList">
         <list>
            <value>INDIA</value>
            <value>Pakistan</value>
            <value>USA</value>
            <value>USA</value>
         </list>
      </property>

      <!-- results in a setAddressSet(java.util.Set) call -->
      <property name="addressSet">
         <set>
            <value>INDIA</value>
            <value>Pakistan</value>
            <value>USA</value>
            <value>USA</value>
        </set>
      </property>

      <!-- results in a setAddressMap(java.util.Map) call -->
      <property name="addressMap">
         <map>
            <entry key="1" value="INDIA"/>
            <entry key="2" value="Pakistan"/>
            <entry key="3" value="USA"/>
            <entry key="4" value="USA"/>
         </map>
      </property>

      <!-- results in a setAddressProp(java.util.Properties) call -->
      <property name="addressProp">
         <props>
            <prop key="one">INDIA</prop>
            <prop key="two">Pakistan</prop>
            <prop key="three">USA</prop>
            <prop key="four">USA</prop>
         </props>
      </property>

   </bean>

</beans>
```

### 注入空字符串

```
<bean id="..." class="exampleBean">
   <property name="email" value=""/>
</bean>
```

相当于 Java 代码：`exampleBean.setEmail("")`

### 注入NULL

```xml
<bean id="..." class="exampleBean">
   <property name="email"><null/></property>
</bean>
```

相当于 Java 代码：`exampleBean.setEmail(null)`
