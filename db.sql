create table Admin(
AdminID int identity primary key,
AdminName varchar(100),
Password varchar(32)
)

insert into Admin (AdminName,Password) values ('admin','E10ADC3949BA59ABBE56E057F20F883E')

create table NewsCategory(
CategoryID int primary key identity,
CategoryName varchar(100),
ParentID int default 0,
Deletable bit default 1,
Sort int default 0
)

create table News(
NewsID int primary key identity,
Title varchar(400),
Guide varchar(6000),
SubTitle varchar(200),
CategoryID int,
Cover varchar(255),
Content text,
PublishTime datetime,
Tags varchar(200),
Sort int
)

insert into NewsCategory (CategoryName,Deletable) values ('关于我们',0),('小小辅导员',0),('最新资讯',0),('帮助中心',0)

create table Lesson(
LessonID int primary key identity,
LessonName varchar(400),
Cover varchar(255),
Description varchar(1000),
Sort int
)

create table Teacher(
TeacherID int primary key identity,
TeacherName varchar(400),
Cover varchar(255),
Video varchar(255),
Description varchar(1000),
Sort int
)

create table Schedule(
ScheduleID int primary key identity,
LessonID int,
TeacherID int,
DateStr varchar(32),
Time varchar(32),
Date datetime,
DateDisplay varchar(20)
)


create table Users(
UserID int primary key identity,
UserName varchar(100),
Auth varchar(300),
Mobile varchar(20),
Email varchar(300),
Birthday datetime,
LatestLoginDate datetime,
RegisterDate datetime,
TestingStatus int
)


--2014-12-04
alter table Lesson add Price decimal(18,2)
alter table Lesson add TotalPrice decimal(18,2)

drop table Reservation
create table Reservation(
ReservationID int primary key identity,
UserID int,
ScheduleID int,
--0:未付款; 1:已付款未确认 2:已确认
PayStatus int
)

create table DeletedLesson(
LessonID int primary key,
LessonName varchar(400),
Cover varchar(255),
Description varchar(1000),
Sort int,
Price decimal(18,2),
TotalPrice decimal(18,2)
)

truncate table Users
select * from Users

--2014-12-07
--服务器未同步

--课程类型 0:测试课程 1:普通课程
alter table Lesson add [Type] int
update Lesson set [Type]=1

alter table Reservation add Code varchar(32)
alter table Reservation add BuyType int
alter table Reservation add PayType int
alter table Reservation add Price decimal(18,2)
alter table Reservation add [Status] int


--2014-12-14
alter table Users add Gender bit
alter table Users add Parents varchar(10)
alter table Users add EnglishName varchar(20)
alter table Users add WeChatName varchar(50)
alter table Users add School varchar(400)
alter table Users add Address varchar(400)


select * from Users where Mobile='12345678901'
