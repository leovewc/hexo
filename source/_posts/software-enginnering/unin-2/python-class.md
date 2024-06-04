---
title: python-class
date: 2024-05-24 15:09:00
tags:
categories:
- [软工, 大二]
---
# 常用数据结构
+++primary 字符串''
;;;id1 由零个或多个字符组组成的有限序列
```python
s1 = 'hello, world!'
s2 = "hello, world!
# 以三个双引号或单引号开头的字符串可以折行
s3 = """
hello, 
world!
"""
```
;;;
;;;id1 字符串运算符
```python
s1 = 'hello ' * 3
print(s1) # hello hello hello 
s2 = 'world'
s1 += s2
print(s1) # hello hello hello world
print('ll' in s1) # True
print('good' in s1) # False
str2 = 'abc123456'
# 从字符串中取出指定位置的字符(下标运算)
print(str2[2]) # c
# 字符串切片(从指定的开始索引到指定的结束索引)
print(str2[2:5]) # c12
print(str2[2:]) # c123456
print(str2[2::2]) # c246
print(str2[::2]) # ac246
print(str2[::-1]) # 654321cba
print(str2[-3:-1]) # 45
```
;;;id1 字符串方法
```python
str1 = 'hello, world!'
# 通过内置函数len计算字符串的长度
print(len(str1)) # 13
# 获得字符串首字母大写的拷贝
print(str1.capitalize()) # Hello, world!
# 获得字符串每个单词首字母大写的拷贝
print(str1.title()) # Hello, World!
# 获得字符串变大写后的拷贝
print(str1.upper()) # HELLO, WORLD!
# 从字符串中查找子串所在位置
print(str1.find('or')) # 8
print(str1.find('shit')) # -1
# 与find类似但找不到子串时会引发异常
# print(str1.index('or'))
# print(str1.index('shit'))
# 检查字符串是否以指定的字符串开头
print(str1.startswith('He')) # False
print(str1.startswith('hel')) # True
# 检查字符串是否以指定的字符串结尾
print(str1.endswith('!')) # True
# 将字符串以指定的宽度居中并在两侧填充指定的字符
print(str1.center(50, '*'))
# 将字符串以指定的宽度靠右放置左侧填充指定的字符
print(str1.rjust(50, ' '))
str2 = 'abc123456'
# 检查字符串是否由数字构成
print(str2.isdigit())  # False
# 检查字符串是否以字母构成
print(str2.isalpha())  # False
# 检查字符串是否以数字和字母构成
print(str2.isalnum())  # True
str3 = '  jackfrued@126.com '
print(str3)
# 获得字符串修剪左右两侧空格之后的拷贝
print(str3.strip())
```
;;;id1 格式化输出
```python
a, b = 5, 10
print(f'{a} * {b} = {a * b}')
```
;;;
+++
+++info 列表list[]
;;;id2 基本操作
```python
list1 = [1, 3, 5, 7, 100]
print(list1) # [1, 3, 5, 7, 100]
# 乘号表示列表元素的重复
list2 = ['hello'] * 3
print(list2) # ['hello', 'hello', 'hello']
# 计算列表长度(元素个数)
print(len(list1)) # 5
# 下标(索引)运算
print(list1[0]) # 1
print(list1[4]) # 100
# print(list1[5])  # IndexError: list index out of range
print(list1[-1]) # 100
print(list1[-3]) # 5
list1[2] = 300
print(list1) # [1, 3, 300, 7, 100]
# 通过循环用下标遍历列表元素 
for index in range(len(list1)):
    print(list1[index])
# 通过for循环遍历列表元素
for elem in list1:
    print(elem)
# 通过enumerate函数处理列表之后再遍历可以同时获得元素索引和值
for index, elem in enumerate(list1):
    print(index, elem)
```
;;;
;;;id2 添加删除
```python
list =[ 1, 3, 5, 7] 
list.append(9)
list=[ ‘c’ , ‘name’,  25, [ 10 , 20,30] ]
;;;id2 切片
```python
fruits = ['grape', 'apple', 'strawberry', 'waxberry']
fruits += ['pitaya', 'pear', 'mango']
# 列表切片
fruits2 = fruits[1:4]
print(fruits2) # apple strawberry waxberry
# 可以通过完整切片操作来复制列表
fruits3 = fruits[:]
print(fruits3) # ['grape', 'apple', 'strawberry', 'waxberry', 'pitaya', 'pear', 'mango']
fruits4 = fruits[-3:-1]
print(fruits4) # ['pitaya', 'pear']
# 可以通过反向切片操作来获得倒转后的列表的拷贝
fruits5 = fruits[::-1]
print(fruits5) # ['mango', 'pear', 'pitaya', 'waxberry', 'strawberry', 'apple', 'grape']
```
;;;
;;;id2 排序
```python
list1 = ['orange', 'apple', 'zoo', 'internationalization', 'blueberry']
list2 = sorted(list1)
# sorted函数返回列表排序后的拷贝不会修改传入的列表
# 函数的设计就应该像sorted函数一样尽可能不产生副作用
list3 = sorted(list1, reverse=True)
# 通过key关键字参数指定根据字符串长度进行排序而不是默认的字母表顺序
list4 = sorted(list1, key=len)
print(list1)
print(list2)
print(list3)
print(list4)
# 给列表对象发出排序消息直接在列表对象上进行排序
list1.sort(reverse=True)
print(list1)
```
;;;
;;;id2 生成器()
```python
f = [x for x in range(1, 10)]
print(f)
f = [x + y for x in 'ABCDE' for y in '1234567']
print(f)
# 用列表的生成表达式语法创建列表容器
# 用这种语法创建列表之后元素已经准备就绪所以需要耗费较多的内存空间
f = [x ** 2 for x in range(1, 1000)]
print(sys.getsizeof(f))  # 查看对象占用内存的字节数
print(f)
# 请注意下面的代码创建的不是一个列表而是一个生成器对象
# 通过生成器可以获取到数据但它不占用额外的空间存储数据
# 每次需要数据的时候就通过内部的运算得到数据(需要花费额外的时间)
f = (x ** 2 for x in range(1, 1000))
print(sys.getsizeof(f))  # 相比生成式生成器不占用存储数据的空间
print(f)
for val in f:
    print(val)
