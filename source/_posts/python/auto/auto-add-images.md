---
title: auto-add-images
date: 2024-05-19 01:03:09
categories:
- [python项目, 自动化]
tags:
- python
- 自动化
valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"
audio:
  - https://music.163.com/#/song?id=2135625944

---
[twemoji](https://twemoji-cheatsheet.vercel.app/)
黃明志&三上悠亞
我射了进去 💕
但是没有关系🫦🪆🪆🔞
你大声哭泣❤️‍🔥
说我真的小气🧇
我其实也想要全部给你🥵
但是你真的不如娃娃充气⚕️
也许你可以给我打个飞机🤣
我的鸡鸡一定能够争气🀄️

# This is a Markdown Heading

<p>This is a paragraph written in HTML. You can use <strong>HTML tags</strong> within your Markdown files.</p>

<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

Here is an image using HTML:
<img src="path/to/image.jpg" alt="Description of the image">

And here is the same image using Markdown:
![Description of the image](path/to/image.jpg)


#pyautogui

##mouse

```python 鼠标当前位置
pyautogui.size()            #返回屏幕宽高像素数的元组
                            #例如，如果屏幕分辨率为1920*1080，那么左上角的坐标为（0,0）,
                            #右下角的坐标是（1919,1079）
```

```python 移动
pyautogui.moveTo(x,y[,duration = t])  # 将鼠标移动到屏幕指定位置，
                                      #x,y是目标位置的横纵坐标，duration指定鼠标光标移动到目标位置
                                      #所需要的秒数，t可以为整数或浮点数，省略duration参数表示
                                      #立即将光标移动到指定位置（在PyAutoGUI函数中，所有的duration
                                      #关键字参数都是可选的）
                                      #Attention：所有传入x,y坐标的地方，都可以用坐标x,y
                                      #的元组或列表替代，(x,y)/[x,y]

pyautogui.moveRel(x,y[,duration = t]) #相对于当前位置移动光标，
                                      #这里的x,y不再是目标位置的坐标，而是偏移量，
                                      #如，pyautogui.moveRel(100,0,duration=0.25)
                                      #表示光标相对于当前所在位置向右移动100个像素
```
```python 点击
pyautogui.mouseDown()   #按下鼠标按键（左键）

pyautogui.mouseUp()     #释放鼠标按键（左键）

pyautogui.click()       #向计算机发送虚拟的鼠标点击(click()函数只是前面两个函数调用的方便封装)
                        #默认在当前光标位置，使用鼠标左键点击

pyautogui.click([x,y,button='left/right/middle'])  #在(x,y)处点击鼠标左键、右键、中键
                                                   #但不推荐使用这种方法，下面这种方法效果更好
                                                   #pyautogui.moveTo(x,y,duration=t)
                                                   #pyautogui.click()
pyautogui.doubleClick() #双击鼠标左键

pyautogui.rightClick()  #单击鼠标右键

pyautogui.middleClick() #单击鼠标中键
```
```python 拖动
pyautogui.dragTo(x,y[,duration=t)      #将鼠标拖动到指定位置
                                       #x,y：x坐标，y坐标

pyautogui.dragRel(x,y[,duration=t])    #将鼠标拖动到相对当前位置的位置
                                       #x,y：水平移动，垂直移动
```
```python 滚动
pyautogui.scroll()         #控制窗口上下滚动（滚动发生在鼠标的当前位置）
                           #正数表示向上滚动，负数表示向下滚动，
                           #滚动单位的大小需要具体尝试

#eg:
sleep(2)
click()
moveTo((1418,12),duration=2)
click()
moveTo([1392,47],duration=1)
click()
typewrite('https://wwww.baidu.com')
typewrite(['enter'])
```
```输入字符串
pyautogui.typewrite([键盘键字符串])      #除了单个字符串，还可以向typewrite()函数传递键字符串的列表
                                         #如 pyautogui.typewrite(['a','b','left','left','X','Y'])
                                         #按'a'键，'b'键，然后按左箭头两次，然后按'X'和'Y'
                                         #输出结果为XYab

pyautogui.keyDown()        #根据传入的键字符串，向计算机发送虚拟的按键（按下）

pyautogui.keyUp()          #根据传入的键字符串，向计算机发送虚拟的释放（释放）

pyautogui.press()          #前面两个函数的封装，模拟完整的击键（按下并释放）

#eg:
pyautogui.keyDown('shift');pyautogui.press('4');pyautogui.keyUp('shift')
#按下Shift，按下并释放4，然后释放Shift
```
##键盘键字符串                        含义
'a','b','c','A','C','1','2','3',    单个字符的键
'!','@','#'等

'enter'                             回车

‘esc'                              ESC键

'shiftleft','shiftright'            左右Shift键

'altleft','altright'                左右Alt键

'ctrlleft','ctrlright'              左右Ctrl键

‘tab'(or '\t')                     Tab键

'backspace','delete'                Backspace键和Delete键

'pageup','pagedown'                 Page Up 和Page Down键

'home','end'                        Home键和End键

'up','down','left','right'          上下左右箭头键

'f1','f2','f3'等                    F1至F12键

'volumemute','volumeup',volumedown' 静音，放大音量和减小音量键

'pause'                             暂停键

'capslock','numlock','scrolllock'   Caps Lock，Num Lock和 Scroll Lock键

'insert'                            Insert键

'printscreen'                       Prtsc或Print Screen键

'winleft','winright'                左右Win键(在windows上)

'command'                           Command键(在OS X上)

'option'                            Option键(在OS X上)
##快捷键组合
```
pyautogui.hotkey()           #接收多个字符串参数，顺序按下，再按相反的顺序释放

#eg:
pyautogui.hotkey('ctrl','c')  #按住Ctrl键，然后按C键，然后释放C键和Ctrl键

相当于

pyautogui.keyDown('ctrl')
pyautogui.keyDown('c')
pyautogui.keyUp('c')
pyautogui.keyUp('ctrl')
```




