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

insert into NewsCategory (CategoryName,Deletable) values ('��������',0),('СС����Ա',0),('������Ѷ',0),('��������',0)

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
RegisterDate datetime
)