```
;;;
+++
+++success 元组()
;;;id3 定义与使用
Python中的元组与列表类似也是一种容器数据类型，可以用一个变量（对象）来存储多个数据
不同之处在于元组的元素不能修改
```python
# 定义元组
t = ('骆昊', 38, True, '四川成都')
print(t)
# 获取元组中的元素
print(t[0])
print(t[3])
# 遍历元组中的值
for member in t:
    print(member)
# 重新给元组赋值
# t[0] = '王大锤'  # TypeError
# 变量t重新引用了新的元组原来的元组将被垃圾回收
t = ('王大锤', 20, True, '云南昆明')
print(t)
# 将元组转换成列表
person = list(t)
print(person)
# 列表是可以修改它的元素的
person[0] = '李小龙'
person[1] = 25
print(person)
# 将列表转换成元组
fruits_list = ['apple', 'banana', 'orange']
fruits_tuple = tuple(fruits_list)
print(fruits_tuple)
```
;;;
;;;id3 operations
![operations](https://img2.imgtp.com/2024/05/28/Z211cduf.png)
;;;
;;;id3 travers
![travers](https://img2.imgtp.com/2024/05/28/fYeb34rN.png)
;;;
+++

+++warning 集合set{}
Python中的集合跟数学上的集合是一致的，不允许有重复元素，而且可以进行交集、并集、差集等运算。
;;;id4 创建使用
![create](https://img2.imgtp.com/2024/05/28/Lypy8mIe.png)
```python
# 创建集合的字面量语法
set1 = {1, 2, 3, 3, 3, 2}
print(set1)
print('Length =', len(set1))
# 创建集合的构造器语法(面向对象部分会进行详细讲解)
set2 = set(range(1, 10))
set3 = set((1, 2, 3, 3, 2, 1))
print(set2, set3)
# 创建集合的推导式语法(推导式也可以用于推导集合)
set4 = {num for num in range(1, 100) if num % 3 == 0 or num % 5 == 0}
print(set4)
```
;;;
;;;id4 添加和删除
You can add an element into set using add() function `set.add(5)` and remove() `set.remove(5)` it will insert anywhere

```python
set1.add(4)
set1.add(5)
set2.update([11, 12])
set2.discard(5)
if 4 in set2:
    set2.remove(4)
