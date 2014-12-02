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
SubTitle varchar(200),
CategoryID int,
Cover varchar(255),
Content text,
PublishTime datetime,
Tags varchar(200),
Sort int
)

insert into NewsCategory (CategoryName) values ('关于我们'),('小小辅导员'),('最新资讯'),('帮助中心')

