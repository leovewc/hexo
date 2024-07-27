---

---

#Chapter 12 - Architecture Analysis  and Package Desi

##What Is Software Architecture

The software architecture of a program or computing system is the structure or structures of the system .软件架构是系统的结构.

###Why Software Architecture Is Important 

Communication with stakeholders

###Layered Architecture

Components within the layered architecture pattern are organized into horizontal layers, each  layer performing a specific role within the application.

Most layered architectures consist of four standard  layers: presentation, business, persistence, and  database.

分层架构将应用程序划分为水平层次，每层执行特定角色。

典型的分层架构包括四个标准层：展示层、业务层、持久层、数据库层。

#### 	layered Architecture advantages	

1. design based on the incremental level of abstraction.基于增量抽象层次的设计。
2. provides enhancement independence.提供增强独立性。
3. implemented by using component-based technology, makes the system much easier for plug-and-play new component.通过组件技术实现，便于插拔新组件。
4. each layer is replaced by an equivalent implementation.每层可替换为等效实现，不影响其他层。
5. each layer can be an abstract machine deployed independently.每层可独立部署，支持可移植性

####	disadvantages

1. not easily structured in a layered fashion.某些应用或系统难以按层次结构化。
2. Lower runtime performance.较低的运行时性能，因为客户端请求或响应必须经过多个层。
3.  overhead on the data marshalling and buffering by  each layer.数据编组和缓冲的开销影响性能。
4. Exceptions and error handling.异常和错误处理问题，因为故障必须向上传递到所有调用层

#### Interaction-oriented Architecture

==separate the interaction of user==  from data abstraction and business data processing.

将用户交互与数据抽象和业务数据处理分离

#### MVC

 ==separate the user  interface layer== from other parts of the system. 

MVC是一个用于将用户界面层与系统其他部分分离的架构模式。

	#### 	ads

1. ==Separation of design concerns==.设计关注点分离
2. More ==easily maintainable and extensible==.更易维护和扩展
3. Promotes ==division of labour==.促进劳动力分工

#### 	disad

1. ==Not suitable for agent-oriented==.不适用于面向代理的应用，如交互式移动和机器人应用。
2.  ==data model  change expensive==.基于相同数据模型的多个控制器和视图对数据模型的更改代价高昂。
3. The ==division==between the View and the Controller is not clear in some cases.在某些情况下，视图和控制器之间的分工不明确。

### Layered VS MVC

1. ==Layered architecture== ==does not allow coupling== ==like in MVC==, where MVC components could talk to  each other.  ==layered architecture only allows message passing between layers==
2. MVC architecture is mostly used for ==presentation==, but layered architecture is focused on the  ==entire system==.
3. For an example, a large enterprise application font with layers can have a <u>presentation layer</u> which  uses a UI framework that makes use of MVC, but <u>everything else is layered such as API</u>,  Persistence and Communication busses.

### 包图

####目的

- ==structure high level system elements==. group classes into packages.

  包图用于组织高层系统元素，简化复杂的类图，将类分组到包中。

-  A package is a collection of logically related UML elements. Packages are depicted as file folders 

  包是逻辑上相关的UML元素的集合，通常表示为文件夹

# Chapter 14 – Design a  Persistence Framework  with Patterns

Persistence is the term used in computer science to describe a ==capability to store data  structures in non-volatile storage== such as a file system or a relational database.

持久性是指将数据存储在持久存储中的能力。对象与关系数据库的结构和语义不同==Data type differences==，这导致了阻抗不匹配的问题 ==impedance mismatch==. 

## Advantages of ORM 

1. Let’s business code access objects rather than DB tables. 让业务代码访问对象而不是数据库表。
2. Hides details of SQL queries from OO logic. 隐藏SQL查询的细节。
3. No need to deal with the database implementation. 不需要处理数据库实现。
4. Entities based on business concepts rather than database structure. 基于业务概念而不是数据库结构的实体。
5. Transaction management and automatic key generation. 事务管理和自动键生成。
6. Fast development of application.快速开发应用程序。

# 总结

##优缺点

### Client–Server Architectures

1. ==Scalability== -==easy to increase or decrease the storage== and processing capabilities of the  servers. 

   可扩展性：易于增加或减少服务器的存储和处理能力。