print(set1, set2)
print(set3.pop())
print(set3)
```
;;;
;;;id4 运算 10
```python
# 集合的交集、并集、差集、对称差运算
print(set1 & set2)
# print(set1.intersection(set2))
print(set1 | set2)
# print(set1.union(set2))
print(set1 - set2)
# print(set1.difference(set2))
print(set1 ^ set2)
# print(set1.symmetric_difference(set2))
# 判断子集和超集
print(set2 <= set1)
# print(set2.issubset(set1))
print(set3 <= set1)
# print(set3.issubset(set1))
print(set1 >= set2)
# print(set1.issuperset(set2))
print(set1 >= set3)
# print(set1.issuperset(set3))
```
;;;
+++
+++danger 字典dictionaries{}
字典是另一种可变容器模型，Python中的字典跟我们生活中使用的字典是一样一样的，它可以存储任意类型对象，
与列表、集合不同的是字典的每个元素都是由一个键和一个值组成的“键值对”，键和值通过冒号分开。
;;;id5 定义和使用 13
```python
# 创建字典的字面量语法
scores = {'骆昊': 95, '白元芳': 78, '狄仁杰': 82}
print(scores)
# 创建字典的构造器语法
items1 = dict(one=1, two=2, three=3, four=4)
# 通过zip函数将两个序列压成字典
items2 = dict(zip(['a', 'b', 'c'], '123'))
# 创建字典的推导式语法
items3 = {num: num ** 2 for num in range(1, 10)}
print(items1, items2, items3)
# 通过键可以获取字典中对应的值
print(scores['骆昊'])
print(scores['狄仁杰'])
# 对字典中所有键值对进行遍历
for key in scores:
    print(f'{key}: {scores[key]}')
# 更新字典中的元素
scores['白元芳'] = 65
scores['诸葛王朗'] = 71
scores.update(冷面=67, 方启鹤=85)
print(scores)
if '武则天' in scores:
    print(scores['武则天'])
print(scores.get('武则天'))
# get方法也是通过键获取对应的值但是可以设置默认值
print(scores.get('武则天', 60))
# 删除字典中的元素
print(scores.popitem())
print(scores.popitem())
print(scores.pop('骆昊', 100))
# 清空字典
scores.clear()
print(scores)
```
;;;
;;;id5 operation
![](https://img2.imgtp.com/2024/05/28/8aT0hot2.png)
![屏幕截图 2024-05-28 102249.png](https://img2.imgtp.com/2024/05/28/8aT0hot2.png)
![屏幕截图 2024-05-28 102425.png](https://img2.imgtp.com/2024/05/28/kfuT6JjN.png)
;;;
+++
## list vs tuple vs set vs dictionary
![屏幕截图 2024-05-28 102456.png](https://img2.imgtp.com/2024/05/28/RVOEWxAO.png)
# 嵌套

# 循环
## for-in 循环
* range(101)：可以用来产生0到100范围的整数，需要注意的是取不到101。
* range(1, 101)：可以用来产生1到100范围的整数，相当于前面是闭区间后面是开区间。
* range(1, 101, 2)：可以用来产生1到100的奇数，其中2是步长，即每次数值递增的值。
* range(100, 0, -2)：可以用来产生100到1的偶数，其中-2是步长，即每次数字递减的值。
## while循环

# 函数与模块
# 变量作用域
```python
def foo():
    b = 'hello' # local variable

    # Python中可以在函数内部再定义函数
    def bar():
        c = True
        print(a)
        print(b)
        print(c)

    bar()
    # print(c)  # NameError: name 'c' is not defined


if __name__ == '__main__':
    a = 100 # global variable
    # print(b)  # NameError: name 'b' is not defined
    foo()
```
不能通过函数调用修改全局变量 `a` 的值，例如：
```python
def foo():
    a = 200
    print(a)  # 200


if __name__ == '__main__':
    a = 100
    foo()
    print(a)  # 100
```
全局变量的`a`和局部变量的`a`不是一个东西，如果希望修改得用如下的代码:
```python
def foo():
    global a
    a = 200
    print(a)  # 200


if __name__ == '__main__':
    a = 100
    foo()
    print(a)  # 200
