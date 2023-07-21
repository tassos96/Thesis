using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class User
    {
        public User()
        {
            Categories = new HashSet<Category>();
            Exams = new HashSet<Exam>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Institution { get; set; } = null!;
        public string UserRole { get; set; } = null!;

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Exam> Exams { get; set; }
    }
}
