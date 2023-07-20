using System;
using System.Collections.Generic;

namespace Types.DatabaseContext
{
    public partial class Question
    {
        public Question()
        {
            TestQuestions = new HashSet<TestQuestion>();
            UsersRepositories = new HashSet<UsersRepository>();
        }

        public int QuestionId { get; set; }
        public string Difficulty { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string CorrectAnsDesc { get; set; } = null!;
        public string FirstSuplAnsDesc { get; set; } = null!;
        public string SecSuplAnsDesc { get; set; } = null!;
        public string ThrSuplAnsDesc { get; set; } = null!;
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<TestQuestion> TestQuestions { get; set; }
        public virtual ICollection<UsersRepository> UsersRepositories { get; set; }
    }
}