```

# 面向对象编程
## 定义类
```python
class Student(object):

    # __init__是一个特殊方法用于在创建对象时进行初始化操作
    # 通过这个方法我们可以为学生对象绑定name和age两个属性
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def study(self, course_name):
        print('%s正在学习%s.' % (self.name, course_name))

    # PEP 8要求标识符的名字用全小写多个单词用下划线连接
    # 但是部分程序员和公司更倾向于使用驼峰命名法(驼峰标识)
    def watch_movie(self):
        if self.age < 18:
            print('%s只能观看《熊出没》.' % self.name)
        else:
            print('%s正在观看岛国爱情大电影.' % self.name)
def main():
    # 创建学生对象并指定姓名和年龄
    stu1 = Student('骆昊', 38)
    # 给对象发study消息
    stu1.study('Python程序设计')
    # 给对象发watch_av消息
    stu1.watch_movie()
    stu2 = Student('王大锤', 15)
    stu2.study('思想品德')
    stu2.watch_movie()


if __name__ == '__main__':
    main()
```
## 访问可见性
私有的属性用两个下划线开头：
```python
class Test:

    def __init__(self, foo):
        self.__foo = foo

    def __bar(self):
        print(self.__foo)
        print('__bar')


def main():
    test = Test('hello')
    # AttributeError: 'Test' object has no attribute '__bar'
    test.__bar()
    # AttributeError: 'Test' object has no attribute '__foo'
    print(test.__foo)


if __name__ == "__main__":
    main()
```
这种其实可以通过一种更换名字的规则来访问：
```python
class Test:

    def __init__(self, foo):
        self.__foo = foo

    def __bar(self):
        print(self.__foo)
        print('__bar')


def main():
    test = Test('hello')
    test._Test__bar()
    print(test._Test__foo)


if __name__ == "__main__":
    main()
```
## @property装饰器
这是一种暗示属性是受保护的，不建议外部直接访问，
但是想访问属性可以通过属性的 `getter`（访问器），和 `setter`（修改器）方法进行对应的操作
```python
class Person(object):

    def __init__(self, name, age):
        self._name = name
        self._age = age

    # 访问器 - getter方法
    @property
    def name(self):
        return self._name

    # 访问器 - getter方法
    @property
    def age(self):
        return self._age

    # 修改器 - setter方法
    @age.setter
    def age(self, age):
        self._age = age

    def play(self):
        if self._age <= 16:
            print('%s正在玩飞行棋.' % self._name)
        else:
            print('%s正在玩斗地主.' % self._name)


def main():
    person = Person('王大锤', 12)
    person.play()
    person.age = 22
    person.play()
    # person.name = '白元芳'  # AttributeError: can't set attribute


if __name__ == '__main__':
    main()
```
### __slots__
python是一门[动态语言](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80)
__slots__变量可以限定定义类型的对象只能绑定某些属性, __slots__只对当前类生效，对子类不起作用
```python
class Person(object):

    # 限定Person对象只能绑定_name, _age和_gender属性
    __slots__ = ('_name', '_age', '_gender')

    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def name(self):
        return self._name

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, age):
        self._age = age

    def play(self):
        if self._age <= 16:
            print('%s正在玩飞行棋.' % self._name)
        else:
            print('%s正在玩斗地主.' % self._name)


def main():
    person = Person('王大锤', 22)
    person.play()
    person._gender = '男'
    # AttributeError: 'Person' object has no attribute '_is_gay'
    # person._is_gay = True
```
## 静态方法
在类中，不属于对象的方法，而是属于类的方法，可以使用静态方法：
```python
from math import sqrt


class Triangle(object):

    def __init__(self, a, b, c):
        self._a = a
        self._b = b
        self._c = c

    @staticmethod
    def is_valid(a, b, c): # 没有self了
        return a + b > c and b + c > a and a + c > b

    def perimeter(self):
        return self._a + self._b + self._c

    def area(self):
        half = self.perimeter() / 2
        return sqrt(half * (half - self._a) *
                    (half - self._b) * (half - self._c))


