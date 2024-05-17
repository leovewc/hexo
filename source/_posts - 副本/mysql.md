---
layout: mysql
title: mysql
date: 2023-10-19 09:18:32
tags:
---
## 指令
```
select student_ID,student_Name
from student;
where student_Name = 'Mary Lamb';
```
```
select distinct student_Name，student_Address//查找可以有重复的，比如同一个人但是住在不同的地方或者同名的人；不能查找unique的元素。
from student;
```
```match criteria
select *
from student
where student_Mobile >111 and student_Age <18;
```
not in('  ','  ');
between 1 and 5;(1,2,3,4,5)
in(1,5);(1,5)
### %
A% = A____  例如AHMAD;
%A = ____A  例如SERA；
%A% = _A____  例如 SEAR；
A%A；
...
```
select *
from student
where student_Name like 'L%K%';
```
### group by
### join
### drop
### delete
记得删除要加from;
安全删除日志或单独的记录，可以复原，不删除表的关系等。而drop会删掉所有的并不能复原；
### concat 把两个column合在一起，只是查询临时放在一起
```
select concat(student_ID,',',student_Name)as'student info'
from student;
```
### add _ datetime null default now()
```把当前时间加入到表 _ 中
alter table student
add student_time datetime null default now();
```
### insert 
```
insert into student
(student_Name,student_Mobile,student_Email,student_ID)
values
('LK','0','0','xmus004');//加入新人lk
select * from student
order by student_ID;//显示顺序
```
```加column
alter table student
add DOB date NULL;
alter table student
add AGE int null;
```
然后设置一个DOB：
```
update student
set DOB = '2020-03-14'
where student_ID = 'xmus002';
```
根据设置的DOB来自动计算人年龄：
```
update student
set AGE =date_format(FROM_DAYS(DATEDIFF(NOW(),DOB)),'%Y') + 0
where student_ID between 'xmus001' and 'xmus004';
```
## 第6周作业
```
create database shop;
```
```
use shop;
```
```
create table customer
(
customerID varchar(10) not null primary key,
FirstName varchar(20) not null,
LastName varchar(20) not null,
DateofBirth date null,
street varchar(20) null,
city varchar(20) null,
state varchar(20) null,
MobileNo int null
);
```
```
create table item
(
ItemID varchar(10) not null primary key,
ItemName varchar(20) not null,
Price decimal(10,2) null,
Brand varchar(20) not null
);
```
```
create table salesman
(
StaffID varchar(10) not null primary key,
StaffName varchar(20) not null,
WorkingDate date null,
Salary decimal(10,2) null
);
```
```
create table transaction
(
InvoiceNo int not null primary key,
CustomeID varchar(10) not null,     //primary key 和 forigen key 都不能为null
ItemID varchar(10) not null,
StaffID varchar(10) not null,
Quantity int null,
TotalAmount decimal(10,2) null,
Foreign Key fk_transaction_CustomerID(customeID) references Customer(customerID),//不用区分大小写
Foreign Key fk_transaction_ItemID(ItemID) references item(ItemID),
Foreign Key fk_transaction_StaffID(staffID) references salesman(staffID)
);
```
```
insert into Customer
(customerID, FirstName,LastName,DateofBirth,Street,City,state,MobileNo)
values
('C001','Britney','Spears','2020-10-04','2nd Street','Sepang','Selangor','09222333'),
('C002','Britney','Jackson','2007-06-04','3rd Street','Shah Alam','Selangor','019444333'),
('C003','John','Wick','1996-04-07','2nd Level','Butterworth','Penang','019999333'),
('C004','John','Cena','1990-03-03','3rd Floor','Georgetown','Penang','012222333'),
('C005','Elizabeth','Stone','1985-04-03','4th Street','Sepang','Selangor','012567333'),
('C006','Jimmy','Stone','2002-10-03','2nd Street','Shah Alam','Selangor','019224433'),
('C007','Justin','Timerlake','2015-06-04','2nd Street','Shah Alam','Selangor','019444333');
```
```
insert into Item
(ItemID, ItemName,Price,Brand)
values
('I001','Laptop','1500','Huawei'),
('I002','Laptop','1700','Dell'),
('I003','Laptop','3500','Apple'),
('I004','Tablet','800','Apple'),
('I005','Tablet','1000','Huawei'),
('I006','Mouse','70','Huawei'),
('I007','Mouse','80','Logistech'),
('I008','Printer','500','HP'),
('I009','Printer','300','Canon'),
('I010','Speaker','50','Huawei');
select *from item;
```
```
insert into transaction
(InvoiceNo,customeID,ItemID,StaffID,Quantity)
values
('10001','C001','I003','S001','1'),
('10002','C001','I004','S001','1'),
('10003','C002','I001','S001','1'),
('10004','C002','I006','S001','1'),
('10005','C003','I002','S002','5'),
('10006','C003','I007','S002','5'),
('10007','C004','I009','S003','3'),
('10008','C004','I008','S003','2'),
('10009','C005','I001','S003','2'),
('10010','C005','I005','S003','2');
select *from transaction;
```
以上全是准备工作，现在才是重点
```1.  Write a query to display list of purchase item for customer ID (C001, C002).
select * from Transaction
where customeID IN('C001','C002');
```
```2.  Write a query to display list of customer for Staff ID (S001, S002).
select * from Transaction
where staffID IN('s001','s002');
```
```3. Write a query to display the customer ID, customer full name, and Full Address from customer Table.
select customerID as'ID NO',
concat(FirstName,' ',LastName) 'Full Name',
concat(street,',',city,',',state) 'Mailing Address'
from customer;
```
```4. Write a query to display the item id, item name, and price that price more than RM700.
select itemID,itemname,price
from item
where price >=700
order by price;
```
```5. Write a query to display the customer id, fullname (First+LastName), state that live in Selangor.
select customerID, 
concat(firstname,' ',lastname) as 'FULL Name', state
from customer
where state = 'selangor';//where state like 'sel%';
```
```6.  Write a query to list all the state in customer table.
select distinct state   //避免重复的
from customer;
```
```7. Write a query to display the price range is between 500 to 2000
select *from item
where price between 500 and 2000 //注意between和in的区别
order by price;
```
```8. Write a query where clerk salary is less than 1,500 and working before 2011.
select *from salesman
where Salary <= 2000 and WorkingDate <= '2011-01-01' //注意日期写法
order by WorkingDate;
```
```9. Write a query to display customer age.
select customerID, concat(firstname,' ',lastname) as 'full name',
concat(street,',',city,',',state)as'full address',dateofbirth,   //真的复杂，之前合并了，现在就都得写
(date_format(FROM_DAYS(DATEDIFF(NOW(),Dateofbirth)),'%Y') + 0)as age //这个不会真要背吧
from customer
order by age;
```
```10. Write a query to display working experience.
select staffid,staffname,workingdate,
(date_format(FROM_DAYS(DATEDIFF(NOW(),workingdate)),'%Y') + 0)as 'working experience' //长string用‘ ’括起来
from salesman
order by workingdate desc;
```
### 第7周作业
``` Write a query to display list of member information where name start with J.
select FirstName,
from members
where FirstName like 'J%';
```
```Write a query to display list of member that register for Diamond membership.
select *,
from members
where tpye_name = 'Diamond';
```
```Write a query to list all the state in member table.
select distinct state
from members;
```
```Write a query to display the member ID, member full name, Full Address, membership and sort by membership.
select memberID,
concat(LastName,',',city,',',FirstName)'Full Name',
concat(Street,',',City,',',State)'Full Address'),type_name,
from member
order by type_name;
```
```Write a query to display member age.
select memberID,
concat(LastName,',',city,',',FirstName)'Full Name',
concat(Street,',',City,',',State)'Full Address'),type_name,DOB,
((date_format(FROM_DAYS(DATEDIFF(NOW(),Dateofbirth)),'%Y') + 0)as age
from member
order by age;
```
```Write a query to display member that lives in Johor or Selangor.
select memberID,
concat(LastName,',',city,',',FirstName)'Full Name',
concat(Street,',',City,',',State)'Full Address'),type_name,DOB,
((date_format(FROM_DAYS(DATEDIFF(NOW(),DOB)),'%Y') + 0)as age
from member
where state = 'Johor' or state = 'selangor' -- where state in ('Johor','selangor')
order by age;
```
```Write a query to display MemberID, ClassID, TrainerID and sort by ClassID.
select memberID,classID,
from register
order by classID;
```
```Write a query to display the class id, class name, and class price between RM50 and RM150.
select classID,ClassName,Fee
from class
where fee between 50 and 150;
```
```Write a query where trainer salary is less than 3,000 and working before 2015.
select *
from trainer
where salary <3000 and WorkingDate <'2015-01-01'; --第一个是年，第二个是日，最后是月
```
```Write a query where trainer working experience is less than 5 years or specialized in Martial arts.
select trainerID,trainerName,workingDate,skill,
((date_format(FROM_DAYS(DATEDIFF(NOW(),workingdate)),'%Y') + 0)as experience
from trainer
where wokingdate >'2019-01-01' or skillID = 's001'; --大大的注意不能用experience来比较，系统不知道我们新建的这个是什么意思，所以还是只能用已有的workingdate.
```
总的来说，给列赋予别名时AS关键字是可选的，而且别名不需要用引号括起来。
### 第八周 Adding Jion Queries
#### inner join
```找到members 和 register 的交集.跟以前不一样是要加例如member.前缀
SELECT register.MemberID , members.firstName,
members.LastName, register.ClassId
from members inner join register on members.MemberID = register.memberID;
```
```升级版，但是一个table的 relationship不要超过2.
SELECT register.MemberID , concat(members.firstName,' ',members.LastName) as 'Full Nmae', register.ClassId, concat(members.street,' ',members.city,' ',members.state)'Address',
class.classname, class.price, membership.type_name
from membership inner join members on membership.type_name = members.type_name 
 inner join register on members.MemberID = register.memberID 
 inner join class on register.classid = class.classid
```
#### outer join
#### left join
#### right join
#### full join
!(){1.png}
#### aggreate
count, sum, min, max, average
```
select a,b,c,
count(register.classid) as 'Total class',
sum(class.price)as 'Total price'
from member class join register on member.memberid = register.memberid
group by register.memberid      --group 必不可少
```
#### Mathematic calculation
* / - +
```
sum(class.price)as"before discount",
sum((1-membership.discout) * class.price)as "Total Amount"
group by member.memberid;
```
### 9
```
select transaction.staffid, salesman.StaffName,
count(transaction.itemid)'order number',
sum(transaction.quantity)'total quantity',
sum(transaction.quantity*item.price) 'total sales',
(sum(transaction.quantity*item.price))*0.1+salesman.Salary as 'salery'
from salesman  inner join transaction on salesman.staffid = transaction.staffid
inner join item on item.itemid = transaction.itemid
group by transaction.staffid;
```
### 10
往已经有的table里加外键
```
alter table registration
add foreign key (staffid)
references staff(staffid);
```
Exercise
1. Write a query to display list of GuestID, Guest Full Name, Guest Address, and RoomID from registration
and guest table.
2. Write a query to display list of GuestID, Guest Full Name, Guest Address, RoomID, Roomtype from
registration, guest and room table.
3. Write a query to display list of GuestID, Guest Full Name, Guest Address, RoomID, Roomtype from
registration, guest and room table where Firstname start with ‘J’ and lives in Selangor. Compare the
registration and guest for Null values.
4. Write a query to count how many room that every guest has book.
5. Write a query for the SUM cost that the guest needs to pay for the room.
6. Write a query for the discounted rooms for every guest.
7. Write a query to count how many room that every staff has submitted.
8. Write a total sum of sales for every staff.
9. Calculate the total salary for staff if they get 15% commission from the total sales.
10. Calculate the age and working experience from guest and staff where age < 30 years old or working
experience > 10.
```
select registration.guestid,
concat(guest.firstname,'  ',guest.lastname) 'full name',
concat(guest.street,' ,',guest.city,' ,',guest.state) 'mailing address',
registration.roomid, room.roomtype,room.price
from guest inner join registration on guest.guestid = registration.guestid
inner join room on registration.roomid = room.roomid
```
在后面加where guest.firsname like '%kun'； 会发现结果为空，empty output = no sharing data on selected condition;
但是加 left outer
```
from guest left outer join registration on guest.guestid = registration.guestid
left outer join room on registration.roomid = room.roomid
where guest.firstname like 'j%' and guest.state = 'selangor';
```
有的变成null了 这个意思是no data;
再加：where registration.guestid is null; 出来的结果表示还没有订房间的客人；
```
select registration.guestid,
concat(guest.firstname,'  ',guest.lastname)as 'full name',
concat(guest.street,' ,',guest.city,' ,',guest.state) 'mailing address',
sum(room.price*datediff(registration.checkout,registration.checkin))as 'total pay',
((100-membership.discount)/100) as 'total discount'
from membership inner join guest on membership.type = guest.type
inner join registration on guest.guestid = registration.guestid
inner join room on registration.roomid = room.roomid
group by registration.guestid;
```
### 12
触发器trigger
{after, before}->{insert,update,delet}
```
create trigger before_update_salary
before update on employee
for each row
set new.salary = (new.hourly_pay *200);
show triggers;
```
然后写一个更新
```
update employee
set hourly_pay = 35
where employee_id = 1;
select * from employee;
```
设置另外一个表跟employee相关
```
update expense 
set expnese_total = (select sum(salary) from employee)
where expense_id = 'E01';
select * from expense;
```
```
create trigger after_update_salary
after update on employee
for each row
update expense
set expnese_total = expnese_total + (new.salary - old.salary)
where expense_id = 'E01';
show triggers;
```
这样employee 表改变了expense 也会自动改（after); (expense 是 所有工资和）
我们再加一个来自动算新加入员工的工资
```
create trigger before_insert_salary
before insert on employee
for each row
set new.salary =(new.hourly_pay *200);
show triggers;

```
这样我们插入新员工就不用salary一列了，但是之前的expense是要update才能更新的，如果是插入的话就不会触发update触发器；如果要一起自动改的话要写个afre_insert_salary的触发器
```
create trigger after_insert_salary
after insert on employee
for each row
update expense
set expnese_total = expnese_total + new.salary 
where expense_id = 'E01';
show triggers;
```
接下来是delet,使用before_delet会使数据先存在archives表中（我们自己创建），然后删除，这个会触发update;
```
create table salary_archives(
id int primary key auto_increment,               -- 自动生成id
employee_id int,
first_name varchar(20),
hire_date date not null,
salary decimal(10,2) not null default 0,
deleted_time timestamp default now());           -- 学非了
select * from salary_archives;
```
然后是触发器(删除前）
```
create trigger before_delete_salary
before delete on employee
for each row
insert into salary_archives (employee_id, first_name, hire_date, salary)
values(old.employee_id,old.first_name, old.hire_date,old.salary);
show triggers;
```
删除后
```
create trigger after_delete_salary
after delete on employee
for each row
update expense
set expnese_total = expnese_total - old.salary
where expense_id = 'E01';
show triggers;
```
### 13
用bookshop表，但是我没有，，，，只写一些关键代码
需要计算出价钱，用PurchaseMenu中的书购买数量 * Book中的书价钱;
这用了两个表，需要inner join,但是trigger不能用inner join,所以要用一些特殊的：(select price from Book where Book_ID = New.Book_ID)或者用add on把price加入到purchaseMenu中然后用inner join, 但是这样的话
之后我们加新的一行他就不会自动更新price但是totalAmount还会自动更新因为totalAmoint是通过Book表更新的,但是可以设置trigger来改进：
```
alter table purchaseMenu
add Price decimal(10,2) null after quantity;
update purchaseMenu
innor join
```
同一个表是 before update,不同表是 after update;
```
Update PurchaseMenu
inner join Bool on PurchaseMenu.Book_ID = Book.Book_ID
set TotalAmount = Book.Price * PurchaseMenu>Quantity
```
然后有一个sales表
```
update sales
set sales_total = (select sunm(TotalAmount) from PurchaseMenu)
where sales_id = 'S01';
```
```
create trigger before_update_quantity
before update on PurchaseMenu
for each row
set new.TotalAmount = (select price from Book where Book_ID = new.Book_ID) * new.Quantity;
show triggers;
```
```
create trigger after_update_quantity
after update on PurchaseMenu
for each row
update sales
set sales_total = sales_total + (new.totalAmount - old.totalAmount)
where sales_ID = 'S01';
show triggers;
```
```
create trigger after_insert_quantity
after insert on PurchaseMenu
for each row
update sales
set sales_total = sales_total + (new.totalAmount)
where sales_ID = 'S01';
show triggers;`
```
```
create trigger before_insert_quantity
before insert on PurchaseMenu
for each row
update sales
set new.TotalAmount= (select price from Book where Book_ID = new.Book_ID) * new.Quantity;
show triggers;
```   
接下来是delete但是我不想写了
然后是加price给purchaseMenu之后设置trigger也不想写了
考试会出一个after一个before,她刚刚说不考了。。

### revision
#### Chen 没有 m:m, crow有；er 图可以有m:m(follow the business rule);
#### relational schema
1:1 的时候在两个里面随便选一个给别人当外键；
M:M 给关系创一个表（assosiative table)；如果是M：1但是关系里面有attribute,那就把关系里的attribute弄到m里面；
Multivalued Attribute 要单独写一个；
##### 第二题解：
EERD(option B)
Doctor(P,N,E,D,StationNR)
Nurse(P,N,S,StationNR)
Patient(P,N,L,R,From,To)
Treat(PatientNR, PersNR)
Roon(R,B,stationNr)
Station(S,N)
Worker(P,N,StationNR) (这个如果是optional B的话就不用写了，把stationNR放在子表里，如果是A的话那子表里面不用写StationNR）
##### 最后一个题：
(a
```
select MemberID, concat(FirstName,' ', LastName) as FullName, concat( Street,',',City,',',State) as FullAddress
from member
where state = 'SELANGOR';
```
(b
```
select MemberID, count(BookID)
from CheckOut
Group by MemberID;
```
(c
```
datediff(ReturnDate, CheckoutDate). 
```
So he borrow for (20 - 1) = 19 days
(d
```
Book.Prive *0.5
```
So she need to pay RM80 * 0.5 = RM40





