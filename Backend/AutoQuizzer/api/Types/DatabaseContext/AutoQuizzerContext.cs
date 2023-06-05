using Microsoft.EntityFrameworkCore;

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

        public virtual DbSet<Assignment> Assignments { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<QuestionsCategory> QuestionsCategories { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<TestQuestion> TestQuestions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserContact> UserContacts { get; set; } = null!;
        public virtual DbSet<UsersRepository> UsersRepositories { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=AANTONOPOULOS-P\\SQLEXPRESS;database=AutoQuizzer;User=aantonopoulos;Password=1234;Trust Server Certificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Assignment>(entity =>
            {
                entity.ToTable("Assignment");

                entity.Property(e => e.AssignmentId)
                    .ValueGeneratedNever()
                    .HasColumnName("AssignmentID");

                entity.Property(e => e.AssignmentDate).HasColumnType("datetime");

                entity.Property(e => e.ResolvedDate).HasColumnType("datetime");

                entity.Property(e => e.TestId).HasColumnName("TestID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Test)
                    .WithMany(p => p.Assignments)
                    .HasForeignKey(d => d.TestId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Assignment_Tests");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Assignments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_Assignments_Users");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId)
                    .ValueGeneratedNever()
                    .HasColumnName("CategoryID");

                entity.Property(e => e.Description).HasMaxLength(50);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.QuestionId)
                    .ValueGeneratedNever()
                    .HasColumnName("QuestionID");

                entity.Property(e => e.Difficulty).HasMaxLength(20);
            });

            modelBuilder.Entity<QuestionsCategory>(entity =>
            {
                entity.HasKey(e => e.QuestionCategoryId);

                entity.ToTable("QuestionsCategory");

                entity.Property(e => e.QuestionCategoryId)
                    .ValueGeneratedNever()
                    .HasColumnName("QuestionCategoryID");

                entity.Property(e => e.CategoryId).HasColumnName("CategoryID");

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.QuestionsCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_QuestionsCategory_Categories");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionsCategories)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_QuestionsCategory_Questions");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.TestId)
                    .ValueGeneratedNever()
                    .HasColumnName("TestID");

                entity.Property(e => e.Difficulty).HasMaxLength(20);

                entity.Property(e => e.Subject).HasMaxLength(50);

                entity.Property(e => e.Title).HasMaxLength(50);
            });

            modelBuilder.Entity<TestQuestion>(entity =>
            {
                entity.HasKey(e => e.TestQuestionsId)
                    .HasName("PK_TestQuestions_1");

                entity.Property(e => e.TestQuestionsId)
                    .ValueGeneratedNever()
                    .HasColumnName("TestQuestionsID");

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
                entity.HasIndex(e => e.Email, "IX_Users")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FullName).HasMaxLength(250);

                entity.Property(e => e.Institution).HasMaxLength(250);

                entity.Property(e => e.Password).HasMaxLength(250);

                entity.Property(e => e.PhoneNumber).HasMaxLength(15);

                entity.Property(e => e.UserRole).HasMaxLength(10);
            });

            modelBuilder.Entity<UserContact>(entity =>
            {
                entity.Property(e => e.UserContactId)
                    .ValueGeneratedNever()
                    .HasColumnName("UserContactID");

                entity.Property(e => e.ContactId).HasColumnName("ContactID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.UserContactContacts)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserContacts");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserContactUsers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserContacts_Users");
            });

            modelBuilder.Entity<UsersRepository>(entity =>
            {
                entity.HasKey(e => e.RepositoryId);

                entity.Property(e => e.RepositoryId)
                    .ValueGeneratedNever()
                    .HasColumnName("RepositoryID");

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.QuestionId).HasColumnName("QuestionID");

                entity.Property(e => e.Title).HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.UsersRepositories)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UsersRepositories_Questions");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersRepositories)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_UsersRepositories_Users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