def main():
    a, b, c = 3, 4, 5
    # 静态方法和类方法都是通过给类发消息来调用的
    if Triangle.is_valid(a, b, c):
        t = Triangle(a, b, c)
        print(t.perimeter())
        # 也可以通过给类发消息来调用对象方法但是要传入接收消息的对象作为参数
        # print(Triangle.perimeter(t))
        print(t.area())
        # print(Triangle.area(t))
    else:
        print('无法构成三角形.')


if __name__ == '__main__':
    main()
```

# 查漏补缺
## 1

### print

这两个都能打印出来，里面有双引号外面就用单引号
```python
    print(" I'm excited but you 'not '.") 
    print('I "said" do not touch this.')
```
1. print('His name is', name , 'and his age is', age) 
2. print(f'His name is {name} and his age is {age}’)
3. print('His name is {} and his age is {}'.format(name, age))
4. print(f'His name is {name=} and his age is {age=}’)
5. print('His name is {0} and his age is {1}'.format(name, age))
6. print('His name is {1} and his age is {0}'.format(name, age))  # 位置交换了
7. print('His name is {name} and his age is {age}'.format(name=‘ahmed’, age=20))

### string

外面双引号还是单引号无所谓，记住里面要用转义符/就行（跟外面一样才用）
```python
    Name1= ‘Python’ 
    Name2= "Python " 
    Name3= " it\’s Python " 
    Name4= " Yes \" it\'s Python \"" #这个的`it\'s`可以不用\
    Name41= " Yes \" it's Python \""
    Name5= ' Yes " it\'s Python " ' 
    Name6=' Yes " it's Python " ' #这个是错的



    types_of_people = 10 
    x = f"There are {types_of_people} types of people." binary = "binary" 
    do_not = "don't" 
    y = f"Those who know {binary} and those who {do_not}." 
    print(x) 
    print(y) 
    
    print(f"I said: {x}")  #=print("I said: ",x)
    print(f"I also said: '{y}'") 
    
    hilarious = False 
    joke_evaluation = "Isn't that joke so funny?! {}" print(joke_evaluation.format(hilarious)) 
    
    w = "This is the left side of..." 
    e = "a string with a right side." 
    print(w + e)
```
#### long string

use 
```python

    """
    """
```

#### index of string

(     [ )      left first is 0 and right first is 1  )

- name[0]  #character in position 1
- name[-1]  #last character
- name='Python’
    -  name[0:2]  # characters from position 0 (included) to 2 (excluded) 
        - 'Py’ 
    - name[2:5]  # characters from position 2 (included) to 5 (excluded) 
        - 'tho’ 
    - name[:2]   # character from the beginning to position 2 (excluded) 
        -  'Py' 
    - name[4:]   # characters from position 4 (included) to the end
        - 'on' 
    - name[-2:]  # characters from the second-last (included) to the end 
        - 'on’
    - name[:4] + name[4:] 
        - Python 
    - name[10] 
        - IndexError: string index out of range
    - name[1:100] 
        - ython
    - name[-100:] 
        - Python 

python string cannot be changed

- name[0]='J'
    - TypeError: 'str' object does not support item assignment
- name[2:]=‘JO’ 
    - TypeError: 'str' object does not support item assignmen

different string can use +

- newname= 'J' +name[1:] 
    - Jython
-  newname2= name[:2]  + ' J ‘ + name[2:]
    -  PyJthon

#### length of string

`len(name)` Space is counted

## 2

### variables

不能以数字开头,不能带除了underscore以外的special character, and no keyword

全大写的是symbolic constants, they never change

### input

`name = input("please enter :")`

### list

`list.append[9]`

`list=[ ‘c’ , ‘name’,  25, [10, 20,30] ]`

## 3， 4

太简单了懒得写了

## 5

### FUNCTION

#### arguments

1. position arguments
2. keyword arguments :     `sum(y=1, x=10)`
3. default arguments  :     `def sum(x, y=10):`



1. variable lenght arguments 
```python
    def printing(*argu):
    for x in argu:
        print(x)
    ...
    ...
    printing(1,2,3,4,5)
    printing("as","sd","qe","eq")
```

### exercis

![](https://ibb.co/4m9CPsZ)



## 6

## 7

### anonymous object

create an object without explicitly assigning it to a variable

`print("Area is", Circle(5).getArea())`

### self
```python
    class Myclass:
          def __init__(self. t):
              self.x =t
          def m1(self):
              self.x =5
              self.y =7
          def m2(self):
              self.x =7
              self.y =4
              z =6             #local varailbe