2. ==Interoperability== - can ==**support many different types of clients and servers**==, possible to  connect computers that use different operating systems.  

   互操作性：支持多种客户端和服务器，可能连接使用不同操作系统的计算机。

3. ==Modularity== - ==separate the presentation logic, the application logic==, ==and the data access logic== and ==design== so that each is somewhat independent.  

   模块化：分离表示逻辑、应用逻辑和数据访问逻辑，使每个逻辑独立。

4. ==Reliability== - ==no central point of failure== that will halt the entire network if it fails, the  network can continue to function using all the other servers.

   可靠性：没有单点故障，即使某个服务器失败，网络仍可继续运行。

   ### Client-Server Tiers - N-tiered architecture

   Disadvantages

   ◦ ==greater load== on the network。 增加了网络负载。

   ◦==more difficult to program and test software== in n-tiered  architectures than in two-tiered architectures because more  devices have to communicate. 编程和测试软件更困难，因为需要多个设备之间通信。

### Advantages of ORM

Let’s ==business code access objects== rather than DB tables.让业务代码访问对象而不是数据库表

==Hides details of SQL queries== from OO logic.隐藏SQL查询的细节

==No need to deal with the database implementation==.无需处理数据库实现细节。

==Entities based on business concepts== rather than database structure.基于业务概念的实体，而非数据库结构

==Transaction management== and ==automatic key generation==.事务管理和自动键生成。

==Fast development of application==.快速开发应用程序

####Hibernate Advantages

1. Hibernate takes care of ==mapping Java classes to database== tables using XML files and without 
   writing any line of code.	通过XML文件将Java类映射到数据库表，无需编写代码
2. ==Provides simple APIs for storing and retrieving== Java objects directly to and from the database.提供简单的API，将Java对象直接存储和检索到数据库中。
3. If there is change in the database or in any table, then you ==need to change the XML file 
   properties only==.如果数据库或表发生变化，只需更改XML文件属性。
4. ==Abstracts away== the unfamiliar SQL types and provides a way to work around ==familiar Java 
   Objects==.抽象掉不熟悉的SQL类型，提供熟悉的Java对象操作方式。
5. Hibernate does ==not require an application server== to operate.不需要应用服务器即可运行
6. ==Manipulates complex associations== of objects of your database.处理数据库中对象的复杂关联。
7. ==Minimizes database== access with ==smart fetching strategies==.通过智能获取策略最小化数据库访问
8. Provides ==simple querying of data==.提供简单的数据查询方式

### Benefits of controller

1. either the UI classes or the problem domain classes can change without affecting the other side.
2. reuse of controller class.
3. maintain the state of use case.
4. control the sequence of the activities.

## 各个图功能解释

Logical

process

development

physical

scenario

| View        | Description                                 |                                               |
| ----------- | ------------------------------------------- | --------------------------------------------- |
| Logical     | it describes the object model of the design | Class, State, Object, Sequence, Communication |
| Process     | activities of the system                    | Activity                                      |
| Development |                                             | Component, Package                            |
| Physical    |                                             | Deployment                                    |
| Scenario    |                                             | Use case                                      |



### use case:

1. Use-case diagrams describe the ==high-level functions and scope== of a system.
2. identify the ==interactions== between the ==system and its actors==
3. Use case diagrams express the ==expectations== (outsider's view) of the ==customers/stakeholders== essential for a detailed design

### activity :

1. An activity diagram ==visually presents== ==a series of actions or flow of control== in a system.

   以可视化方式展示了系统中的一系列动作或控制流。

2. It captures the ==dynamic behavior== of the system. 

   它捕捉了系统的动态行为。

3. Activity diagrams are often used in ==business process modeling==. 

   常用于业务流程建模。

4. They can also ==describe the steps== in a use case diagram. 

   它们还可以描述用例图中的步骤。

5. Activities modeled can ==be sequential and concurrent==. 

   所建模的活动可以是顺序的或并发的。

#### point

action: an action represents a single atomic step within activity

activity: represents a behavior that is composed of individual elements that are actions.

central buffer: saving and passing on object tokens and ==transient memory== `<<centralBuffer`

Data Store: saving and passing on object tokens, ==Permanent memory== `<<datastore>>`

event-base action

partition

exception handler

interruptible activity region

structure activity node

expansion region

### domain:

==visual representation== of ==conceptual model== or ==real-world objects== in a  ==domain of interest==.

### class:

==construction plan for a set of similar objects== that  appear in the system to be specified.

### interaction: sequence, communication

interactions between objects,

interactions: specifies how messages and data are exchanged between interaction partners

### state machine:

shows the order or states underwent by an object within the system.

###Component : 

 collection of classes. encapsulated by interfaces. components are replaceable.  reuse

组件是由类组成的功能模块，通过接口与系统交互，可以复用和替换。

collaborations and internal structure. static-structural

组件图展示了系统中组件的结构和关系，是静态的结构图。

#### 关注点

`<<component>>`

`<<subsystem>>`

port![image-20240721163659917](https://raw.githubusercontent.com/leovewc/images/main/image-20240721163659917.png)

association 直线

composition

aggregation

constraint![image-20240721163817560](https://raw.githubusercontent.com/leovewc/images/main/image-20240721163817560.png)

dependency

inheritance

### deployment:

show the ==allocation of artifacts== to ==nodes== in the ==physical design==  of a system. 部署图用于展示物理设计中工件到节点的分配。

A single deployment diagram represents a view into the ==artifact structure of a system==.

#### 关注

1. Node : represents a ==computational resource==, generally having  memory and processing capability.
2. Connection: ==Nodes communicate== with one another, via messages and signals, through a communication  path indicated by a solid line.
3. Artifact:  concrete elements  in the physical world that are the result of a development  process. 工件代表物理世界中开发过程的具体元素，

### package:

Package diagrams are used to ==structure high level system elements==. Packages are used for  organizing large system which contains diagrams, documents and other key deliverables.

## 对比

### layered VS MVC

1. ==Layered architecture== ==does not allow coupling== ==like in MVC==, where MVC components could talk to  each other.  ==layered architecture only allows message passing between layers==
2. MVC architecture is mostly used for ==presentation==, but layered architecture is focused on the  ==entire system==.
3. For an example, a large enterprise application font with layers can have a <u>presentation layer</u> which  uses a UI framework that makes use of MVC, but <u>everything else is layered such as API</u>,  Persistence and Communication busses.

### sequence VS activity

**顺序图**：

- 可视化系统中执行特定功能的调用顺序。==visualize the sequence of calls== that is used to perform a specific functionality
- 展示对象间的消息流。show the ==message flow== from ==one object to another object==
- 用于动态建模。used for the purpose of ==dynamic modelling==
- 描述单个用例中多个对象的行为。describe the ==behavior== of ==several objects in a single use case==
- 表示过程的时间顺序。represent the ==time order of a process==

**活动图**：

- 模型系统的工作流程。==model the workflow== of a system
- 展示活动之间的消息流。show the message flow from one ==activity== to another
- 用于功能建模。used for the purpose of ==functional modelling==.
- 描述多个对象和用例的通用序列。describe the ==general sequence== of ==action for several objects and use case==.
- 表示过程的执行。represent the ==execution of the process==.

### coupling VS cohesion

| 耦合                                                         | 内聚                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| indication of  the ==relationship between modules==          | indication of the ==relationship within module==             |
| 耦合表示模块之间的关系。                                     | 内聚表示模块内部的关系。                                     |
| shows the ==relative independence== among the modules.       | shows the module’s ==relative functional strength==          |
| 耦合显示模块之间的相对独立性。                               | 内聚显示模块的相对功能强度。                                 |
| a degree to which a component or module is ==connected to other modules== | is degree/quality to which a component/module ==focuses on single thing==. |
| 耦合是组件或模块与其他模块连接的程度。                       | 内聚是组件或模块专注于单一任务的程度。                       |
| strive for low coupling.                                     | strive for high cohesion                                     |
| 努力保持低耦合，即模块之间的依赖性应尽量少。                 | 努力保持高内聚，即一个内聚组件或模块专注于单一任务，与系统的其他模块交互较少。 |
| dependency between modules should be less                    | module focus on single task with little interaction with other modules of the system |

