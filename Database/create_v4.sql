USE [master]
GO
/****** Object:  Database [AutoQuizzer]    Script Date: 7/8/2023 11:13:15 μμ ******/
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
/****** Object:  User [aantonopoulos]    Script Date: 7/8/2023 11:13:15 μμ ******/
CREATE USER [aantonopoulos] FOR LOGIN [aantonopoulos] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_backupoperator] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_datareader] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [aantonopoulos]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [aantonopoulos]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_Category_1] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Exam]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Exam](
	[ExamID] [int] IDENTITY(1,1) NOT NULL,
	[AssignmentDate] [datetime] NOT NULL,
	[ResolvedDate] [datetime] NULL,
	[Grade] [int] NULL,
	[UserID] [int] NULL,
	[TestID] [int] NULL,
 CONSTRAINT [PK_Exam] PRIMARY KEY CLUSTERED 
(
	[ExamID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExamDetail]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExamDetail](
	[ExamDetailID] [int] IDENTITY(1,1) NOT NULL,
	[ExamID] [int] NOT NULL,
	[TestQuestionID] [int] NOT NULL,
	[QuestionGrade] [int] NOT NULL,
 CONSTRAINT [PK_ExamDetails] PRIMARY KEY CLUSTERED 
(
	[ExamDetailID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[Difficulty] [nvarchar](20) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[SubcategoryID] [int] NOT NULL,
 CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QuestionAnswer]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QuestionAnswer](
	[AnswerID] [int] IDENTITY(1,1) NOT NULL,
	[QuestionID] [int] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[IsCorrect] [smallint] NOT NULL,
 CONSTRAINT [PK_QuestionAnswer] PRIMARY KEY CLUSTERED 
(
	[AnswerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subcategory]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subcategory](
	[SubcategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryID] [int] NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[SubcategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Test]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Test](
	[TestID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Subject] [nvarchar](50) NOT NULL,
	[Difficulty] [nvarchar](20) NOT NULL,
	[QuestionsNumber] [int] NOT NULL,
	[Categories] [nvarchar](50) NOT NULL,
	[Subcategories] [nvarchar](50) NOT NULL,
	[ExaminerID] [int] NOT NULL,
 CONSTRAINT [PK_Tests] PRIMARY KEY CLUSTERED 
(
	[TestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TestQuestion]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestQuestion](
	[TestQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[TestID] [int] NULL,
	[QuestionID] [int] NULL,
 CONSTRAINT [PK_TestQuestions_1] PRIMARY KEY CLUSTERED 
(
	[TestQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 7/8/2023 11:13:15 μμ ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](250) NOT NULL,
	[LastName] [nvarchar](250) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](250) NOT NULL,
	[PhoneNumber] [nvarchar](15) NOT NULL,
	[Institution] [nvarchar](250) NOT NULL,
	[UserRole] [nvarchar](10) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [IX_Users] UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_User]
GO
ALTER TABLE [dbo].[Exam]  WITH CHECK ADD  CONSTRAINT [FK_Assignment_Test] FOREIGN KEY([TestID])
REFERENCES [dbo].[Test] ([TestID])
GO
ALTER TABLE [dbo].[Exam] CHECK CONSTRAINT [FK_Assignment_Test]
GO
ALTER TABLE [dbo].[Exam]  WITH CHECK ADD  CONSTRAINT [FK_Exam_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[Exam] CHECK CONSTRAINT [FK_Exam_User]
GO
ALTER TABLE [dbo].[ExamDetail]  WITH CHECK ADD  CONSTRAINT [FK_ExamDetail_Exam] FOREIGN KEY([ExamID])
REFERENCES [dbo].[Exam] ([ExamID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ExamDetail] CHECK CONSTRAINT [FK_ExamDetail_Exam]
GO
ALTER TABLE [dbo].[ExamDetail]  WITH CHECK ADD  CONSTRAINT [FK_ExamDetail_TestQuestion] FOREIGN KEY([TestQuestionID])
REFERENCES [dbo].[TestQuestion] ([TestQuestionID])
GO
ALTER TABLE [dbo].[ExamDetail] CHECK CONSTRAINT [FK_ExamDetail_TestQuestion]
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD  CONSTRAINT [FK_Question_Subcategory] FOREIGN KEY([SubcategoryID])
REFERENCES [dbo].[Subcategory] ([SubcategoryID])
GO
ALTER TABLE [dbo].[Question] CHECK CONSTRAINT [FK_Question_Subcategory]
GO
ALTER TABLE [dbo].[QuestionAnswer]  WITH CHECK ADD  CONSTRAINT [FK_QuestionAnswer_Question] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Question] ([QuestionID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[QuestionAnswer] CHECK CONSTRAINT [FK_QuestionAnswer_Question]
GO
ALTER TABLE [dbo].[Subcategory]  WITH CHECK ADD  CONSTRAINT [FK_Subcategory_Category] FOREIGN KEY([CategoryID])
REFERENCES [dbo].[Category] ([CategoryID])
GO
ALTER TABLE [dbo].[Subcategory] CHECK CONSTRAINT [FK_Subcategory_Category]
GO
ALTER TABLE [dbo].[Test]  WITH CHECK ADD  CONSTRAINT [FK_Test_User] FOREIGN KEY([ExaminerID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[Test] CHECK CONSTRAINT [FK_Test_User]
GO
ALTER TABLE [dbo].[TestQuestion]  WITH CHECK ADD  CONSTRAINT [FK_TestQuestions_Questions] FOREIGN KEY([QuestionID])
REFERENCES [dbo].[Question] ([QuestionID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[TestQuestion] CHECK CONSTRAINT [FK_TestQuestions_Questions]
GO
ALTER TABLE [dbo].[TestQuestion]  WITH CHECK ADD  CONSTRAINT [FK_TestQuestions_Tests] FOREIGN KEY([TestID])
REFERENCES [dbo].[Test] ([TestID])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[TestQuestion] CHECK CONSTRAINT [FK_TestQuestions_Tests]
GO
USE [master]
GO
ALTER DATABASE [AutoQuizzer] SET  READ_WRITE 
GO
