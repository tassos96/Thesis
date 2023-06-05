namespace Types.DatabaseContext
{
    public partial class User
    {
        public User()
        {
            Assignments = new HashSet<Assignment>();
            UserContactContacts = new HashSet<UserContact>();
            UserContactUsers = new HashSet<UserContact>();
            UsersRepositories = new HashSet<UsersRepository>();
        }

        public int UserId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public string UserRole { get; set; } = null!;

        public virtual ICollection<Assignment> Assignments { get; set; }
        public virtual ICollection<UserContact> UserContactContacts { get; set; }
        public virtual ICollection<UserContact> UserContactUsers { get; set; }
        public virtual ICollection<UsersRepository> UsersRepositories { get; set; }
    }
}