```
### Immutable / Mutable Objects

number, string are immutable, 对象可以被改变`e.salary = 10000`

### data hiding
```python
    class Circle:
          def __init__(self, r):
              self.__r = r
          def setRadius(self,r):
              self.__r =r
          def getRadius(self):
              return self.__r
          def getArea(self):
              return self.__r *self.__r *math.pi
    
    c1 = Circle(3)
    x=c1.getArea()
    print(c1.getRedius())
    print(c1.r)                   #error
```
## 8

### list

`len(list)`

`max(list)`

`min(list)`

`sum(list)`

`shuffle(list)` 随机打乱



list范围是[0,len(list)-1],所以下面这个会报错：out of range:
```python
    list1 = [1,2,3,4,5,6,7,8,9]
    i = 0
    while i <= len(list1):
        print(list1[i])
        i=i+1
```


list 切片
```python
    print(list1[-2 : -3])   #[]
    print(list11[1: 1])     #[]
```


`in/ not in`



![](https://ibb.co/6vsVg71)



`items = "Jane John Peter Susan".split()`

`items = "09/20/2012".split("/")`



inputting list:
```python
    s=input("enter")
    items =s.split()
    lst= [x for x in items]
```


注意这个是复制指针，list2变了1也要变`list2 = list1`

`print(id(list))`这个看地址



如果只想复制数据：
```python
    list1 = [1,2,3,4,5,6,7,8,9]
    list2 = [x for x in list1]     #法1
    list3 = [] + list1        #法2
```


传到function里，list会改变数据，number不会改变:
```python
    def fun(num, lst):
        num =1111
        lst[0] = 2222
    
    x=5
    list1=[1,2,3,4,5]
    fun(x,list1)
    print(list1)    #[2222,2,3,4,5]
    print(x)           #5
```


`list.sort()`是原地排序，不会返回一个新的。同类型才能排序。ASCOII排序,意味着大写永远在前面，如果要除开大小写影响传入`str.lower`



![](https://ibb.co/XYXYmJf)

%% list3=list1+list2
%% list3=list1.extend(list2)
%% 这两个有什么区别:
%% 
%% extend不返回只改变，所以list3=None



逆天随机换顺序：
```python
    import random
    
    matrix = [[3, 5, 1, 4], [3, 1, 2, 7], [8, 0, 8, 2]]
    
    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            i = random.randint(0, len(matrix) - 1)
            j = random.randint(0, len(matrix[row]) - 1)
            matrix[row][col], matrix[i][j] = matrix[i][j], matrix[row][col]
    
    print(matrix)
```    

## 9

### tuple

不能改

![](https://ibb.co/84h4w5R)

### sets

`set1=set("asd")     #{'a', 's', 'd'}`

集合用的是`add``remove``issubset``isuperset`也可以比较符号

`symmetric_difference()`是异或 == `^`

### dictionaries

`update`

`popitem` 弹出最后并删除

`pop('A')``clear`

`del dict['A']`
```python
del tinydict['Name'] # 删除键 'Name'
tinydict.clear()     # 清空字典
del tinydict         # 删除字典
```

![](https://ibb.co/D4m7wsk)![](https://ibb.co/Pzc4THp)![](https://ibb.co/j5FZ3gZ)

还能连环使用

![](https://ibb.co/CsmzL1x)

字典需要`.items()`遍历
```python
    # 遍历键
    for key in my_dict:
        print(key)
    
    # 遍历值
    for value in my_dict.values():
        print(value)
    
    # 遍历键值对
    for key, value in my_dict.items():
        print(f"{key}: {value}")
```  
    


```python
     my_dict[[1, 2, 3]] = "List"  #不行，因为不能用可变的做键
    my_dict[(1, 2, 3)] = "Tuple" #可以，因为元组不可变,string can
```    

排序：
```python
    my_dict = {"b": 2, "a": 1, "c": 3}
    sorted_keys = sorted(my_dict.keys())
    sorted_dict = {k: my_dict[k] for k in sorted_keys}
    print(sorted_dict)  # 输出: {'a': 1, 'b': 2, 'c': 3}
```    















