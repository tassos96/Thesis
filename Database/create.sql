USE [master]
GO
/****** Object:  Database [AutoQuizzer]    Description: Database creation script******/
CREATE DATABASE [AutoQuizzer]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AutoQuizzer', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AutoQuizzer.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AutoQuizzer_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\AutoQuizzer_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

ALTER DATABASE [AutoQuizzer] SET COMPATIBILITY_LEVEL = 150
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AutoQuizzer].[dbo].[sp_fulltext_database] @action = 'enable'
end

GO
ALTER DATABASE [AutoQuizzer] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AutoQuizzer] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AutoQuizzer] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AutoQuizzer] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AutoQuizzer] SET ARITHABORT OFF 
GO
ALTER DATABASE [AutoQuizzer] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AutoQuizzer] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AutoQuizzer] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AutoQuizzer] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AutoQuizzer] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AutoQuizzer] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AutoQuizzer] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AutoQuizzer] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AutoQuizzer] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AutoQuizzer] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AutoQuizzer] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AutoQuizzer] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AutoQuizzer] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AutoQuizzer] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AutoQuizzer] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AutoQuizzer] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AutoQuizzer] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AutoQuizzer] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AutoQuizzer] SET  MULTI_USER 
GO
ALTER DATABASE [AutoQuizzer] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AutoQuizzer] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AutoQuizzer] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AutoQuizzer] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AutoQuizzer] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AutoQuizzer] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [AutoQuizzer] SET QUERY_STORE = OFF
GO
USE [AutoQuizzer]
GO
/****** Object:  User [testuser]    Script Date: 5/14/2023 11:37:29 PM ******/
CREATE USER [testuser] FOR LOGIN [testuser] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [aantonopoulos]    Script Date: 5/14/2023 11:37:29 PM ******/
CREATE USER [aantonopoulos] FOR LOGIN [aantonopoulos] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Assignment]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Assignment](
	[AssignmentID] [int] NOT NULL,
	[AssignmentDate] [datetime] NOT NULL,
	[ResolvedDate] [datetime] NULL,
	[Grade] [int] NULL,
	[UserID] [int] NULL,
	[TestID] [int] NULL,
 CONSTRAINT [PK_Assignment] PRIMARY KEY CLUSTERED 
(
	[AssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[CategoryID] [int] NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Questions]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Questions](
	[QuestionID] [int] NOT NULL,
	[Difficulty] [nvarchar](20) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[CorrectAnswerDescription] [nvarchar](max) NOT NULL,
	[FirstSuplAnsDesc] [nvarchar](max) NOT NULL,
	[SecSuplAnsDesc] [nvarchar](max) NOT NULL,
	[ThrSuplAnsDesc] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuestionsCategory]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuestionsCategory](
	[QuestionCategoryID] [int] NOT NULL,
	[QuestionID] [int] NULL,
	[CategoryID] [int] NULL,
 CONSTRAINT [PK_QuestionsCategory] PRIMARY KEY CLUSTERED 
(
	[QuestionCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TestQuestions]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestQuestions](
	[TestQuestionsID] [int] NOT NULL,
	[TestID] [int] NULL,
	[QuestionID] [int] NULL,
 CONSTRAINT [PK_TestQuestions_1] PRIMARY KEY CLUSTERED 
(
	[TestQuestionsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tests]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tests](
	[TestID] [int] NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Subject] [nvarchar](50) NOT NULL,
	[Difficulty] [nvarchar](20) NOT NULL,
	[QuestionsNumber] [int] NOT NULL,
 CONSTRAINT [PK_Tests] PRIMARY KEY CLUSTERED 
(
	[TestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserContacts]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserContacts](
	[UserContactID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[ContactID] [int] NOT NULL,
 CONSTRAINT [PK_UserContacts] PRIMARY KEY CLUSTERED 
(
	[UserContactID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](250) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](250) NOT NULL,
	[PhoneNumber] [nvarchar](15) NOT NULL,
	[Institution] [nvarchar](250) NOT NULL,
	[UserRole] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UsersRepositories]    Script Date: 5/14/2023 11:37:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersRepositories](
	[RepositoryID] [int] NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[UserID] [int] NULL,
	[QuestionID] [int] NULL,
 CONSTRAINT [PK_UsersRepositories] PRIMARY KEY CLUSTERED 
(
	[RepositoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Users]    Script Date: 5/14/2023 11:37:38 PM ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [IX_Users] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Assignment]  WITH CHECK ADD  CONSTRAINT [FK_Assignment_Tests] FOREIGN KEY([TestID])
REFERENCES [dbo].[Tests] ([TestID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Assignment] CHECK CONSTRAINT [FK_Assignment_Tests]
GO
ALTER TABLE [dbo].[Assignment]  WITH CHECK ADD  CONSTRAINT [FK_Assignments_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Assignment] CHECK CONSTRAINT [FK_Assignments_Users]
GO
ALTER TABLE [dbo].[QuestionsCategory]  WITH CHECK ADD  CONSTRAINT [FK_QuestionsCategory_Categories] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Categories] ([CategoryID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[QuestionsCategory] CHECK CONSTRAINT [FK_QuestionsCategory_Categories]
GO
ALTER TABLE [dbo].[QuestionsCategory]  WITH CHECK ADD  CONSTRAINT [FK_QuestionsCategory_Questions] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[QuestionsCategory] CHECK CONSTRAINT [FK_QuestionsCategory_Questions]
GO
ALTER TABLE [dbo].[TestQuestions]  WITH CHECK ADD  CONSTRAINT [FK_TestQuestions_Questions] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[TestQuestions] CHECK CONSTRAINT [FK_TestQuestions_Questions]
GO
ALTER TABLE [dbo].[TestQuestions]  WITH CHECK ADD  CONSTRAINT [FK_TestQuestions_Tests] FOREIGN KEY([TestID])
REFERENCES [dbo].[Tests] ([TestID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[TestQuestions] CHECK CONSTRAINT [FK_TestQuestions_Tests]
GO
ALTER TABLE [dbo].[UserContacts]  WITH CHECK ADD  CONSTRAINT [FK_UserContacts] FOREIGN KEY([ContactID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[UserContacts] CHECK CONSTRAINT [FK_UserContacts]
GO
ALTER TABLE [dbo].[UserContacts]  WITH CHECK ADD  CONSTRAINT [FK_UserContacts_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[UserContacts] CHECK CONSTRAINT [FK_UserContacts_Users]
GO
ALTER TABLE [dbo].[UsersRepositories]  WITH CHECK ADD  CONSTRAINT [FK_UsersRepositories_Questions] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Questions] ([QuestionID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[UsersRepositories] CHECK CONSTRAINT [FK_UsersRepositories_Questions]
GO
ALTER TABLE [dbo].[UsersRepositories]  WITH CHECK ADD  CONSTRAINT [FK_UsersRepositories_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[UsersRepositories] CHECK CONSTRAINT [FK_UsersRepositories_Users]
GO
USE [master]
GO
ALTER DATABASE [AutoQuizzer] SET  READ_WRITE 
GO
