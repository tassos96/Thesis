using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Types.DatabaseContext
{
    public partial class AutoQuizzerContext : DbContext
    {
        public AutoQuizzerContext()
        {
        }

        public AutoQuizzerContext(DbContextOptions<AutoQuizzerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Exam> Exams { get; set; } = null!;
        public virtual DbSet<ExamDetail> ExamDetails { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; } = null!;
        public virtual DbSet<Subcategory> Subcategories { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<TestQuestion> TestQuestions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-ASJECBU\\SQLEXPRESS;database=AutoQuizzer;User=aantonopoulos;Password=1234;Trust Server Certificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Category_User");
            });

            modelBuilder.Entity<Exam>(entity =>
            {
                entity.ToTable("Exam");

                entity.Property(e => e.ExamId).HasColumnName("ExamID");

                entity.Property(e => e.AssignmentDate).HasColumnType("datetime");

                entity.Property(e => e.ResolvedDate).HasColumnType("datetime");

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.Exams)
                    .HasForeignKey(d => d.TestId)
                    .HasConstraintName("FK_Assignment_Test");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Exams)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Exam_User");
            });

            modelBuilder.Entity<ExamDetail>(entity =>
            {
                entity.ToTable("ExamDetail");

                entity.Property(e => e.ExamDetailId).HasColumnName("ExamDetailID");

                entity.Property(e => e.ExamId).HasColumnName("ExamID");

                entity.Property(e => e.TestQuestionId).HasColumnName("TestQuestionID");

                entity.HasOne(d => d.Exam)
                    .WithMany(p => p.ExamDetails)
                    .HasForeignKey(d => d.ExamId)
                    .HasConstraintName("FK_ExamDetail_Exam");

                entity.HasOne(d => d.TestQuestion)
                    .WithMany(p => p.ExamDetails)
                    .HasForeignKey(d => d.TestQuestionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ExamDetail_TestQuestion");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("Question");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Difficulty).HasMaxLength(20);

                entity.Property(e => e.SubcategoryId).HasColumnName("SubcategoryID");

                entity.HasOne(d => d.Subcategory)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.SubcategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Question_Subcategory");
            });

            modelBuilder.Entity<QuestionAnswer>(entity =>
            {
                entity.HasKey(e => e.AnswerId);

                entity.ToTable("QuestionAnswer");

                entity.Property(e => e.AnswerId).HasColumnName("AnswerID");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionAnswers)
                    .HasForeignKey(d => d.QuestionId)
                    .HasConstraintName("FK_QuestionAnswer_Question");
            });

            modelBuilder.Entity<Subcategory>(entity =>
            {
                entity.ToTable("Subcategory");

                entity.Property(e => e.SubcategoryId).HasColumnName("SubcategoryID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Subcategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Subcategory_Category");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test");

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.Property(e => e.Categories).HasMaxLength(50);

                entity.Property(e => e.Difficulty).HasMaxLength(20);

                entity.Property(e => e.Subject).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<TestQuestion>(entity =>
            {
                entity.ToTable("TestQuestion");

                entity.Property(e => e.TestQuestionId).HasColumnName("TestQuestionID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.TestQuestions)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_TestQuestions_Questions");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.TestQuestions)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_TestQuestions_Tests");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "IX_Users")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(250);

                entity.Property(e => e.Institution).HasMaxLength(250);

                entity.Property(e => e.LastName).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(250);

                entity.Property(e => e.PhoneNumber).HasMaxLength(15);

                entity.Property(e => e.UserRole).HasMaxLength(10);

                entity.Property(e => e.Username).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
