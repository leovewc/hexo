---
title: javaScript的学习笔记
date: 2023-09-19 22:04:47
tags:
---

<linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.css"> 
<scriptsrc="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.js"></script> 
<scriptsrc="https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js"></script> 
{% meting "9129478" "tencent" "playlist" "theme:#FF4081" "mode:circulation" "mutex:true" "listmaxheight:340px" "preload:auto" %}
## Day 1
[参考来源](https://blog.csdn.net/qq_38490457/article/details/109257751?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169508142416800222822599%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169508142416800222822599&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-109257751-null-null.142^v94^chatsearchT3_1&utm_term=javascript&spm=1018.2226.3001.4187)
[后面补充来源](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Introducing)
### 基本语法
#### 1.5、JavaScript的输出
页面输出
``` codes
<script>
    document.write("Hello,World!");
</script>
```
控制台输出\*注意：页面按F12弹出控制台*\
``` codes
<script>
    console.log("输出一条日志");//最常用
    console.info("输出一条信息");
    console.warn("输出一条警告");
    console.error("输出一条错误");
</script>
```
弹出窗口输出
``` codes
<script>
    alert("Hello,World!");
</script>
```
#### 2.11.6、嵌套函数
嵌套函数：在函数中声明的函数就是嵌套函数，嵌套函数只能在当前函数中可以访问，在当前函数外无法访问。
```
function fu() {
    function zi() {
        console.log("我是儿子")
    }

    zi();
}

fu();
```
#### 2.11.8、立即执行函数
```
(function () {
    alert("我是一个匿名函数");
})();
```
#### 2.12.2、用构造函数创建对象
```
// 使用构造函数来创建对象
function Person(name, age) {
    // 设置对象的属性
    this.name = name;
    this.age = age;
    // 设置对象的方法
    this.sayName = function () {
        console.log(this.name);
    };
}

var person1 = new Person("孙悟空", 18);
var person2 = new Person("猪八戒", 19);
var person3 = new Person("沙和尚", 20);

console.log(person1);
console.log(person2);
console.log(person3);

```
#### this
当以函数的形式调用时，this是window
当以方法的形式调用时，谁调用方法this就是谁
当以构造函数的形式调用时，this就是新创建的那个对象
#### 2.12.3、原型
```
// 使用构造函数来创建对象
function Person(name, age) {
    // 设置对象的属性
    this.name = name;
    this.age = age;
    // 设置对象的方法
    this.sayName = sayName
}

// 抽取方法为全局函数
function sayName() {
    console.log(this.name);
}

var person1 = new Person("孙悟空", 18);
var person2 = new Person("猪八戒", 19);
var person3 = new Person("沙和尚", 20);

person1.sayName();
person2.sayName();
person3.sayName();
```
但是，在全局作用域中定义函数却不是一个好的办法，为什么呢？因为，如果要是涉及到多人协作开发一个项目，别人也有可能叫sayName这个方法，这样在工程合并的时候就会导致一系列的问题，污染全局作用域，那该怎么办呢？有没有一种方法，我只在Person这个类的全局对象中添加一个函数，然后在类中引用？答案肯定是有的，这就需要原型对象了，我们先看看怎么做的，然后在详细讲解原型对象。
```
// 使用构造函数来创建对象
function Person(name, age) {
    // 设置对象的属性
    this.name = name;
    this.age = age;
}

// 在Person类的原型对象中添加方法
Person.prototype.sayName = function() {
    console.log(this.name);
};

var person1 = new Person("孙悟空", 18);
var person2 = new Person("猪八戒", 19);
var person3 = new Person("沙和尚", 20);

person1.sayName();
person2.sayName();
person3.sayName();
```
我们可以通过__proto__（隐式原型）来访问该属性。当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，如果没有则会去原型对象中寻找，如果找到则直接使用。
#### 2.12.7、对象继承
JavaScript有六种非常经典的对象继承方式，但是我们只学习前三种：

原型链继承
借用构造函数继承
组合继承（重要）
##### 原型链继承
```// 定义父类型构造函数
function SupperType() {
    this.supProp = 'Supper property';
}

// 给父类型的原型添加方法
SupperType.prototype.showSupperProp = function () {
    console.log(this.supProp);
};

// 定义子类型的构造函数
function SubType() {
    this.subProp = 'Sub property';
}

// 创建父类型的对象赋值给子类型的原型
SubType.prototype = new SupperType();

// 将子类型原型的构造属性设置为子类型
SubType.prototype.constructor = SubType;

// 给子类型原型添加方法
SubType.prototype.showSubProp = function () {
    console.log(this.subProp)
};

// 创建子类型的对象: 可以调用父类型的方法
var subType = new SubType();
subType.showSupperProp();
subType.showSubProp();
```
##### 借用构造函数继承
```
// 定义父类型构造函数
function SuperType(name) {
    this.name = name;
    this.showSupperName = function () {
        console.log(this.name);
    };
}

// 定义子类型的构造函数
function SubType(name, age) {
    // 在子类型中调用call方法继承自SuperType
    SuperType.call(this, name);
    this.age = age;
}

// 给子类型的原型添加方法
SubType.prototype.showSubName = function () {
    console.log(this.name);
};

// 创建子类型的对象然后调用
var subType = new SubType("孙悟空", 20);
subType.showSupperName();
subType.showSubName();
console.log(subType.name);
console.log(subType.age);
```
##### 组合继承
```
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.setName = function (name) {
    this.name = name;
};

function Student(name, age, price) {
    Person.call(this, name, age); // 为了得到父类型的实例属性和方法
    this.price = price; // 添加子类型私有的属性
}

Student.prototype = new Person(); // 为了得到父类型的原型属性和方法
Student.prototype.constructor = Student; // 修正constructor属性指向
Student.prototype.setPrice = function (price) { // 添加子类型私有的方法 
    this.price = price;
};

var s = new Student("孙悟空", 24, 15000);
console.log(s.name, s.age, s.price);
s.setName("猪八戒");
s.setPrice(16000);
console.log(s.name, s.age, s.price);
```
#### 2.12.8、垃圾回收
在JS中拥有自动的垃圾回收机制，会自动将这些垃圾对象从内存中销毁，我们不需要也不能进行垃圾回收的操作，我们需要做的只是要将不再使用的对象设置null即可。
```
// 使用构造函数来创建对象
function Person(name, age) {
    // 设置对象的属性
    this.name = name;
    this.age = age;
}

var person1 = new Person("孙悟空", 18);
var person2 = new Person("猪八戒", 19);
var person3 = new Person("沙和尚", 20);

person1 = null;
person2 = null;
person3 = null;
```
#### 创建数组
```
var arr = [1, "2", 3, "4", 5, "6", 7, "8", 9];
```
#### 数组方法
push()方法演示：该方法可以向数组的末尾添加一个或多个元素，并返回数组的新的长度
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.push("唐僧", "蜘蛛精", "白骨精", "玉兔精");
console.log(arr);
console.log(result);
```
pop()方法演示：该方法可以删除数组的最后一个元素，并将被删除的元素作为返回值返回
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.pop();
console.log(arr);
console.log(result);
```
unshift()方法演示：该方法向数组开头添加一个或多个元素，并返回新的数组长度
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.unshift("牛魔王", "二郎神");
console.log(arr);
console.log(result);
```
shift()方法演示：该方法可以删除数组的第一个元素，并将被删除的元素作为返回值返回
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.shift();
console.log(arr);
console.log(result);
```
forEach()方法演示：该方法可以用来遍历数组
浏览器会在回调函数中传递三个参数：

第一个参数：就是当前正在遍历的元素
第二个参数：就是当前正在遍历的元素的索引
第三个参数：就是正在遍历的数组
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
arr.forEach(function (value, index, obj) {
    console.log(value + " #### " + index + " #### " + obj);
});

```
![result](https://img-blog.csdnimg.cn/img_convert/23e5a69cb38d91535b27ab372e689258.png)
slice()方法演示：该方法可以用来从数组提取指定元素，该方法不会改变元素数组，而是将截取到的元素封装到一个新数组中返回
```
var arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧", "白骨精"];
var result = arr.slice(1, 4);
console.log(result);
result = arr.slice(3);
console.log(result);
result = arr.slice(1, -2);
console.log(result);
```
![result](https://img-blog.csdnimg.cn/img_convert/18ad817362706339461665656b5b81bd.png)
splice()方法演示：该方法可以用于删除数组中的指定元素，该方法会影响到原数组，会将指定元素从原数组中删除，并将被删除的元素作为返回值返回

参数：

第一个参数：表示开始位置的索引
第二个参数：表示要删除的元素数量
第三个参数及以后参数：可以传递一些新的元素，这些元素将会自动插入到开始位置索引前边
```
var arr = ["孙悟空", "猪八戒", "沙和尚", "唐僧", "白骨精"];
var result = arr.splice(3, 2);
console.log(arr);
console.log(result);
result = arr.splice(1, 0, "牛魔王", "铁扇公主", "红孩儿");
console.log(arr);
console.log(result);
```
![result](https://img-blog.csdnimg.cn/img_convert/45074ba5bb641f6dc53536e6471f1fd2.png)
concat()方法演示：该方法可以连接两个或多个数组，并将新的数组返回，该方法不会对原数组产生影响
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var arr2 = ["白骨精", "玉兔精", "蜘蛛精"];
var arr3 = ["二郎神", "太上老君", "玉皇大帝"];
var result = arr.concat(arr2, arr3, "牛魔王", "铁扇公主");
console.log(result);
```
join()方法演示：该方法可以将数组转换为一个字符串，该方法不会对原数组产生影响，而是将转换后的字符串作为结果返回，在join()中可以指定一个字符串作为参数，这个字符串将会成为数组中元素的连接符，如果不指定连接符，则默认使用，作为连接符
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
var result = arr.join("@-@");
console.log(result);
```
![result](https://img-blog.csdnimg.cn/img_convert/891029712402377b772676696ae3ec72.png)
reverse()方法演示：该方法用来反转数组（前边的去后边，后边的去前边），该方法会直接修改原数组
```
var arr = ["孙悟空", "猪八戒", "沙和尚"];
arr.reverse();
console.log(arr);
```
sort()方法演示：该方法可以用来对数组中的元素进行排序，也会影响原数组，默认会按照Unicode编码进行排序

#### RegExp 正则表达式
##### 3.6.2.1、使用对象创建
语法格式：
```
var 变量名 = new RegExp("正则表达式","匹配模式");
```
匹配模式：

i：忽略大小写
g：全局匹配模式
ig：忽略大小写且全局匹配模式
```
// 这个正则表达式可以来检查一个字符串中是否含有a
var reg = new RegExp("ab", "i");
var str = "Abc";
var result = reg.test(str);
console.log(result);
```
##### 3.6.2.2、使用字面量创建
语法格式：
```
var 变量名 = /正则表达式/匹配模式;
```
注意：可以为一个正则表达式设置多个匹配模式，且顺序无所谓
```
// 这个正则表达式可以来检查一个字符串中是否含有a
var reg = /a/i;
var str = "Abc";
var result = reg.test(str);
console.log(result);
```
##### 3.6.3、正则进阶
``` 需求信息：创建一个正则表达式，检查一个字符串中是否有a或b
// 这个正则表达式可以来检查一个字符串中是否含有a
var reg = /a|b|c/;
var str = "Abc";
var result = reg.test(str);
console.log(result);
```
``` 需求信息：创建一个正则表达式，检查一个字符串中是否有字母
// 这个正则表达式可以来检查一个字符串中是否含有字母
var reg = /[A-z]/;
var str = "Abc";
var result = reg.test(str);
console.log(result);
```

常见组合：

[a-z]：任意小写字母
[A-Z]：任意大写字母
[A-z]：任意字母
[0-9]：任意数字
```需求信息：创建一个正则表达式，检查一个字符串中是否含有 abc 或 adc 或 aec
// 这个正则表达式可以来检查一个字符串中是否含有abc或adc或aec
var reg = /a[bde]c/;
var str = "abc123";
var result = reg.test(str);
console.log(result);
```
判断除了某些字符序列，只需要这么写[^字符序列]
常见组合：

[^a-z]：除了任意小写字母
[^A-Z]：除了任意大写字母
[^A-z]：除了任意字母
[^0-9]：除了任意数字
``` 需求信息：创建一个正则表达式，检查一个字符串中是否除了数字还有其它字母
// 这个正则表达式可以来检查一个字符串中是否除了数字还有其它字母
var reg = /[^0-9]/;
var str = "0123456789";
var result = reg.test(str);
console.log(result);
```
##### 3.6.4、正则方法
split()方法演示：该方法可以将一个字符串拆分为一个数组，方法中可以传递一个正则表达式作为参数，这样方法将会根据正则表达式去拆分字符串，这个方法即使不指定全局匹配，也会全都插分
```
var str = "1a2b3c4d5e6f7";
var result = str.split(/[A-z]/);
console.log(result);
```
search()方法演示：该方法可以搜索字符串中是否含有指定内容，如果搜索到指定内容，则会返回第一次出现的索引，如果没有搜索到返回-1，它可以接受一个正则表达式作为参数，然后会根据正则表达式去检索字符串，serach()只会查找第一个，即使设置全局匹配也没用
```
var str = "hello abc hello aec afc";
var result = str.search(/a[bef]c/);
console.log(result);
```
match()方法演示：该方法可以根据正则表达式，从一个字符串中将符合条件的内容提取出来，默认情况下我们的match()只会找到第一个符合要求的内容，找到以后就停止检索，我们可以设置正则表达式为全局匹配模式，这样就会匹配到所有的内容，可以为一个正则表达式设置多个匹配模式，且顺序无所谓，match()会将匹配到的内容封装到一个数组中返回，即使只查询到一个结果
```
var str = "1a2a3a4a5e6f7A8B9C";
var result = str.match(/[a-z]/ig);
console.log(result);
```
replace()方法演示：该方法可以将字符串中指定内容替换为新的内容，默认只会替换第一个，但是可以设置全局匹配替换全部
参数：

第一个参数：被替换的内容，可以接受一个正则表达式作为参数
第二个参数：新的内容
```
var str = "1a2a3a4a5e6f7A8B9C";
var result = str.replace(/[a-z]/gi, "@_@");
console.log(result);
```
##### 3.6.5、正则量词
通过量词可以设置一个内容出现的次数，量词只对它前边的一个内容起作用，如果有多个内容可以使用 () 括起来，常见量词如下：

{n} ：正好出现n次
{m,} ：出现m次及以上
{m,n} ：出现m-n次
+ ：至少一个，相当于{1,}
* ：0个或多个，相当于{0,}
? ：0个或1个，相当于{0,1}
```
var str = "abbc";

reg = /(ab){3}/;
console.log(reg.test(str));
console.log("===============");
reg = /b{3}/;
console.log(reg.test(str));
console.log("===============");
reg = /ab{1,3}c/;
console.log(reg.test(str));
console.log("===============");
reg = /ab{3,}c/;
console.log(reg.test(str));
console.log("===============");
reg = /ab+c/;
console.log(reg.test(str));
console.log("===============");
reg = /ab*c/;
console.log(reg.test(str));
console.log("===============");
reg = /ab?c/;
console.log(reg.test(str));
console.log("===============");
```
f f t f t t f
##### 3.6.6、正则高阶
如果我们要检查或者说判断是否以某个字符或者字符序列开头或者结尾就会使用^和$。

^ ：表示开头，注意它在[^字符序列]表达的意思不一样
$ ：表示结尾
``` 需求描述：检查一个字符串中是否以a开头
var str = "abcabca";
var reg = /^a/;
console.log(reg.test(str));
```
``` 需求描述：检查一个字符串中是否以a结尾
var str = "abcabca";
var reg = /a$/;
console.log(reg.test(str));
```
如果我们想要检查一个字符串中是否含有.和\就会使用转义字符

\. ：表示.
\\ ：表示\
```
var reg1 = /\./;
var reg2 = /\\/;
var reg3 = new RegExp("\\.");
var reg4 = new RegExp("\\\\");
```
除了以上两种特殊的字符，其实还有很多如下所示：

\w ：任意字母、数字、_，相当于[A-z0-9_]
\W ：除了字母、数字、_，相当于[^A-z0-9_]
\d ：任意的数字，相当于[0-9]
\D ：除了任意的数字，相当于[^0-9]
\s ：空格
\S ：除了空格
\b ：单词边界
\B ：除了单词边界
``` 需求描述：创建一个正则表达式，去除掉字符串中的前后的空格
var str = "  hello child  "
var reg = /^\s*|\s*$/g;
console.log(str);
str = str.replace(reg, "");
console.log(str);
```
``` 需求描述：创建一个正则表达式，检查一个字符串中是否含有单词child
var str = "hello child"
var reg = /\bchild\b/;
console.log(reg.test(str));
```
##### 3.6.7、正则案例
``` 检查手机号
var phoneStr = "15131494600";
var phoneReg = /^1[3-9][0-9]{9}$/;
console.log(phoneReg.test(phoneStr));
```
``` 检查邮箱号
var emailStr = "abc.def@163.com";
var emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
console.log(emailReg.test(emailStr));
```
## Day 2 
### JavaScript DOM
当网页被加载时，浏览器会创建页面的文档对象模型（Document Object Model）。

HTML DOM 模型被结构化为 对象树
常用节点分为四类：

文档节点：整个HTML文档
元素节点：HTML文档中的HTML标签
属性节点：元素的属性
文本节点：HTML标签中的文本内容
#### 4.3.1、查找 HTML 元素
|             方法                    |	            描述          |
|------------------------------------ |---------------------------|
|document.getElementById(id)	      |  通过元素 id 来查找元素.  |
|document.getElementsByTagName(name)  | 通过标签名来查找元素。    |
|document.getElementsByClassName(name)|通过类名来查找元素。       |
|document.querySelector(CSS选择器)	  |通过CSS选择器选择一个元素。|
|document.querySelectorAll(CSS选择器) |通过CSS选择器选择多个元素。|
``` 需求描述：创建一个按钮，通过id获取按钮节点对象
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<button id="btn">我是按钮</button>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var btn = document.getElementById("btn");
    console.log(btn);
</script>
</body>
</html>
```
```需求描述：创建一个按钮，通过标签名获取按钮节点对象数组
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<button>我是按钮</button>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var btn = document.getElementsByTagName("button");
    console.log(btn);
</script>
</body>
</html>
```
```需求描述：创建一个按钮，通过类名获取按钮节点对象数组
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<button class="btn">我是按钮</button>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var btn = document.getElementsByClassName("btn");
    console.log(btn);
</script>
</body>
</html>
```
``` 需求描述：创建一个按钮，通过CSS选择器选择该按钮
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<button class="btn">我是按钮</button>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var btn = document.querySelector(".btn");
    console.log(btn);
</script>
</body>
</html>
```
``` 需求描述：创建一个无序列表，通过CSS选择器选择该列表的所有li
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<ul class="list">
    <li>列表项1</li>
    <li>列表项2</li>
    <li>列表项3</li>
    <li>列表项4</li>
</ul>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var list = document.querySelectorAll(".list li");
    console.log(list);
</script>
</body>
</html>
```
#### 4.3.2、获取 HTML 的值
|方法	                          |描述                         |
|---------------------------------| ----------------------------|
|元素节点.innerText	              |获取 HTML 元素的 inner Text。|
|元素节点.innerHTML 	          |获取 HTML 元素的 inner HTML。|
|元素节点.属性	                  |获取 HTML 元素的属性值。     |
|元素节点.getAttribute(attribute) |获取 HTML 元素的属性值。     |
|元素节点.style.样式	          |获取 HTML 元素的行内样式值。 |
``` 需求描述：创建一个按钮，然后获取按钮的文本内容
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<button id="btn">我是按钮</button>

<!-- 在这里写JavaScript代码，因为JavaScript是由上到下执行的 -->
<script>
    var btn = document.getElementById("btn");
    console.log(btn.innerText);
</script>
</body>
</html>
```
